'use strict';

var SegmentedBar = {
    version: '0.0.1'
};
(function (window, document, SegmentedBar) {
    var paper = null;
    var segments = [];
    var bubbleRendered = false,
        bubbleX = 500,
        bubbleY = 0,
        bubbleLength = 200,
        valuePositoinFound = false,
        segmentDefaultText = "No Value";

    var defaultOptions = {
        emptySegmentText: "No segments",
        gap: 0,
        textSize: 10,
        showDescription: false,
        sideStyle: "angle",
        showValue: false,
        value: "no value",
        unit: [],
        segmentHeight: 80,
        valueHeight: 120,
        bubbleColor: "#7492E2",
        backgroundColor: "#DBF2B5",
        viewBoxHeight: 100,
        descriptionSize: 40,
        descriptionColor: '#000'
    };

    var config = {};

    function setViewBox() {
        if (paper == null) return;

        config.viewBoxHeight = config.segmentHeight || defaultOptions.segmentHeight;

        if (config.showValue) {
            config.viewBoxHeight += config.valueHeight || defaultOptions.valueHeight;
        }
        if (config.showDescription) {
            config.viewBoxHeight += (config.descriptionSize || defaultOptions.descriptionSize);
        }
        paper.attr({
            viewBox: "0 0 1000 " + config.viewBoxHeight
        });

        paper.rect(0, 0, '100%', '100%').attr({
            fill: config.backgroundColor || defaultOptions.backgroundColor
        });

        var canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = config.viewBoxHeight;

        var parent = paper.node.parentNode;
        parent.insertBefore(canvas, paper.node);
    }

    //TODO: change this method using config parameters
    function renderEmptyBar() {
        var emptySegment = paper.rect(0, 0, 1000, 100, 50);
        emptySegment.attr({
            fill: "#CCC"
        });
        var text = paper.text(0, 0, config.emptySegmentText || defaultOptions.emptySegmentText).attr({
            fontSize: 40,
            fontFamily: "Calibri, verdana, tahoma"
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
        var sizeHalf = Math.round(size / 2);
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

    function renderLeftAngleSegment(x, y, size, color, length) {
        var sizeHalf = Math.round(size / 2);
        return paper.polygon(x, y + sizeHalf, x + sizeHalf, y, x + length, y, x + length, y + size, x + sizeHalf, y + size)
            .attr({
                fill: color
            });
    }


    function renderRightAngleSegment(x, y, size, color, length) {
        var sizeHalf = Math.round(size / 2);
        return paper.polygon(x, y, x + length, y, x + length + sizeHalf, y + sizeHalf, x + length, y + size, x, y + size)
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
                valuePositoinFound = true;
                break;
            }
            if (value == segment.maxValue && segment.includeRight) {
                bubbleX = segment.endX;
                valuePositoinFound = true;
                break;
            }
            if (value > segment.minValue && value < segment.maxValue) {
                bubbleX = (segment.endX - segment.startX) * (value - segment.minValue) / (segment.maxValue - segment.minValue) +
                    segment.startX;
                valuePositoinFound = true;
                break;
            }
        }
        if (bubbleX - 10 <= 0) {
            bubbleX += 50;
        }
        if (bubbleX + 10 >= 1000) {
            bubbleX -= 50;
        }
    }

    function renderBubbleText(x, y, size, color) {
        var textArr = [config.value + (config.unit ? '\u00A0' : '')],
            unitArr = parseUnitHtml(config.unit || '');

        unitArr.forEach(function (unit) {
            textArr.push(unit.text || '');
        });

        var bbox,
            textElem,
            width = 0,
            height = 0;

        var textElements = [];

        textArr.forEach(function (text, i) {
            textElem = paper.text(x, y, text).attr({
                fill: color,
                'font-size': i == 0 ? size : size - 20,
                fontFamily: "Calibri, verdana, tahoma"
            });
            var bbox = textElem.getBBox();
            x += bbox.width;
            width += bbox.width;
            if (height < bbox.height) {
                height = bbox.height;
            }
            if ((i != 0) && unitArr[i - 1].superscript) {
                textElem.superscript = true;
            }

            textElements.push(textElem);
        });

        return {
            width: width,
            height: height,
            textElements: textElements
        }
    }

    function parseUnitHtml(html) {
        var root = document.createElement('div');
        root.innerHTML = html;
        var nodes = root.childNodes;

        var units = [];
        for (var i = 0; i < nodes.length; i++) {
            units.push({
                text: nodes[i].textContent,
                superscript: nodes[i].tagName == 'SUP'
            });
        }
        return units;
    }

    function addBubble() {
        findBubblePosition();
        var color = config.bubbleColor || defaultOptions.bubbleColor;
        if (valuePositoinFound) {
            renderBubbleTriangle(bubbleX, bubbleY, color);
        }
        var bubbleHeight = getBubbleHeight();
        var x = bubbleX - bubbleLength / 2;
        if (x < 0) {
            x = 0;
        }
        if (x + bubbleLength > 1000) {
            x = 1000 - bubbleLength;
        }
        var y = bubbleY - bubbleHeight - 19;
        renderBubble(x, y, bubbleHeight, color);


        var renderTextResult = renderBubbleText(100, 100, 50, "#FFF");

        x += (bubbleLength - renderTextResult.width) / 2;
        y += (bubbleHeight - renderTextResult.height) / 2 + renderTextResult.height - 18;

        renderTextResult.textElements.forEach(function (elem) {
            elem.attr({
                x: x,
                y: elem.superscript ? y - 15 : y
            });
            x += elem.getBBox().width;
        });
    }

    function renderBbox(bbox) {
        renderRect(bbox.x, bbox.y, bbox.width, bbox.height, '#0F0');
    }

    function checkIsArray(arr) {
        if (Object.prototype.toString.call(arr) === '[object Array]') {
            alert('Array!');
        }
    }

    function getBubbleHeight() {
        var segmentHeight = config.segmentHeight || defaultOptions.segmentHeight,
            valueHeight = config.segmentHeight || defaultOptions.segmentHeight;

        if (config.viewBoxHeight - segmentHeight < valueHeight) {
            config.valueHeight = config.viewBoxHeight - valueHeight;
        }

        return config.valueHeight || defaultOptions.valueHeight - 19;
    }

    function renderBubble(x, y, height, color) {
        renderRect(x, y, bubbleLength, height, color, 15);
    }

    function renderSegment(x, y, length, segmentConfig, type) {

        var textX = x,
            textY = y,
            segmentLength = length;

        var height = config.segmentHeight || defaultOptions.segmentHeight;
        var color = segmentConfig.color;
        var sideStyle = config.sideStyle || defaultOptions.sideStyle;

        if (type == "single") {
            if (sideStyle == "angle") {
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
                    renderLeftAngleSegment(x, y, height, color, length - height / 2);
                    length -= height / 2;
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
                    renderRightAngleSegment(x, y, height, color, length - height / 2);
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

        var text = getSegmentText(segmentConfig, type);
        var textElem = renderText(textX, textY, text, 50);
        var textBBox = textElem.getBBox();
        textElem.attr({
            fill: "#FFF",
            x: textX + (segmentLength - textBBox.width) / 2,
            y: textY + textBBox.height - 5
        });

        if (config.showDescription) {
            textY += height;
            var descText = renderText(textX, textY, segmentConfig.descriptionText || "no description", config.descriptionSize || defaultOptions.descriptionSize - 5);
            textBBox = descText.getBBox();
            descText.attr({
                fill: config.descriptionColor || defaultOptions.descriptionColor,
                x: textX + (segmentLength - textBBox.width) / 2,
                y: textY + textBBox.height - 10
            });
        }
    }

    function getSegmentText(segment, type) {
        if (segment.text) {
            return segment.text;
        }
        if (type == 'left') {
            return '<' + segment.maxValue;
        }
        if (type == "right") {
            return '>' + segment.minValue;
        }
        if (!segment.minValue || !segment.maxValue) {
            return "";
        }
        return segment.minValue + '-' + segment.maxValue
    }

    function renderSegments() {
        if (segments.length == 0) {
            renderEmptyBar();
            return;
        }
        var _x = 0;
        var _y = 0;

        var descText = 0;
        if (config.showDescription) {
            descText = (config.descriptionSize || defaultOptions.descriptionSize);
        }
        if (config.showValue) {
            _y = config.viewBoxHeight - config.segmentHeight - descText;
            bubbleY = _y;
        }
        var xLength;

        if (segments.length == 1) {
            xLength = 1000;
            renderSegment(_x, _y, xLength, segments[0], "single");
            // console.log("startX=" + segments[0].startX);
        } else {
            var gap = config.gap || defaultOptions.gap;
            xLength = Math.round((1000 + gap) / segments.length - gap);

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


    function renderText(x, y, text, size) {
        return paper.text(x, y, text).attr({
            fontSize: size,
            fontFamily: "Calibri, verdana, tahoma"
        });
    }

    function moveTextElement(textElement, x, y) {
        textElement.attr({
            x: x,
            y: y
        });
    }


    SegmentedBar.init = function (container, barConfig, _segments) {
        paper = Snap('100%', '100%');
        paper.node.removeAttribute('height');

        if (container) {
            container.appendChild(paper.node);
            container.style.overflow = 'hidden';
        }


        segments = _segments;

        config = barConfig;

        bubbleX = 500;
        bubbleY = 0;
        valuePositoinFound = false;

        setViewBox();
        renderSegments();
        if (config.showValue) {
            addBubble();
        }

        return this;
    };

}(window, document, SegmentedBar));

