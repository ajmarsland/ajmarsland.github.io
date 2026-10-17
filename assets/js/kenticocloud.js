(function (root) {
    'use strict';
    // Public delivery environment identifier. Never add a management/preview key here.
    var projectId = '7f679bd8-e07a-0226-14fb-5b69be6ad46e';
    var endpoint = 'https://deliver.kontent.ai/' + projectId + '/items';
    function value(item, name) {
        return item && item.elements && item.elements[name] ? item.elements[name].value : undefined;
    }
    function first(response) {
        if (!response || !Array.isArray(response.items) || !response.items.length) {
            throw new Error('No published content');
        }
        return response.items[0];
    }
    function images(response) {
        var codes = value(first(response), 'photos');
        if (!Array.isArray(codes)) throw new Error('Missing photo list');
        return codes.map(function (code) {
            var item = response.modular_content && Object.prototype.hasOwnProperty.call(response.modular_content, code) ? response.modular_content[code] : null;
            var assets = value(item, 'image');
            return {url: Array.isArray(assets) && assets[0] ? assets[0].url : '',
                title: value(item, 'title'), text: value(item, 'text')};
        });
    }
    async function request(type, fields, fetcher) {
        var url = new URL(endpoint);
        url.searchParams.set('system.type', type);
        url.searchParams.set('elements', fields);
        url.searchParams.set('depth', type === 'home_page' ? '1' : '0');
        url.searchParams.set('limit', '1');
        var controller = new AbortController();
        var timer = setTimeout(function () { controller.abort(); }, 15000);
        try {
            var response = await fetcher(url.href, {signal: controller.signal, credentials: 'omit'});
            if (!response.ok) throw new Error('Content request failed');
            var result = await response.json();
            first(result);
            return result;
        } finally { clearTimeout(timer); }
    }
    function failure(container, message) {
        container.replaceChildren();
        var notice = document.createElement('p');
        notice.setAttribute('role', 'status');
        notice.textContent = message;
        container.appendChild(notice);
    }
    async function load(options) {
        var fetcher = options.fetcher || root.fetch.bind(root);
        var view = options.view || root.CmsView;
        var jobs = [
            request('home_page', 'photos,title,image,text', fetcher).then(function (response) {
                view.renderImages(options.gallery, images(response));
                if (!options.gallery.querySelector('article')) throw new Error('No usable photos');
            }).catch(function () { failure(options.gallery, 'Photos could not be loaded. Please try again later.'); }),
            request('about_page', 'title,text', fetcher).then(function (response) {
                var item = first(response);
                view.renderAbout(options.about, {title: value(item, 'title'), text: value(item, 'text')});
            }).catch(function () { failure(options.about, 'About content could not be loaded. Please try again later.'); }),
            request('contact', 'twitter,facebook,instagram,github,dribbble,linkedin', fetcher).then(function (response) {
                var item = first(response), data = {};
                ['twitter', 'facebook', 'instagram', 'github', 'dribbble', 'linkedin'].forEach(function (name) {
                    data[name] = value(item, name);
                });
                view.renderContacts(options.contacts, data);
            }).catch(function () { options.contacts.replaceChildren(); })
        ];
        await Promise.all(jobs);
        options.initialize();
    }
    root.CmsData = {images: images, load: load};
    var gallery = document.getElementById('main');
    if (gallery && document.getElementById('about-content') && document.getElementById('contact-links')) {
        load({gallery: gallery, about: document.getElementById('about-content'),
            contacts: document.getElementById('contact-links'), initialize: root.jqueryInitialize});
    }
}(window));
