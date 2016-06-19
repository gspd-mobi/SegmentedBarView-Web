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
            valueSegment: null,
            unit: '',
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
            }
            else {
            }
            self.bubbleRendereded = true;
        }

        function renderLabelInRectCenter(label, x, y, width, height) {
            var labelNode = SegmentedBar.Svg.drawLabel(self.paper, x, y, label);
            var bbox = labelNode.getBBox(),
                fontSize = self.config.textSize,
                labelX = x + (width - bbox.width) / 2,
                labelY = y + (height + bbox.height) / 2 - fontSize / 3;

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
                return '<' + segment.maxValue;
            }
            if (segment.position == "last") {
                return '>' + segment.minValue;
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
                if (self.config.valueSegment && self.config.valueSegment === segment.index) {
                    renderBubble(segment.x + segment.length / 2, y, true);
                }
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
                segment.index = i;

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