(function (window, document, SegmentedBar) {
    'use strict';

    SegmentedBar.Bar = function (container, config) {
        var self = this;

        this.container = container;
        this.config = config;

        //TODO: Create more human-friendly config
        this.defaultConfig = {
            emptySegmentText: "No segments",
            emptySegmentTextColor: "#FFF",
            emptySegmentColor: "#858585",
            gap: 0,
            textSize: 10,
            textFont: "Calibri, verdana, tahoma",
            showDescription: false,
            sideStyle: "rounded",
            sideRadius: 50,
            showValue: false,
            value: "no value",
            unit: [],
            segmentHeight: 80,
            valueHeight: 120,
            bubbleColor: "#7492E2",
            backgroundColor: "#FFF",
            viewBoxHeight: 100,
            viewBoxWidth: 1000,
            descriptionSize: 40,
            descriptionColor: '#000',
            segments: []
        };

        createBar();

        this.resizeListener = window.addEventListener('resize', function () {
            //TODO:
            update();
        });

        function update() {
            createBar();
        }

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

        function renderSegments() {

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

            if (typeof self.config.segments === 'undefined' || self.config.segments.length === 0) {
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