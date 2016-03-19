var app = angular.module('c3ExportTest', [
  'ngC3Export'
]);

app.run(function () {
  console.log("ngC3Export module test initiated");
});

app.controller("ChartController", function () {
  c3.generate({
    bindto: "#my-line-chart",
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

  c3.generate({
    bindto: "#my-combination-chart",
    data: {
      columns: [
        ['data1', 30, 20, 50, 40, 60, 50],
        ['data2', 200, 130, 90, 240, 130, 220],
        ['data3', 300, 200, 160, 400, 250, 250],
        ['data4', 200, 130, 90, 240, 130, 220],
        ['data5', 130, 120, 150, 140, 160, 150],
        ['data6', 90, 70, 20, 50, 60, 120],
      ],
      type: 'bar',
      types: {
        data3: 'spline',
        data4: 'line',
        data6: 'area',
      },
      groups: [
        ['data1','data2']
      ]
    }
  });
});
