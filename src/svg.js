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
            style: 'font-size:' + label.fontSize + ';font-family:' + label.fontFamily + ';'
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
            node.innerHTML = attributes.text;
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
        drawHexagon : drawHexagon
    }

})(window, document, SegmentedBar);