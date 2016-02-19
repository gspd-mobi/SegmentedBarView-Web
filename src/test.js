var paper = Snap('100%', '100%');
paper.attr({
    viewBox: "0 0 1000 240"
});

paper.rect(0, 0, '100%', '100%').attr({
    fill: '#DBF2B5'
});

var text = paper.text(100, 100, '8mmm');

var bbox = text.getBBox();
console.log(bbox);