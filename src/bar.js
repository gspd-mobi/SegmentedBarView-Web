SegmentedBar.Bar = (function (window, document, SegmentedBar) {
    'use strict';

    //TODO: Add option to create fixed size bar
    function createBar(container, config) {
        var paper = SegmentedBar.createPaper(container, config.width, config.height);

        var rect = SegmentedBar.Svg.drawRect(paper, 0, 0, '100%', '200', '#435545');
        var rect2 = SegmentedBar.Svg.drawRect(paper, 0, 0, '500', '100', '#0FF');
    }

    return {
        createBar : createBar
    }
})(window, document, SegmentedBar);