var SegmentedBarView = {
    version: '0.0.1'
};

(function (window, document, SegmentedBarView) {
    'use strict';
    SegmentedBarView.precision = 5;

    SegmentedBarView.parent = document;

    SegmentedBarView.querySelector = function (query) {
        return query instanceof Node ? query : document.querySelector(query);
    };

    SegmentedBarView.roundWithPrecision = function (value, digits) {
        var precision = Math.pow(10, digits || SegmentedBarView.precision);
        return Math.round(value * precision) / precision;
    };


    SegmentedBarView.createPaper = function (containter, width, height) {
        return new SegmentedBarView.Paper.constructor(containter);
    }
}(window, document, SegmentedBarView));
