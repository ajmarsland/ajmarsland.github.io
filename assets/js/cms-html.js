(function (root) {
    'use strict';

    root.CmsHtml = {
        sanitize: function (value) {
            // Never fall back to unsanitized HTML, including on unsupported browsers.
            if (typeof value !== 'string' || !root.DOMPurify || !root.DOMPurify.isSupported)
                return '';

            return root.DOMPurify.sanitize(value, {
                ALLOWED_TAGS: ['p', 'br', 'a', 'strong', 'em', 'b', 'i', 'u', 's',
                    'ul', 'ol', 'li', 'blockquote', 'h2', 'h3', 'h4', 'h5', 'h6',
                    'pre', 'code', 'hr', 'img', 'figure', 'figcaption',
                    'table', 'thead', 'tbody', 'tr', 'th', 'td'],
                ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'width', 'height',
                    'colspan', 'rowspan'],
                ALLOW_DATA_ATTR: false,
                ALLOW_ARIA_ATTR: false,
                SANITIZE_NAMED_PROPS: true
            });
        }
    };
}(window));
