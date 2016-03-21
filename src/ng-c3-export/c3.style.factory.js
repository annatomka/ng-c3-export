(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .factory('StyleFactory', function () {
      return {
        exportStyles: function (canvasOriginal, canvasComputed, svg, emptySvg) {
          var tree = [];
          var emptySvgDeclarationComputed = getComputedStyle(emptySvg);
          var allElements = traverse(svg, tree);
          var i = allElements.length;

          while (i--) {
            explicitlySetStyle(allElements[i],emptySvgDeclarationComputed);
          }

          return canvasComputed;
        }
      };

      function traverse(obj, tree) {
        tree.push(obj);
        if (obj.hasChildNodes()) {
          var child = obj.firstChild;
          while (child) {
            if (child.nodeType === 1 && child.nodeName != 'SCRIPT') {
              traverse(child, tree);
            }
            child = child.nextSibling;
          }
        }
        return tree;
      }

      function explicitlySetStyle(element, emptySvgDeclarationComputed) {
        var cSSStyleDeclarationComputed = getComputedStyle(element);
        var i, len, key, value;
        var computedStyleStr = "";
        for (i = 0, len = cSSStyleDeclarationComputed.length; i < len; i++) {
          key = cSSStyleDeclarationComputed[i];
          value = cSSStyleDeclarationComputed.getPropertyValue(key);
          if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
            if (key == 'visibility' && value == 'hidden') {
              computedStyleStr += 'display: none;';
            } else {
              computedStyleStr += key + ":" + value + ";";
            }
          }
        }
        element.setAttribute('style', computedStyleStr);
      }
    });
})();
