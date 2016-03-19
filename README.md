# ng-c3-export

In this repository you can find a module extending c3 chart library with image exporting functionality.

## Demo
You can check a working demo [here](https://ngc3export.firebaseapp.com/).

## Install

Install via npm: 

```
npm install ng-c3-export
```

Install via bower: 

```
bower install ng-c3-export
```

## Usage

### 1. step

First include the library files `ng-c3-export.js` and `ng-c3-export.css` (or the minified version of them). 

> If you use a tool like e.g. **wiredep** that wires your bower dependencies, you don't have to worry about this step.
> It will find them because they are configured in the bower.json file.

### 2. step

Put the export-chart directive on the element you use for your c3 chart:

```html
<div id="my-line-chart" export-chart exported-file-name="My line chart exported"></div>
```

And you're ready to go!

## Options

Currently the following options are availabe:

* **exported-file-name**: when set, the exported chart will be downloaded with the given name

## Version History

### 0.2.0 (In progress)
SVG export support

### 0.1.0
Initial version (Only png export possible)

## Credits
This module was built on the following Gist: https://gist.github.com/aendrew/1ad2eed6afa29e30d52e#file-exportchart-js-L29
