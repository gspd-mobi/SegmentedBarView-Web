var segments = [];
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#8CC63E"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));

var a = SegmentedBar.init({sideStyle: "normal", showValue: true,  segmentHeight: 80}, segments);
var b = SegmentedBar.init({sideStyle: "rounded", showValue: true, segmentHeight: 80}, segments);
var c = SegmentedBar.init({sideStyle: "angle", showValue: true, segmentHeight: 80}, segments);

var segments1 = [];
segments1.push(new Segment({color : "#EF3D2F"}));

var d = SegmentedBar.init({sideStyle: "normal", showValue: true, segmentHeight: 80}, segments1);
var e = SegmentedBar.init({sideStyle: "rounded", showValue: true, segmentHeight: 80}, segments1);
var f = SegmentedBar.init({sideStyle: "angle", showValue: true, segmentHeight: 80 }, segments1);
