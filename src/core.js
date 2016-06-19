var SegmentedBar = {};

(function (window, document, SegmentedBar) {
    'use strict';
    SegmentedBar.namespaces = {
        svg: 'http://www.w3.org/2000/svg',
        xmlns: 'http://www.w3.org/2000/xmlns/',
        segview: ' https://github.com/gspd-mobi/SegmentedBarView-Web'
    };

    SegmentedBar.createPaper = function createPaper(container, config) {
        var svgElement;

        svgElement = SegmentedBar.Svg.createElement('svg', {
            width: config.width,
            height: config.height,
            viewBox: config.viewBox
        });

        container.appendChild(svgElement);

        return svgElement;
    }

})(window, document, SegmentedBar);
