var SegmentedBar = {
    namespace: 'http://www.w3.org/2000/svg'
};

(function (window, document, SegmentedBar) {
    'use strict';

    //TODO: add ability to create custom height, width
    SegmentedBar.createPaper = function createPaper(container, width, height, className) {
        var svgElement;

        svgElement = SegmentedBar.Svg.createElement('svg', {
            width: width,
            height: width * 0.2,
            viewBox : '0 0 1000 200'
        });

        container.appendChild(svgElement);

        return svgElement;
    }

})(window, document, SegmentedBar);
