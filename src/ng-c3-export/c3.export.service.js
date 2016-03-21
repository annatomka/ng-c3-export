(function () {
  'use strict';

  angular
    .module('ngC3Export')
    .factory('ExportService', function (StyleFactory) {
      return {
        createChartImages: createChartImages
      };

      function createChartImages (element,config) {
          var chartEl = $(element);
          var svgEl = $(element.find('svg')).first()[0];
          var svgCopyEl = angular.element(svgEl.outerHTML)[0];
          var canvasEl = angular.element('<canvas id="canvasOriginal"></canvas>')[0];
          var emptySvgEl = angular.element('<svg id="emptysvg" xmlns="http://www.w3.org/2000/svg" version="1.1" height="2" />')[0];
          var emptyCanvasEl = angular.element('<canvas id="canvasComputed"></canvas>')[0];

          $(svgCopyEl).find('defs').remove();

          canvasEl.width = chartEl.width();
          emptyCanvasEl.width = chartEl.width();
          canvasEl.height = chartEl.height();
          emptyCanvasEl.height = chartEl.height();

          var container = angular.element('<div style="display: none;"></div>');
          element.append(container);
          container.append(canvasEl);
          container.append(emptyCanvasEl);
          container.append(emptySvgEl);
          container.append(svgCopyEl);

          exportSvgToCanvas(svgCopyEl, canvasEl);

          var canvasComputed = StyleFactory.exportStyles(canvasEl, emptyCanvasEl, svgCopyEl, emptySvgEl);

          exportSvgToCanvas(svgCopyEl, canvasComputed);

          exportCanvasToPng(chartEl.find('.savePNG'), canvasComputed, config.exportedFileName);

          canvasEl.remove();
          emptyCanvasEl.remove();
          emptySvgEl.remove();
          svgCopyEl.remove();
        }

      function exportSvgToCanvas(svg, canvas) {
        canvg(canvas, new XMLSerializer().serializeToString(svg));
      }

      function exportCanvasToPng(linkEl,canvasEl, filename) {
        linkEl.attr('href', canvasEl.toDataURL('png'))
          .attr('download', function () {
            return filename + '.png';
          });
      }

      function exportCanvasToImage(canvasComputed) {
        Canvas2Image.saveAsPNG(canvasComputed);
      }
    });
})();
