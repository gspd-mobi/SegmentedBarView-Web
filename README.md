# SegmentedBar.js

Simple javascript library for creating beatiful, responsive, mobile friendly SVG segmented bars.
![Imgur](https://i.imgur.com/1a3oXi5.png)

Live demo [here](http://gspd.mobi/segmentedbar)
##Installation

To install using bower:

```bash
bower install --save segmentedbar
```

To install using npm:

```bash
npm install --save segmentedbar
```

##Dependencies
No dependencies!

##Getting started

1) Add link to segmentedbar.js (or segmentedbar.min.js) in your html:
```
<script src="segmentedbar.js"></script>
```
2) Create config: 
```javascript
var config = {
    emptySegmentText: "No data",
    emptySegmentTextColor: "#FFF",
    emptySegmentColor: "#858585",
    gap: 10,
    textSize: 35,
    textFont: "Calibri, verdana, tahoma",
    sideStyle: "rounded",
    sideRadius: 50,
    showValue: true,
    value: 4.96,
    valueSegment: null,
    unit: '10<sup>12</sup>/l',
    segmentHeight: 80,
    valueHeight: 100,
    bubbleColor: "#7492E2",
    backgroundColor: "#FFF",
    viewBoxHeight: 100,
    viewBoxWidth: 1000,
    descriptionSize: 40,
    descriptionColor: '#FFF',
    segments: [{
        minValue: 0,
        maxValue: 4.5,
        color: '#EF3D2F'
    },
        {
            minValue: 4.5,
            maxValue: 6.5,
            color: '#8CC63E'
        },
        {
            minValue: 6.5,
            color: '#EF3D2F'
        }]
}
```

3) Create new bar:
```javascript
var elem = document.getElementById('bar');
var bar = new SegmentedBar.Bar(elem, config);
```
### Conifguration

**emptySegmentText** - label for empty bar (default - "No data")
    
**emptySegmentTextColor** - font color for empty bar label  (default - "#FFF")
    
**emptySegmentColor** - backgorund color for empty segment (default - "#858585")
    
**gap** - gap between segments (default - 10)
    
**textSize** - font size fo labels (default - 35)
    
**textFont** - font-family for labels (default - "Calibri, verdana, tahoma")
    
**sideStyle** - can be "rounded", "angle" or "normal" (default value - "angle")
    
**sideRadius** - corner radius for "rounded" side (default value - 50)
    
**showValue** - show/hide bubble with value (default value - false)
    
**value**: 4.96 - value in bubble
    
**valueSegment** -  segment index, where bubble will appear up to it ( it will override 'value' parameter)
    
**unit** - unit for value (you can use <sup></sup> to add power)

**segmentHeight** - height of segments (default - 80)
    
**valueHeight** - buble height (default - 100)
    
**bubbleColor** - bubble color (default - "#7492E2")
    
**backgroundColor** - bar backgound color (default - "#FFF")
    
**descriptionColor** - color for labels (default - "#FFF")
    
**segments** - array of segments: 

        {
             minValue, 
             maxValue,
             color
        },


##License

SegmentedBar.js is available under the [MIT license](https://opensource.org/licenses/MIT).

This code was produced for Clinishare Ltd. This code is published as open-source with the permission of Clinishare Ltd. www.clinishare.net
