'use strict';
/*
 * Définition du module d'application
 */
var myApp = angular.module('appProfile', ['ngResource']);

/*
 * Config
 */
myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
	   .when('/profile', {
		   templateUrl: '/profileUpdate'
	   })
	   .when('/offers', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/offers'
	   })
	   .when('/job', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/job'
	   })
	   .when('/submissions', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/submissions'
	   })
	   .otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}]);

/*
 * Services
 */
myApp.factory('myJobs',['$resource', function($resource) {
	return $resource('/api/allMyPostedJobs/:jobId',
			{ jobId: '@jobId' },
			{
				/*
				 * By default, angular adds this methods :
				 * { 'get':    {method:'GET'},
				 *   'save':   {method:'POST'},
				 *   'query':  {method:'GET', isArray:true},
				 *   'remove': {method:'DELETE'},
				 *   'delete': {method:'DELETE'} };
				 */
				/*query:{
					method: 'GET', 
					isArray: true},*/ //
				create: {
			    	method: 'POST'
			    },
			    remove: {
			    	method: 'DELETE'
			    }
			});
}]);

myApp.factory('Jobs',['$resource', function($resource) {
	return $resource('/api/allOffersAPI',
			{},
			{
				query:{
					'method': 'GET', 
					'params': {}, 
					isArray: true}
			});
}]);