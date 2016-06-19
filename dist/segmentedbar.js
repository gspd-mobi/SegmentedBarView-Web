var SegmentedBar = {};

(function (window, document, SegmentedBar) {
    'use strict';
    SegmentedBar.namespaces = {
        svg: 'http://www.w3.org/2000/svg',
        xmlns: 'http://www.w3.org/2000/xmlns/',
        segview: ' https://github.com/gspd-mobi/SegmentedBarView-Web'
    };

    SegmentedBar.createPaper = function createPaper(container, config) {
        var svgElement;

        svgElement = SegmentedBar.Svg.createElement('svg', {
            width: config.width,
            height: config.height,
            viewBox: config.viewBox
        });

        container.appendChild(svgElement);

        return svgElement;
    }

})(window, document, SegmentedBar);

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
            style: 'font-size:' + label.fontSize + 'px' + ';font-family: ' + label.fontFamily + ';'
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
    function drawBubble(paper, x, y, width, height, r, color, maxX, beforeNode) {
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
            elem: createElement('path', attributes, paper, beforeNode),
            x: x1,
            y: 0
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

    function createElement(elemName, attributes, parent, beforeNode) {
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
        if (parent) {
            if (beforeNode) {
                parent.insertBefore(node, beforeNode);
            } else {
                parent.appendChild(node);
            }
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
        drawBubble: drawBubble
    }

})(window, document, SegmentedBar);
(function (window, document, SegmentedBar) {
    'use strict';

    SegmentedBar.Bar = function (container, config) {
        var self = this;

        this.container = container;
        this.config = config;
        this.bubbleRendereded = false;
        this.defaultConfig = {
            emptySegmentText: "No data",
            emptySegmentTextColor: "#FFF",
            emptySegmentColor: "#858585",
            gap: 10,
            textSize: 35,
            textFont: "Calibri, verdana, tahoma",
            sideStyle: "angle",
            sideRadius: 50,
            showValue: false,
            value: 144,
            unit: 'mmol<sup>2</sup>/L',
            segmentHeight: 80,
            valueHeight: 100,
            bubbleColor: "#7492E2",
            backgroundColor: "#FFF",
            viewBoxHeight: 100,
            viewBoxWidth: 1000,
            descriptionSize: 40,
            descriptionColor: '#FFF',
            segments: []
        };

        createBar();

        this.resizeListener = window.addEventListener('resize', function () {
            self.bubbleRendereded = false;
            update();
        });

        function update() {
            createBar();
        }

        //TODO: add angle empty segment
        function renderEmptySegment() {
            if (self.config.sideStyle === 'rounded') {
                var radius = self.config.segmentHeight * self.config.sideRadius / 100;
                SegmentedBar.Svg.drawRect(self.paper, 0, 0, '100%', self.config.segmentHeight, radius, self.config.emptySegmentColor);
            }
            if (self.config.sideStyle === 'normal') {
                SegmentedBar.Svg.drawRect(self.paper, 0, 0, '100%', self.config.segmentHeight, 0, self.config.emptySegmentColor);
            }
            if (self.config.sideStyle === 'angle') {
                SegmentedBar.Svg.drawHexagon(self.paper, 0, 0, self.config.viewBoxWidth, self.config.segmentHeight, self.config.emptySegmentColor);
            }
            var label = {
                text: self.config.emptySegmentText,
                color: self.config.emptySegmentTextColor,
                fontSize: self.config.textSize,
                fontFamily: self.config.textFont
            };
            renderLabelInRectCenter(label, 0, 0, self.config.viewBoxWidth, self.config.segmentHeight);
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

        function prerenderBubbleText(x, y) {
            var textArr = [self.config.value + (self.config.unit ? '\u00A0' : '')],
                unitArr = parseUnitHtml(self.config.unit || '');

            unitArr.forEach(function (unit) {
                textArr.push(unit.text || '');
            });

            var bbox,
                textNode,
                width = 0,
                height = 0;

            var textNodes = [],
                label = null;


            textArr.forEach(function (text, i) {
                label = {
                    text: text,
                    fontSize: i == 0 ? self.config.textSize : self.config.textSize / 1.5,
                    fontFamily: self.config.textFont,
                    color: self.config.descriptionColor
                };
                textNode = SegmentedBar.Svg.drawLabel(self.paper, x, y, label);
                bbox = textNode.getBBox();
                textNode.width = bbox.width;
                x += bbox.width;
                width += bbox.width;
                if (height < bbox.height) {
                    height = bbox.height;
                }
                if ((i != 0) && unitArr[i - 1].superscript) {
                    textNode.superscript = true;
                }

                textNodes.push(textNode);
            });

            return {
                width: width,
                height: height,
                textNodes: textNodes
            }
        }

        function renderBubble(x, y, segmentFounded) {
            var height = self.config.valueHeight,
                label = {
                    text: self.config.value,
                    fontSize: self.config.textSize,
                    fontFamily: self.config.textFont,
                    color: self.config.descriptionColor

                };

            var bubbleText = prerenderBubbleText(x, y),
                bubbleWidth = bubbleText.width * 1.5;

            if (segmentFounded) {
                var bubble = SegmentedBar.Svg.drawBubble(self.paper, x, y, bubbleWidth, height, 15,
                    self.config.bubbleColor, self.config.viewBoxWidth, bubbleText.textNodes[0]),
                    attributes = null;

                x -= bubbleText.width / 2;
                y = (height - 15) / 2 + bubbleText.height / 2 - self.config.textSize / 3;

                bubbleText.textNodes.forEach(function (node) {
                    attributes = {
                        x: x,
                        y: node.superscript ? y - self.config.textSize / 2.5 : y
                    };
                    SegmentedBar.Svg.setAttributes(node, attributes);
                    x += node.width;
                });
                //     renderLabelInRectCenter(label, bubble.x, bubble.y, 200, height - 15);
            }
            else {
                // var bubble = SegmentedBar.Svg.drawRect(self.paper, x - 100, y ,200, height - 15, 15,self.config.bubbleColor);
                //   renderLabelInRectCenter(label, x - 100, y, 200, height - 15);
            }
            self.bubbleRendereded = true;
        }

        function renderLabelInRectCenter(label, x, y, width, height) {
            var labelNode = SegmentedBar.Svg.drawLabel(self.paper, x, y, label);
            var bbox = labelNode.getBBox(),
                fontSize = self.config.textSize,
                labelX = x + (width - bbox.width) / 2,
                labelY = y + (height + bbox.height) / 2 - fontSize / 3;

            console.log('BBox :' + bbox.width + ' ' + bbox.height);
            console.log(labelX + ' ' + labelY);
            SegmentedBar.Svg.setAttributes(labelNode, {
                x: labelX,
                y: labelY
            });
        }

        function getSegmentText(segment) {
            if (segment.descriptionText) {
                return segment.descriptionText;
            }
            if (segment.position == 'first') {
                return '<' + segment.minValue;
            }
            if (segment.position == "last") {
                return '>' + segment.maxValue;
            }
            return segment.minValue + '-' + segment.maxValue;
        }

        function renderSegmentLabel(segment) {
            var text = getSegmentText(segment),
                label = {
                    text: text,
                    fontSize: self.config.textSize,
                    fontFamily: self.config.textFont,
                    color: self.config.descriptionColor

                };
            renderLabelInRectCenter(label, segment.x, segment.y, segment.length, segment.height);
        }

        function renderSegment(segment) {
            if (segment.sideStyle == "normal") {
                SegmentedBar.Svg.drawRect(self.paper, segment.x, segment.y, segment.length,
                    self.config.segmentHeight, 0, segment.color);
            }
            if (segment.sideStyle === "rounded") {
                if (segment.position === "first") {
                    SegmentedBar.Svg.drawRoundedLeftRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, segment.color);
                } else if (segment.position == "last") {
                    SegmentedBar.Svg.drawRoundedRightRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, segment.color);
                } else if (segment.position == "single") {
                    SegmentedBar.Svg.drawRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, self.config.segmentHeight / 2, segment.color);
                } else {
                    SegmentedBar.Svg.drawRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, 0, segment.color);
                }
            }
            if (segment.sideStyle === "angle") {
                if (segment.position === "first") {
                    SegmentedBar.Svg.drawAngleLeftRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, segment.color);
                } else if (segment.position === "last") {
                    SegmentedBar.Svg.drawAngleRightRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, segment.color);
                } else if (segment.position === "single") {
                    SegmentedBar.Svg.drawHexagon(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, segment.color);
                } else {
                    SegmentedBar.Svg.drawRect(self.paper, segment.x, segment.y, segment.length,
                        self.config.segmentHeight, 0, segment.color);
                }
            }
            renderSegmentLabel(segment);

            var value = self.config.value;
            if (value && self.config.showValue && !self.bubbleRendereded) {
                if (segment.minValue < value && segment.maxValue > value) {
                    renderBubble(findBubbleX(segment), segment.y, true);
                } else if ((segment.minValue === value && segment.includeLeft) || (segment.maxValue === value && segment.includeRight)) {
                    renderBubble(findBubbleX(segment), segment.y, true);
                }
            }

        }

        function findBubbleX(segment) {
            var x = (self.config.value - segment.minValue) * segment.length / (segment.maxValue - segment.minValue) + segment.x,
                r = segment.height / 2;

            if ((segment.position === 'first' || segment.position === 'single') && x < r) {
                x = r + 1;
            }
            if ((segment.position === "last" || segment.position === 'single') && x >= self.config.viewBoxWidth - r) {
                x = self.config.viewBoxWidth - r - 1;
            }
            return x;
        }

        function renderSegments() {
            var startY = (self.config.showValue && self.config.value && self.config.valueHeight) ? self.config.valueHeight : 0,
                startX = 0,
                segmentsCount = self.config.segments.length,
                segmentLength = (self.config.viewBoxWidth - (segmentsCount - 1) * self.config.gap) / segmentsCount,
                segment = null;

            if (self.config.valueHeight > 0 && self.showValue) {
                startY = self.config.valueHeight;
            }
            for (var i = 0; i < segmentsCount; i++) {
                segment = self.config.segments[i];
                segment.x = startX;
                segment.y = startY;
                segment.length = segmentLength;
                segment.sideStyle = self.config.sideStyle;
                segment.height = self.config.segmentHeight;

                if (segmentsCount == 1) {
                    segment.position = "single";
                } else {
                    if (i == 0) {
                        segment.position = "first";
                    }
                    if (i == segmentsCount - 1) {
                        segment.position = "last";
                    }
                }

                renderSegment(segment);
                startX += segmentLength + self.config.gap;
            }
            if (self.config.showValue && self.config.value && !self.bubbleRendereded) {
                renderBubble(self.config.viewBoxWidth / 2, 0, false);
            }
        }

        function createBar() {
            if (self.paper) {
                self.container.removeChild(self.paper);
            }

            normalizeData();
            setBarSize();

            self.paper = SegmentedBar.createPaper(container, {
                width: self.width,
                height: self.height,
                viewBox: '0 0 ' + self.config.viewBoxWidth + ' ' + self.config.viewBoxHeight
            });

            SegmentedBar.Svg.drawRect(self.paper, 0, 0, '100%', '100%', 0, self.config.backgroundColor);

            if (!self.config.segments || self.config.segments.length === 0) {
                renderEmptySegment();
            } else {
                renderSegments();
            }
        }

        function normalizeData() {
            Object.keys(self.defaultConfig).forEach(function (key) {
                if (!self.config[key]) {
                    self.config[key] = self.defaultConfig[key];
                }
            });
            if (!self.config.showValue || self.config.segments.length === 0 || !self.config.value) {
                self.config.valueHeight = 0;
            }
            console.log(self.config);
            setViewBox();
        }

        function setBarSize() {
            self.width = self.container.offsetWidth;
            self.height = self.width * self.config.viewBoxHeight / self.config.viewBoxWidth;

        }

        function setViewBox() {
            self.config.viewBoxHeight = self.config.segmentHeight;

            if (self.config.showValue) {
                self.config.viewBoxHeight += self.config.valueHeight;
            }

        }

        return this;
    };

})(window, document, SegmentedBar);