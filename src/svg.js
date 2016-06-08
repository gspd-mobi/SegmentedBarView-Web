SegmentedBar.Svg = (function (window, document, SegmentedBar) {
    'use strict';

    function drawRect(paper, x, y, width, height, backgroundColor) {
        var attributes = {
                x: x,
                y: y,
                width: width,
                height: height,
                style: 'fill:' + backgroundColor
            },
            node = createElement('rect', attributes, paper);

        return node;
    }

    //TODO: add insertBefore parameter
    function createElement(elemName, attributes, parent) {
        var node = document.createElementNS(SegmentedBar.namespace, elemName);
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
        drawRect : drawRect
    }

})(window, document, SegmentedBar);