(function (window, document, SegmentedBar) {
    'use strict';

    SegmentedBar.Bar = function (container, config) {
        var self = this;

        this.container = container;
        this.config = config;
        this.bubbleRendereded = false;
        //TODO: Create more human-friendly config
        this.defaultConfig = {
            emptySegmentText: "No segments",
            emptySegmentTextColor: "#FFF",
            emptySegmentColor: "#858585",
            gap: 10,
            textSize: 25,
            textFont: "Calibri, verdana, tahoma",
            showDescription: false,
            sideStyle: "rounded",
            sideRadius: 50,
            showValue: true,
            value: 160,
            unit: [],
            segmentHeight: 80,
            valueHeight: 100,
            bubbleColor: "#7492E2",
            backgroundColor: "#FFF",
            viewBoxHeight: 100,
            viewBoxWidth: 1000,
            descriptionSize: 40,
            descriptionColor: '#000',
            segments: [
                {
                    color: "#FF0000",
                    minValue: 124,
                    maxValue: 134
                },
                {
                    color: "#008000",
                    minValue: 134,
                    maxValue: 144
                },
                {
                    color: "#FF0000",
                    minValue: 144,
                    maxValue: 160
                }
            ]
        };

        createBar();

        this.resizeListener = window.addEventListener('resize', function () {
            //TODO:
            update();
        });

        function update() {
            createBar();
        }

        //TODO: add angle empty segment
        function renderEmptySegment() {
            if (self.config.sideStyle === "rounded") {
                var radius = self.config.segmentHeight * self.config.sideRadius / 100;
                SegmentedBar.Svg.drawRect(self.paper, 0, 0, '100%', self.config.segmentHeight, radius, self.config.emptySegmentColor)
            }
            if (self.config.sideStyle === "normal") {
                SegmentedBar.Svg.drawRect(self.paper, 0, 0, '100%', self.config.segmentHeight, 0, self.config.emptySegmentColor)
            }
            var label = {
                text: self.config.emptySegmentText,
                color: self.config.emptySegmentTextColor,
                fontSize: self.config.textSize,
                fontFamily: self.config.textFont
            };
            SegmentedBar.Svg.drawLabel(self.paper, 0, 50, label);
        }

        function renderBubble(x, y) {
            var height = self.config.valueHeight;
            SegmentedBar.Svg.drawBubble(self.paper, x, y, 200, height, 15, "#7492E2", self.config.viewBoxWidth);
        }

        function renderLabelInRectCenter(x, y, width, height, text) {
            var label = {
                text: text,
                fontSize: self.config.textSize,
                fontFamily: self.config.textFont,
                color: self.config.descriptionColor

            };
            var labelNode = SegmentedBar.Svg.drawLabel(self.paper, x, y, label);
            var bbox = labelNode.getBoundingClientRect(),
                labelX = x + (width - bbox.width) / 2,
                labelY = y + (height - bbox.height) / 2 + bbox.height / 2;

            console.log('BBox :' + bbox.width + ' ' + bbox.height);
            console.log(labelX + ' ' + labelY);
            SegmentedBar.Svg.setAttributes(labelNode, {
                x: labelX,
                y: labelY
            })

        }

        function renderSegmentLabel(segment) {
            renderLabelInRectCenter(segment.x, segment.y, segment.length, segment.height, segment.minValue);
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

            if (self.config.value && self.config.showValue) {
                if (segment.minValue <= self.config.value && segment.maxValue >= self.config.value) {
                    renderBubble(findBubbleX(segment), segment.y);
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
            //TODO: merge default and user data
            self.config = self.defaultConfig;

            setViewBox();
        }

        function setBarSize() {
            self.width = self.container.offsetWidth;
            self.height = self.width * self.config.viewBoxHeight / self.config.viewBoxWidth;

        }

        function setViewBox() {
            self.config.viewBoxHeight = self.config.segmentHeight || self.defaultConfig.segmentHeight;

            if (self.config.showValue) {
                self.config.viewBoxHeight += self.config.valueHeight || self.defaultConfig.valueHeight;
            }
            if (self.config.showDescription) {
                self.config.viewBoxHeight += (self.config.descriptionSize || self.defaultConfig.descriptionSize);
            }
        }

        return this;
    };

})(window, document, SegmentedBar);