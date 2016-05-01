(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .directive('exportChart', exportChartDirective);

  /** @ngInject */
  function exportChartDirective(ExportService) {
    return {
      restrict: 'A',
      priority: 1,
      controller: function ($scope) {
        $scope.config = {
          exportedFileName: "c3 chart"
        };
      },
      link: {
        post: function postLink(scope, element, attrs) {

          var linkEl = angular.element('<div class="exporter"><a class="savePNG"><i class="fa fa-download"></i></a></div>');

          if (attrs.exportedFileName) {
            scope.config.exportedFileName = attrs.exportedFileName;
          }

          if(attrs.backgroundColor){
            scope.config.backgroundColor = attrs.backgroundColor;
          }

          element.prepend(linkEl);

          linkEl.on('click', function () {
            ExportService.createChartImages(element, scope.config);
          });
        }
      }
    };
  }

})();

