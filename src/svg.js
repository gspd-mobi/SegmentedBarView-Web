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
            style: 'font-size:' + label.fontSize + ';font-family:' + label.fontFamily +';'
        };
        return createElement('text', attributes, paper);
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
        drawLabel : drawLabel
    }

})(window, document, SegmentedBar);