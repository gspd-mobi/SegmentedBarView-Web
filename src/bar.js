var SegmentedBar = (function () {
    var paper = null;
    var sergments = [];

    var config = {
        emptySegmentText: "No segments",
        gap: 10,
        textSize: 10,
        showDescription: true,
        sideStyle: "angle",
        showValue: false,
        value: 0
    };

    function setViewBox() {
        if (paper == null) return;
        if (config.showValue) {
            paper.attr({
                viewBox: "0 0 1000 200"
            });
        } else {
            paper.attr({
                viewBox: "0 0 1000 100"
            });
        }

        paper.rect(0, 0, '100%', '100%').attr({
            fill: "#DBF2B5"
        });
    }

    function renderEmptyBar() {
        var emptySegment = paper.rect(0, 0, 1000, 100, 50);
        emptySegment.attr({
            fill: "#CCC"
        });
        var text = paper.text(0, 0, config.emptySegmentText).attr({
            fontSize : 40,
            fontFamily: "Calibri"
        });
        var bbox = text.getBBox();
        console.log(bbox);

        text.attr({
            x: 500 - bbox.width / 2,
            y: 50 + bbox.height / 4
        });
    }

    function renderSegments() {
        if (sergments.length == 0) {
            renderEmptyBar();
        }

    }

    function init() {
        paper = Snap('100%', '100%');

        setViewBox();

        renderSegments();

        return this;
    }

    return {
        init: init,
    }
})();
