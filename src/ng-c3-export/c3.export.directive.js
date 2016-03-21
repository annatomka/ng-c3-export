(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .directive('exportChart', exportChartDirective);

  /** @ngInject */
  function exportChartDirective(StyleFactory, ExportService) {
    return {
      restrict: 'A',
      scope: {},
      controller: function ($scope) {
        $scope.config = {
          exportedFileName: "c3 chart"
        };
      },
      link: {
        post: function postLink(scope, element, attrs) {
          var $element = $(element);
          var linkEl = angular.element('<a class="savePNG"><i class="fa fa-download"></i></a>');

          if (attrs.exportedFileName) {
            scope.config.exportedFileName = attrs.exportedFileName;
          }

          if(attrs.backgroundColor){
            scope.config.backgroundColor = attrs.backgroundColor;
          }
          element.append(linkEl);

          linkEl.on('click', function () {
            ExportService.createChartImages(element, scope.config);
          });
        }
      }
    };
  }

})();

