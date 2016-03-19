var app = angular.module('c3ExportTest', [
  'ngC3Export'
]);

app.run(function () {
  console.log("ngC3Export module test initiated")
});

app.directive("dummyChart", function () {
  return {
    restrict: "A",
    link: function (scope, element,attrs) {
      var chart = c3.generate({
        bindto: element[0],
        data: {
          columns: [
            ['sample', 30, 200, 100, 400, 150, 250]
          ]
        },
        regions: [
          {start:0, end:1},
          {start:2, end:4, class:'foo'}
        ]
      });
    }
  };
});
