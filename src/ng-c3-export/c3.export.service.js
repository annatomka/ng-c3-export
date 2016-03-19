(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .factory('ExportService', function () {

      return {
        createSVGContent: function (svg, styles) {

          /*
           Copyright (c) 2013 The New York Times
           Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
           The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
           SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
           */

          //via https://github.com/NYTimes/svg-crowbar

          var prefix = {
            xmlns: "http://www.w3.org/2000/xmlns/",
            xlink: "http://www.w3.org/1999/xlink",
            svg: "http://www.w3.org/2000/svg"
          };

          var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';


          svg.setAttribute("version", "1.1");

          // Disabled defs because it was screwing up PNG output
          //var defsEl = document.createElement("defs");
          //svg.insertBefore(defsEl, svg.firstChild); //TODO   .insert("defs", ":first-child")

          var styleEl = document.createElement("style");
          //defsEl.appendChild(styleEl);
          styleEl.setAttribute("type", "text/css");


          // removing attributes so they aren't doubled up
          svg.removeAttribute("xmlns");
          svg.removeAttribute("xlink");

          // These are needed for the svg
          if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
            svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
          }

          if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
            svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
          }

          var source = (new XMLSerializer()).serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');

          // Quick 'n' shitty hacks to remove stuff that prevents AI from opening SVG
          source = source.replace(/\sfont-.*?: .*?;/gi, '');
          source = source.replace(/\sclip-.*?="url\(http:\/\/localhost:9000\/.*?\)"/gi, '');
          source = source.replace(/\stransform="scale\(2\)"/gi, '');
          // not needed but good so it validates
          source = source.replace(/<defs xmlns="http:\/\/www.w3.org\/1999\/xhtml">/gi, '<defs>');

          return {svg: svg, source: [doctype + source]};
        }
      };
    });
})();
