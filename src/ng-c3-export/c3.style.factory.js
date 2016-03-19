(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .factory('StyleFactory', function () {

      return {
        makeStyleObject: function (rule) {
          var styleDec = rule.style;
          var output = {};
          var s;

          for (s = 0; s < styleDec.length; s++) {
            output[styleDec[s]] = styleDec[styleDec[s]];
          }

          return output;
        }
      };
    });
})();
