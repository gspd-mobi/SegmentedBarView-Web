SegmentedBar.Svg = (function (window, document, SegmentedBar) {
    'use strict';

    function drawRect(paper, x, y, width, height, radius, backgroundColor) {
        var attributes = {
            x: x,
            y: y,
            rx: radius,
            ry: radius,
            width: width,
            height: height,
            style: 'fill:' + backgroundColor
        };
        return createElement('rect', attributes, paper);
    }

    function drawLabel(paper, x, y, label) {
        var attributes = {
            x: x,
            y: y,
            text: label.text,
            fill: label.color,
            style: 'font-size:' + label.fontSize  + 'px' + ';font-family: ' + label.fontFamily + ';'
        };
        return createElement('text', attributes, paper);
    }

    function drawRoundedLeftRect(paper, x, y, width, height, color) {
        var r = height / 2;
        x += r;
        width -= r;
        var x1 = x + width,
            y1 = y + height,
            d = "M " + x + " " + y + " L " + x1 + " " + y + " L " + x1 + " " + y1 + " L " +
                x + " " + y1 + " A 10 10 0 1 1 " + x + " " + y;

        var attributes = {
            d: d,
            fill: color
        };
        return createElement('path', attributes, paper);
    }

    function drawRoundedRightRect(paper, x, y, width, height, color) {
        width -= height / 2;
        var x1 = x + width,
            y1 = y + height,
            d = "M " + x + " " + y + " L " + x1 + " " + y + " L " + x1 + " " + y1 + " L " +
                x + " " + y1 + " M " + x1 + " " + y1 + " A 10 10 0 1 0 " + x1 + " " + y;

        var attributes = {
            d: d,
            fill: color
        };

        return createElement('path', attributes, paper)
    }

    //TODO: refactor this method, replace zero with topY
    function drawBubble(paper, x, y, width, height, r, color, maxX) {
        var x1 = x - width / 2,
            triangleSize = 15,
            y1 = y - triangleSize;
        if (x1 < 0) {
            x1 = 0;
        }
        if (x1 + width > maxX) {
            x1 = maxX - width;
        }

        var
            d = M(x, y) + ' ' + L(x - triangleSize, y1) + ' ' + L(x1 + r, y1) + ' ' + A(r, r, 0, 0, 1, x1, y1 - r) +
                L(x1, r) + ' ' + A(r, r, 0, 0, 1, x1 + r, 0) + ' ' + L(x1 + width - r, 0) +
                A(r, r, 0, 0, 1, x1 + width, r) + ' ' + L(x1 + width, y1 - r) + ' ' +
                A(r, r, 0, 0, 1, x1 + width - r, y1) + ' ' + L(x + triangleSize, y1) + ' ' + L(x, y);

        var attributes = {
            d: d,
            fill: color
        };
        return {
            elem : createElement('path', attributes, paper),
            x : x1,
            y : 0
        }
    }

    function M(x, y) {
        return 'M ' + x + ' ' + y;
    }

    function L(x, y) {
        return 'L ' + x + ' ' + y;
    }

    function A(rx, ry, xRotation, arcFlag, sweepFlag, x, y) {
        return 'A ' + rx + ' ' + ry + ' ' + xRotation + ' ' + arcFlag + ' ' + sweepFlag + ' ' + x + ' ' + y;
    }

    function drawAngleLeftRect(paper, x, y, width, height, color) {
        var r = height / 2;
        x += r;
        width -= r;
        var x1 = x + width,
            y1 = y + height,
            d = "M " + x + " " + y + " L " + x1 + " " + y + " L " + x1 + " " + y1 + " L " +
                x + " " + y1 + " L " + (x - r) + " " + (y1 - r) + " L " + x + " " + y;

        var attributes = {
            d: d,
            fill: color
        };
        return createElement('path', attributes, paper);
    }

    function drawAngleRightRect(paper, x, y, width, height, color) {
        var r = height / 2;
        width -= r;
        var x1 = x + width,
            y1 = y + height,
            d = "M " + x + " " + y + " L " + x1 + " " + y + " L " + (x1 + r) + " " + (y + r) + " L " +
                x1 + " " + y1 + " L " + x + " " + y1 + " L " + x + " " + y;

        var attributes = {
            d: d,
            fill: color
        };

        return createElement('path', attributes, paper)
    }

    function drawHexagon(paper, x, y, width, height, color) {
        var r = height / 2;
        width -= r * 2;
        x += r;
        var x1 = x + width,
            y1 = y + height,
            d = "M " + x + " " + y + " L " + x1 + " " + y + " L " + (x1 + r) + " " + (y + r) + " L " +
                x1 + " " + y1 + " L " + x + " " + y1 + " L " + (x - r) + " " + (y + r) + " L " + x + " " + y;

        var attributes = {
            d: d,
            fill: color
        };

        return createElement('path', attributes, paper)
    }

    //TODO: add insertBefore parameter
    function createElement(elemName, attributes, parent) {
        var node = document.createElementNS(SegmentedBar.namespaces.svg, elemName);
        if (elemName === 'svg') {
            setAttributes(node, {'xmlns:segview': SegmentedBar.namespaces.segview})
        }
        if (elemName === 'text') {
            var textNode = document.createTextNode(attributes.text);
            node.appendChild(textNode);
        }
        if (attributes) {
            setAttributes(node, attributes);
        }
        //TODO: check parent
        if (parent) {
            parent.appendChild(node);
        }
        return node;
    }

    function setAttributes(node, attributes) {
        Object.keys(attributes).forEach(function (key) {
            node.setAttribute(key, attributes[key]);
        })
    }

    return {
        createElement: createElement,
        setAttributes: setAttributes,
        drawRect: drawRect,
        drawLabel: drawLabel,
        drawRoundedLeftRect: drawRoundedLeftRect,
        drawRoundedRightRect: drawRoundedRightRect,
        drawAngleLeftRect: drawAngleLeftRect,
        drawAngleRightRect: drawAngleRightRect,
        drawHexagon: drawHexagon,
        drawBubble : drawBubble
    }

})(window, document, SegmentedBar);