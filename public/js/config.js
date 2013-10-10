//Setting up route
angular.module('jobApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
   $routeProvider.
      /*when('/jobs', {
         templateUrl: 'partials/list'
      }).*/
      when('/jobAngular', {
          templateUrl: 'partials/list'
       }).
      when('/jobAngular/viewjob/:title', {
         templateUrl: 'partials/view'
      }).
      otherwise({
         redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
}]);