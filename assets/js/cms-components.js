(function (root) {
    'use strict';
    var projectId = '7f679bd8-e07a-0226-14fb-5b69be6ad46e';
    var profiles = {
        twitter: ['https://twitter.com/', 'Twitter'],
        facebook: ['https://facebook.com/', 'Facebook'],
        instagram: ['https://www.instagram.com/', 'Instagram'],
        github: ['https://github.com/', 'GitHub'],
        dribbble: ['https://dribbble.com/', 'Dribbble'],
        linkedin: ['https://www.linkedin.com/in/', 'LinkedIn']
    };
    function text(value) { return typeof value === 'string' ? value : ''; }
    function photoUrl(value) {
        if (typeof value !== 'string') return '';
        try {
            var url = new URL(value);
            if (url.protocol !== 'https:' || url.username || url.password || url.port ||
                !/^assets-[a-z]{2}-\d{2}\.kc-usercontent\.com$/.test(url.hostname) ||
                !url.pathname.startsWith('/' + projectId + '/')) return '';
            return url.href;
        } catch (error) { return ''; }
    }
    function socialUrl(network, value) {
        if (!Object.prototype.hasOwnProperty.call(profiles, network) || typeof value !== 'string' ||
            !/^[a-zA-Z0-9._-]{1,100}$/.test(value) || value === '.' || value === '..') return '';
        return profiles[network][0] + encodeURIComponent(value);
    }
    function richText(value) {
        var node = document.createElement('div');
        node.innerHTML = root.CmsHtml.sanitize(value);
        return node;
    }
    function renderImages(container, images) {
        var fragment = document.createDocumentFragment();
        (Array.isArray(images) ? images : []).forEach(function (image) {
            if (!image) return;
            var url = photoUrl(image.url);
            if (!url) return;
            var article = document.createElement('article');
            article.className = 'thumb';
            var link = document.createElement('a');
            link.className = 'image';
            link.href = url;
            var thumbnail = document.createElement('img');
            var small = new URL(url);
            small.searchParams.set('w', '360');
            thumbnail.src = small.href;
            thumbnail.alt = text(image.title);
            link.appendChild(thumbnail);
            var heading = document.createElement('h2');
            heading.textContent = text(image.title);
            article.append(link, heading, richText(image.text));
            fragment.appendChild(article);
        });
        container.replaceChildren(fragment);
    }
    function renderAbout(container, data) {
        container.replaceChildren();
        if (!data) return;
        var heading = document.createElement('h2');
        heading.textContent = text(data.title);
        container.append(heading, richText(data.text));
    }
    function renderContacts(container, data) {
        var fragment = document.createDocumentFragment();
        Object.keys(profiles).forEach(function (network) {
            var href = socialUrl(network, data && data[network]);
            if (!href) return;
            var item = document.createElement('li');
            var link = document.createElement('a');
            link.href = href;
            link.className = 'icon fa-' + network;
            var label = document.createElement('span');
            label.className = 'label';
            label.textContent = profiles[network][1];
            link.appendChild(label);
            item.appendChild(link);
            fragment.appendChild(item);
        });
        container.replaceChildren(fragment);
    }
    root.CmsView = {photoUrl: photoUrl, socialUrl: socialUrl,
        renderImages: renderImages, renderAbout: renderAbout, renderContacts: renderContacts};
}(window));
