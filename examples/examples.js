var app = angular.module('c3ExportTest', [
  'ngC3Export'
]);

app.run(function () {
  console.log("ngC3Export module test initiated");
});

app.controller("SimplePieChartController", function () {

  var chart = c3.generate({
    bindto: "#simple-pie-chart",
    data: {
      type: 'pie',
      columns: [
        ['sampledata0', 10],
        ['sampledata1', 30],
        ['sampledata2', 20],
        ['sampledata3', 40],
        ['sampledata4', 120]
      ]
    }
  });

});

app.controller("DynamicPieChartController", function ($timeout) {

  var chart = c3.generate({
    bindto: "#my-pie-chart",
    data: {
      type: 'pie',
      columns: [
        ['sample', 30],
        ['sample2', 200]
      ]
    }
  });

  $timeout(function () {
    chart.load({
      columns:[
        ['sample', 30,10,12],
        ['sample2',10,12,31]
      ],
      type: 'bar'
    });
  },5000);

});

app.directive("dynamicChartExample", function() {
  return {
    scope: true,
    replace: true,
    template: '<div><h4>{{ chartTitle }}</h4><div id="chart-container"></div></div>',
    link: function (scope, element, attrs) {
      scope.chart = c3.generate({
        bindto: "#chart-container",
        padding: {

          bottom: 150
        },
        data: {
          json:[],
          keys: {
            x: 'title',
            value: ["price"]
          },
          type: 'bar'
        },
        axis: {
          rotated: false,         // horizontal bar chart
          x: {
            type: 'category',
            outer: true

          }
        },
        legend: {
          show: false
        }
      });
    },
    controller: function ($scope, MarvelService, $interval) {
      var dateDescriptors = MarvelService.dateDescriptors;

      $scope.chartTitle = MarvelService.getTitle();

      loadComics();

      var intervalPromise = $interval(function (i) {
        if(i == 15) {
          $interval.cancel(intervalPromise);
        }

        var currentDateDescriptorIndex = (i-1)% dateDescriptors.length;

        MarvelService.setCurrentDateDescriptor(dateDescriptors[currentDateDescriptorIndex]);

        $scope.chartTitle = MarvelService.getTitle();

        loadComics();
      },2500);

      $scope.$on("$destroy", function () {
        if(intervalPromise){
          $interval.cancel(intervalPromise);
        }
      });

      function loadComics(){
        MarvelService.getComics().then(function (comics) {
          $scope.chart.load({ data: comics});
        });
      }
    }
  };
});

app.directive("lineChartExample", function() {
  return {
    scope: true,
    replace: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {
      scope.chart = c3.generate({
        bindto: element[0],
        data: {
          columns: [
            ['sample', 30, 200, 12, 56, 123, 10, 11, 34, 245, 76]
          ]
        },
        regions: [
          {start: 0, end: 1},
          {start: 2, end: 4, class: 'foo'}
        ]
      });
    }
  };
});

app.directive("combinationChartExample", function() {
  return {
    scope: true,
    replace: true,
    template: '<div></div>',
    link: function (scope, element, attrs) {
      scope.chart = c3.generate({
        bindto: element[0],
        data: {
          columns: [
            ['data1', 30, 20, 50, 40, 60, 50],
            ['data2', 200, 130, 90, 240, 130, 220],
            ['data3', 300, 200, 160, 400, 250, 250],
            ['data4', 200, 130, 90, 240, 130, 220],
            ['data5', 130, 120, 150, 140, 160, 150],
            ['data6', 90, 70, 20, 50, 60, 120]
          ],
          type: 'bar',
          types: {
            data3: 'spline',
            data4: 'line',
            data6: 'area'
          },
          groups: [
            ['data1', 'data2']
          ]
        }
      });
    }
  };
});


app.factory("MarvelService", function ($http) {
  var dateDescriptors = ['thisWeek','lastWeek','thisMonth'];
  var topic = "Price of Marvel Comics";
  var currentDateDescriptor = dateDescriptors[0];

  var params = {
    orderBy:"title",
    limit:25,
    offset:0,
    noVariants: true,
    format: "comic"
  };


  return {
    params: params,
    dateDescriptors: dateDescriptors,
    getTitle: function () {
      return topic + " " + currentDateDescriptor.replace("this", "this ").replace("last", "last ");
    },
    setCurrentDateDescriptor: function (dsc) {
      currentDateDescriptor = dsc;
    },
    getComics: function () {
      return $http({
        type: "GET",
        url: "https://gateway.marvel.com/v1/public/comics?apikey=7dfa53fee28964c8c2c1b4cbe14ef610",
        params: generateParams()
      })
        .then(function (result) {
          var comics = result.data.data.results;

          var transformedComics = comics.map(function (comic) {
            var transformedComic = {
              title: comic.title
            };

            if (comic.prices.length == 1) {
              transformedComic.price = comic.prices[0].price;
            } else {
              transformedComic.price = 0;
            }

            return transformedComic;
          });

          return transformedComics;
        })

    }
  };

  function generateParams(){
    var newParams = angular.extend({
      dateDescriptor: currentDateDescriptor
    },params);
    return newParams;
  }
});
