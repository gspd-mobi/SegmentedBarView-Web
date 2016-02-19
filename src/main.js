var container1 = document.getElementById('container1');
var container2 = document.getElementById('container2');
var container3 = document.getElementById('container3');
var container4 = document.getElementById('container4');
var container5 = document.getElementById('container5');

var segments = [];
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
segments.push(new Segment({color: "#EF3D2F", minValue: 1, maxValue: 3.5, includeLeft: true}));
segments.push(new Segment({color: "#8CC63E", minValue: 4, maxValue: 10}));
segments.push(new Segment({color: "#EF3D2F", minValue: 11, maxValue: 20, includeRight: true}));
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));
//segments.push(new Segment({color : "#EF3D2F", minValue: 1, maxValue: 3}));

var a = SegmentedBar.init(container1, {
    sideStyle: "normal",
    showValue: true,
    segmentHeight: 80,
    value: 8,
    gap: 20,
    unit: '10<sup>12</sup>/l',
    showDescription: true,
}, segments);
var b = SegmentedBar.init(container2, {
    sideStyle: "rounded",
    showValue: true,
    segmentHeight: 80,
    value: 1,
    gap: 20,
    showDescription: true
}, segments);
var c = SegmentedBar.init(container3, {
    sideStyle: "angle",
    showValue: true,
    segmentHeight: 80,
    value: 9,
    gap: 20,
    showDescription: true,
}, segments);
//
//var segments1 = [];
//segments1.push(new Segment({color : "#EF3D2F", text: "aaaaa"}));
//
//var d = new SegmentedBar.init({sideStyle: "normal", showValue: true, segmentHeight: 80}, segments1);
//var e = SegmentedBar.init({sideStyle: "rounded", showValue: true, segmentHeight: 80}, segments1);
//var f = SegmentedBar.init({sideStyle: "angle", showValue: true, segmentHeight: 80 }, segments1);
//
