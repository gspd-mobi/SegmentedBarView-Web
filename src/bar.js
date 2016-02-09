var SegmentedBar = (function () {
    var paper = null;
    var segments = [];
    var yStart = 0;

    var config = {
        emptySegmentText: "No segments",
        gap: 10,
        textSize: 10,
        showDescription: true,
        sideStyle: "angle",
        showValue: false,
        value: 0,
        segmentHeight: 80,
        valueHeight: 120
    };

    function setViewBox() {
        if (paper == null) return;
        if (config.showValue) {
            paper.attr({
                viewBox: "0 0 1000 200"
            });
            yStart = 50;

        } else {
            paper.attr({
                viewBox: "0 0 1000 100"
            });
            config.segmentHeight = 100;
            yStart = 0;
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

    function renderRect(x, y, length, height, color, radius) {
        return paper.rect(x, y, length, height, radius)
            .attr({
                fill: color
            });
    }

    function renderLeftTriangle(x, y, size, color) {
        var sizeHalf = size / 2;
        return paper.polygon(x, y + sizeHalf, x + sizeHalf, y, x + sizeHalf, y + size)
            .attr({
                fill: color
            });
    }

    function renderRightTriangle(x, y, size, color) {
        var sizeHalf = size / 2;
        return paper.polygon(x, y, x + sizeHalf, y + sizeHalf, x, y + size)
            .attr({
                fill: color
            });
    }

    function renderCircle(x, y, radius, color) {
        return paper.circle(x, y, radius)
            .attr({
                fill: color
            });
    }


    function renderSegment(x, y, length, segmentConfig, type) {

        var segment,
            leftTriangle,
            rightTriangle,
            leftCircle,
            rightCircle;

        var height = config.segmentHeight;
        var color = segmentConfig.color;

        if (type == "single") {
            console.log(height, config.segmentHeight);
            if (config.sideStyle == "angle") {
                length -= height;
                renderLeftTriangle(x, y, height, color);
                x += height / 2;
                renderRect(x, y, length, height, color);
                x += length;
                renderRightTriangle(x, y, height, color);
            }
            else if (config.sideStyle == "rounded") {
                renderRect(x, y, length, height, color, height / 2);
            } else {
                renderRect(x, y, length, height, color);
            }
        } else {
            if (type == "left") {
                if (config.sideStyle == "angle") {
                    renderLeftTriangle(x, y, height, color);
                    length -= height / 2;
                    x += height / 2;
                }
                if (config.sideStyle == "rounded") {
                    renderCircle(x + height / 2, y + height / 2, height / 2, color);
                    length -= height / 2;
                    x += height / 2;
                }
            }
            if (type == "right") {
                if (config.sideStyle == "angle") {
                    renderRightTriangle(x + length - height / 2, y, height, color);
                    length -= height / 2;
                }
                if (config.sideStyle == "rounded") {
                    renderCircle(x + length - height / 2, y + height / 2, height / 2, color);
                    length -= height / 2;
                }
            }
            renderRect(x, y, length, height, color);
        }
    }

    function renderSegments() {
        if (segments.length == 0) {
            renderEmptyBar();
            return;
        }
        var _x = 0;
        var _y = 0;

        if (config.showValue) {
            _y = 200 - config.segmentHeight;
        }
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
        config.segmentHeight = barConfig.segmentHeight || config.segmentHeight;

        setViewBox();
        renderSegments();

        return this;
    }

    return {
        init: init
    }
})();
