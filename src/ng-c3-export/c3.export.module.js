(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('ngC3Export.config', [])
      .value('ngC3Export.config', {
          debug: true
      });

  // Modules
  angular.module('ngC3Export.directives', []);
  angular.module('ngC3Export.filters', []);
  angular.module('ngC3Export.services', []);
  angular.module('ngC3Export',
      [
          'ngC3Export.config',
          'ngC3Export.directives',
          'ngC3Export.filters',
          'ngC3Export.services'
      ]);

})(angular);
