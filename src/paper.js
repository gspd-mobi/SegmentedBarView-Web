(function (window, document, SegmentedBatView) {
    'use strict';
    var paper = null;
    var viewBox = {
        width: 0,
        height: 0
    };

    function Paper(parent) {
        paper = Snap('100%', '100%');
        if (parent) {
            parent.appendChild(paper.node);
        }
        SegmentedBatView.parent = parent;

        var parentBoundingRect = parent.getBoundingClientRect(),
            width = parentBoundingRect.width,
            height = parentBoundingRect.height;

        setViewBox(width, height);
    }

    function setViewBox(width, height) {
        paper.attr({
            viewBox: '0 0 ' + width + ' ' + height
        });
        viewBox.height = height;
        viewBox.width = width;
    }

    function renderRect(x, y, length, height, fillColor, borderRadius) {
        return paper.rect(x, y, length, height, borderRadius)
            .attr({
                fill: fillColor
            });
    }

    SegmentedBatView.Paper = {
        constructor: Paper,
        paper: paper,
        renderRect: renderRect,
        viewBox: viewBox
    };

})(window, document, SegmentedBarView);