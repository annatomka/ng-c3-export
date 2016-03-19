(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .directive('exportChart', exportChartDirective);

  /** @ngInject */
  function exportChartDirective(SvgFactory, StyleFactory) {
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
          var aElement = angular.element('<a class="savePNG"><i class="fa fa-download"></i></a>');

          if (attrs.exportedFileName) {
            scope.config.exportedFileName = attrs.exportedFileName;
          }
          element.append(aElement);

          var styles;

          var inlineAllStyles = function () {
            var chartStyle, selector;

            // Get rules from c3.css
            for (var i = 0; i <= document.styleSheets.length - 1; i++) {
              if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('c3.css') !== -1) {
                if (document.styleSheets[i].rules !== undefined) {
                  chartStyle = document.styleSheets[i].rules;
                } else {
                  chartStyle = document.styleSheets[i].cssRules;
                }
              }
            }

            if (chartStyle !== null && chartStyle !== undefined) {
              // SVG doesn't use CSS visibility and opacity is an attribute,
              // not a style property. Change hidden stuff to "display: none"
              var changeToDisplay = function () {
                var condition = angular.element(this).css('visibility') === 'hidden' ||
                  angular.element(this).css('opacity') === '0';
                if (condition) {
                  angular.element(this).css('display', 'none');
                }
              };

              // Inline apply all the CSS rules as inline
              for (i = 0; i < chartStyle.length; i++) {
                if (chartStyle[i].type === 1) {
                  selector = chartStyle[i].selectorText;
                  styles = StyleFactory.makeStyleObject(chartStyle[i]);
                  $element.find('svg *').each(changeToDisplay);
                  $(selector).not('.c3-chart path').css(styles);
                }

                /* C3 puts line colour as a style attribute, which gets overridden
                 by the global ".c3 path, .c3 line" in c3.css. The .not() above
                 prevents that, but now we need to set fill to "none" to prevent
                 weird beziers.
                 Which screws with pie charts and whatnot, ergo the is() callback.
                 */
                $element.find('.c3-chart path')
                  .filter(function () {
                    return $(this).css('fill') === 'none';
                  })
                  .attr('fill', 'none');

                $element.find('.c3-chart path')
                  .filter(function () {
                    return !$(this).css('fill') === 'none';
                  })
                  .attr('fill', function () {
                    return $(this).css('fill');
                  });
              }
            }
          };

          var createChartImages = function () {
            var chartEl = $(element);
            var svgEl = $(element.find('svg'));
            var canvasEl = angular.element('<canvas style="display: none;"></canvas>')[0];


            // Zoom! Enhance!
            svgEl.attr('transform', 'scale(2)');

            // Remove all defs, which botch PNG output
            element.find('defs').remove();

            // Copy CSS styles to Canvas
            inlineAllStyles();

            // Create PNG image
            //var canvas = angular.element('#canvas').empty()[0];
            canvasEl.width = chartEl.width() * 2;
            canvasEl.height = chartEl.height() * 2;

            element.append(canvasEl);

            var canvasContext = canvasEl.getContext('2d');

            var svg = $.trim(svgEl[0].outerHTML);
            canvasContext.drawSvg(svg, 0, 0);


            var filename = [];

            filename.push(scope.config.exportedFileName);

            filename = filename.join('-').replace(/[^\w\d]+/gi, '-');

            chartEl.find('.savePNG').attr('href', canvasEl.toDataURL('png'))
              .attr('download', function () {
                return filename + '.png';
              });

            var svgContent = SvgFactory.createSVGContent(svgEl[0], styles);

            $('.saveSVG').attr('href', 'data:text/svg,' + svgContent.source[0])
              .attr('download', function () {
                return filename + '.svg';
              });

            element.find('canvas').remove();
          };


          aElement.on('click', function () {
            createChartImages();
          });
        }
      }
    };
  }

})();

