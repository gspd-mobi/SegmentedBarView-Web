var SegmentedBar = (function () {
    var paper = null;
    var segments = [];
    var viewBoxHeight,
        viewBoxWidth;

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
        viewBoxWidth = 1000;
        if (config.showValue) {
            paper.attr({
                viewBox: "0 0 1000 200"
            });
            viewBoxHeight = 200;
        } else {
            paper.attr({
                viewBox: "0 0 1000 100"
            });
            viewBoxHeight = 100;
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
            fontSize: 40,
            fontFamily: "Calibri"
        });
        var bbox = text.getBBox();
        console.log(bbox);

        text.attr({
            x: 500 - bbox.width / 2,
            y: 50 + bbox.height / 4
        });
    }

    function renderSegment(x, y, length, segmentConfig, type) {

        var segment,
            leftTriangle,
            rightTriangle,
            leftCircle,
            rightCircle;

        if (type == "single") {
            if (config.sideStyle == "angle") {
                x = x + 50;
                length = length - 100;
                segment = paper.rect(x, viewBoxHeight / 2, length, viewBoxHeight / 2);
                segment.attr({
                    fill: segmentConfig.color || '#00F'
                });

                leftTriangle = paper.polyline(0, 3 * viewBoxHeight / 4, 50, viewBoxHeight/ 2, 50, viewBoxHeight);
                leftTriangle.attr({
                    fill: segmentConfig.color || '#00F'
                });

                rightTriangle = paper.polyline(1000,  3 * viewBoxHeight / 4, 1000 - 50, viewBoxHeight/ 2, 1000 - 50, viewBoxHeight);
                rightTriangle.attr({
                    fill: segmentConfig.color || '#00F'
                });
            }
            else if (config.sideStyle == "rounded"){
                var roundedSegment = paper.rect(0, viewBoxHeight / 2, 1000, viewBoxHeight /2, 50);
                roundedSegment.attr({
                    fill: segmentConfig.color || '#00F'
                });
            } else {
                var segment = paper.rect(0, viewBoxHeight / 2, 1000, viewBoxHeight /2);
                segment.attr({
                    fill: segmentConfig.color || '#00F'
                });
            }
        } else {
            if (type == "left") {
                if (config.sideStyle == "angle") {
                    length -= 50;
                    leftTriangle = paper.polyline(0, 3 * viewBoxHeight / 4, 50, viewBoxHeight/ 2, 50, viewBoxHeight);
                    leftTriangle.attr({
                        fill: segmentConfig.color || '#00F'
                    });
                    x += 50;
                }
                if (config.sideStyle =="rounded") {
                    length -= 50;
                    leftCircle = paper.circle(50, 3 * viewBoxHeight / 4, 50);
                    leftCircle.attr({
                        fill: segmentConfig.color || '#00F'
                    });
                    x += 50;
                }

            }
            if (type == "right") {
                if (config.sideStyle == "angle") {
                    rightTriangle = paper.polyline(1000,  3 * viewBoxHeight / 4, 1000 - 50, viewBoxHeight/ 2, 1000 - 50, viewBoxHeight);
                    rightTriangle.attr({
                        fill: segmentConfig.color || '#00F'
                    });
                    length -= 50;
                }
                if (config.sideStyle == "rounded") {
                    length -= 50;
                    rightCircle = paper.circle(950, 3 * viewBoxHeight / 4, 50);
                    rightCircle.attr({
                        fill: segmentConfig.color || '#00F'
                    });
                }
            }
            segment = paper.rect(x, y + viewBoxHeight / 2, length, 100);
            segment.attr({
                fill: segmentConfig.color || '#00F'
            });


        }
    }

    function renderSegments() {
        if (segments.length == 0) {
            renderEmptyBar();
            return;
        }
        var _x = 0;
        var _y = 0;
        var xLength;

        if (segments.length == 1) {
            xLength = 1000;
            renderSegment(_x, _y, xLength, segments[0], "single");
        } else {
            xLength = (1000 + config.gap) / segments.length - config.gap;

            segments.forEach(function (segment, i, segments) {
                if (i == 0) {
                    renderSegment(_x, _y, xLength, segment, "left");
                } else if (i == segments.length - 1) {
                    renderSegment(_x, _y, xLength, segment, "right")
                } else {
                    renderSegment(_x, _y, xLength, segment)
                }
                _x += xLength + config.gap;
            });
        }
    }

    function init(barConfig, _segments) {
        paper = Snap('100%', '100%');
        segments = _segments;

        config.sideStyle = barConfig.sideStyle;
        config.showValue = barConfig.showValue;

        setViewBox();
        renderSegments();

        return this;
    }

    return {
        init: init
    }
})();
