var segments = [];
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
segments.push(new Segment({color : "#8CC63E", minValue: 4, maxValue: 10}));
segments.push(new Segment({color : "#EF3D2F", minValue: 11, maxValue: 20}));
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));

var a = SegmentedBar.init({sideStyle: "normal", showValue: true,  segmentHeight: 80, value : 2}, segments);
var b = SegmentedBar.init({sideStyle: "rounded", showValue: true, segmentHeight: 80, value: 5}, segments);
var c = SegmentedBar.init({sideStyle: "angle", showValue: true, segmentHeight: 80, value: 6}, segments);

var segments1 = [];
segments1.push(new Segment({color : "#EF3D2F"}));

var d = SegmentedBar.init({sideStyle: "normal", showValue: true, segmentHeight: 80}, segments1);
var e = SegmentedBar.init({sideStyle: "rounded", showValue: true, segmentHeight: 80}, segments1);
var f = SegmentedBar.init({sideStyle: "angle", showValue: true, segmentHeight: 80 }, segments1);
