(function (window, document, SegmentedBarView) {
    'use strict';

    var defaultOptions = {

    };




    function createChart(containter, width, height) {
        SegmentedBarView.createPaper(containter, width, height);
        SegmentedBarView.Paper.renderRect(10, 10, SegmentedBarView.Paper.viewBox.width - 20, SegmentedBarView.Paper.viewBox.height - 20, '#0F0');
    }
    SegmentedBarView.Bar = {
        createChart : createChart
    };
}(window, document, SegmentedBarView));