var SegmentedBar = {
    version : '0.0.1'
};
(function(window, document, SegmentedBar) {
    var paper = null;
    var segments = [];
    var bubbleRendered = false,
        bubbleX = 500,
        bubbleY = 0,
        bubbleLength = 200;

    var defaultOptions = {
        emptySegmentText: "No segments",
        gap: 0,
        textSize: 10,
        showDescription: true,
        sideStyle: "angle",
        showValue: false,
        value: 0,
        segmentHeight: 80,
        valueHeight: 120,
        bubbleColor: "#7492E2",
        backgroundColor: "#DBF2B5",
        viewBoxHeight: 100
    };

    var config = {

    };
    function setViewBox() {
        if (paper == null) return;

        config.viewBoxHeight = config.segmentHeight || defaultOptions.segmentHeight;

        if (config.showValue) {
            config.viewBoxHeight += config.valueHeight || defaultOptions.valueHeight;
            console.log("viewBoxHeight =" + config.viewBoxHeight);
        }
        paper.attr({
            viewBox: "0 0 1000 " + config.viewBoxHeight
        });

        paper.rect(0, 0, '100%', '100%').attr({
            fill: config.backgroundColor || defaultOptions.backgroundColor
        });
    }

    //TODO: change this method using config parameters
    function renderEmptyBar() {
        var emptySegment = paper.rect(0, 0, 1000, 100, 50);
        emptySegment.attr({
            fill: "#CCC"
        });
        var text = paper.text(0, 0, config.emptySegmentText || defaultOptions.emptySegmentText).attr({
            fontSize: 40,
            fontFamily: "Calibri"
        });
        var bbox = text.getBBox();

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

    function renderBubbleTriangle(x, y, color) {
        console.log(x, y);
        return paper.polygon(x, y, x - 20, y - 20, x + 20, y - 20)
            .attr({
                fill: color
            });
    }

    function findBubblePosition() {
        var value = config.value;
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            if (value == segment.minValue && segment.includeLeft) {
                bubbleX = segment.startX;
                break;
            }
            if (value == segment.maxValue && segment.includeRight) {
                bubbleX = segment.endX;
                break;
            }
            if (value > segment.minValue && value < segment.maxValue) {
                bubbleX = (segment.endX - segment.startX) * (value - segment.minValue) / (segment.maxValue - segment.minValue) +
                    segment.startX;
                console.log("bubbleX = " + bubbleX);
                break;
            }
        }
        if(bubbleX - 10 <= 0) {
            bubbleX  += 50;
        }
        if (bubbleX + 10 >= 1000) {
            bubbleX -= 50;
        }
    }

    function addBubble() {
        findBubblePosition();
        var color = config.bubbleColor || defaultOptions.bubbleColor;
        renderBubbleTriangle(bubbleX, bubbleY, color);
        var bubbleHeight = getBubbleHeight();
        var x = bubbleX - bubbleLength / 2;
        if (x < 0) {
            x = 0;
        }
        if (x + bubbleLength > 1000) {
            x = 1000 - bubbleLength;
        }
        renderBubble(x, bubbleHeight, color);
    }

    function getBubbleHeight() {
        var segmentHeight = config.segmentHeight || defaultOptions.segmentHeight,
            valueHeight = config.segmentHeight || defaultOptions.segmentHeight;

        if (config.viewBoxHeight - segmentHeight < valueHeight) {
            config.valueHeight = config.viewBoxHeight - valueHeight;
        }

        return config.valueHeight || defaultOptions.valueHeight- 19;
    }

    function renderBubble(x, height, color) {
        renderRect(x, bubbleY - height - 19, bubbleLength, height, color, 15);
    }

    function renderSegment(x, y, length, segmentConfig, type) {

        var segment,
            leftTriangle,
            rightTriangle,
            leftCircle,
            rightCircle;

        var height = config.segmentHeight || defaultOptions.segmentHeight;
        var color = segmentConfig.color;
        var sideStyle = config.sideStyle || defaultOptions.sideStyle;

        if (type == "single") {
            if (sideStyle == "angle" ) {
                length -= height;
                renderLeftTriangle(x, y, height, color);
                x += height / 2;
                renderRect(x, y, length, height, color);
                segmentConfig.startX = x;
                segmentConfig.endX = x + length;
                x += length;
                renderRightTriangle(x, y, height, color);
            }
            else if (sideStyle == "rounded") {
                segmentConfig.startX = x + height / 2;
                segmentConfig.endX = x + length;
                renderRect(x, y, length, height, color, height / 2);
            } else {
                segmentConfig.startX = x;
                segmentConfig.endX = x + length;
                renderRect(x, y, length, height, color);
            }
        } else {
            if (type == "left") {
                if (sideStyle == "angle") {
                    renderLeftTriangle(x, y, height, color);
                    length -= height / 2;
                    x += height / 2;
                }
                if (sideStyle == "rounded") {
                    renderCircle(x + height / 2, y + height / 2, height / 2, color);
                    length -= height / 2;
                    x += height / 2;
                }
            }
            if (type == "right") {
                if (sideStyle == "angle") {
                    renderRightTriangle(x + length - height / 2, y, height, color);
                    length -= height / 2;
                }
                if (sideStyle == "rounded") {
                    renderCircle(x + length - height / 2, y + height / 2, height / 2, color);
                    length -= height / 2;
                }
            }
            segmentConfig.startX = x;
            segmentConfig.endX = x + length;
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
            _y = config.viewBoxHeight- config.segmentHeight;
            bubbleY = _y;
        }
        var xLength;

        if (segments.length == 1) {
            xLength = 1000;
            renderSegment(_x, _y, xLength, segments[0], "single");
            // console.log("startX=" + segments[0].startX);
        } else {
            var gap = config.gap || defaultOptions.gap;
            xLength = (1000 + gap) / segments.length - gap;

            segments.forEach(function (segment, i, segments) {
                if (i == 0) {
                    renderSegment(_x, _y, xLength, segment, "left");
                } else if (i == segments.length - 1) {
                    renderSegment(_x, _y, xLength, segment, "right")
                } else {
                    renderSegment(_x, _y, xLength, segment)
                }
                //  console.log("startX=" + segment.startX);
                _x += xLength + gap;
            });
        }
    }

     SegmentedBar.init = function (barConfig, _segments) {
        paper = Snap('100%', '100%');
        segments = _segments;

        config = barConfig;

         bubbleX =500;
         bubbleY = 0

        setViewBox();
        renderSegments();
        if (config.showValue) {
            addBubble();
        }
        return this;
    };

}(window, document, SegmentedBar));

