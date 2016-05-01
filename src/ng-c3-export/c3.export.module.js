(function () {

  angular.module('ngC3Export.config', [])
    .value('ngC3Export.config', {
      debug: true
    });

  angular.module('ngC3Export',
    [
      'ngC3Export.config'
    ]);

})(angular);
