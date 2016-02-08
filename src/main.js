var segments = [];
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#8CC63E"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));
segments.push(new Segment({color : "#EF3D2F"}));

var a = SegmentedBar.init({sideStyle: "normal", showValue: false}, segments);
var b = SegmentedBar.init({sideStyle: "rounded", showValue: true}, segments);
var c = SegmentedBar.init({sideStyle: "angle", showValue: true}, segments);



