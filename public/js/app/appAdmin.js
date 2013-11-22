'use strict';
var app = angular.module('appAdmin', ['ngResource', 'ngGrid', 'ui.bootstrap']);

/*
 * Config
 */
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
	   .when('/admin/Jobs', {
		   controller: 'adminCtrl',
		   templateUrl: '/admin/jobs',
		   reloadOnSearch: false
	   })
	   .when('/admin', {
		   controller: 'adminCtrl',
		   templateUrl: '/admin/jobs'
	   })
	   .when('/admin/Applications', {
		   controller: 'adminCtrl',
		   templateUrl: '/admin/applications',
		   reloadOnSearch: false
	   })
	   .when('/admin/Users', {
		   controller: 'adminCtrl',
		   templateUrl: '/admin/users',
		   reloadOnSearch: false
	   })
	   .when('/admin/Profiles', {
		   controller: 'adminCtrl',
		   templateUrl: '/admin/profiles',
		   reloadOnSearch: false
	   })
	   .otherwise({redirectTo: '/admin/jobs'});
	$locationProvider.html5Mode(true);
}]);

/*
 * Services
 */
app.factory('Api',['$resource', function($resource) {
	return {
	    Jobs : $resource('/api/admin/jobs/:jobId',
	    	    	{ jobId: '@jobId' },
					{
						query:{
							method: 'GET',
							isArray: true}
					}),
		Applications : $resource('/api/admin/applications/:applicationId',
				{ applicationId: '@applicationId' },
				{
				    remove: {
				    	method: 'DELETE'
				    },
				    query:{
						method: 'GET',
						isArray: true
					}
				}),
		Profiles : $resource('/api/admin/profiles/:profileId',
				{ profileId: '@profileId' },
				{
					remove: {
				    	method: 'DELETE'
				    },
					query:{
						method: 'GET',
						isArray: true}
				}),
		Users : $resource('/api/admin/users/:userId',
				{ userId: '@userId' },
				{
					remove: {
				    	method: 'DELETE'
				    },
					query:{
						method: 'GET',
						isArray: true}
				})
	};
}]);