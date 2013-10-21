'use strict';
/*
 * Définition du module d'application
 */
var myApp = angular.module('appProfile', ['ngResource', 'ui.bootstrap']);

/*
 * Config
 */
myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
	$routeProvider
	   .when('/profUpdate', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/profUpdate'
	   })
	   .when('/profile', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/dashboard'
	   })
	   .when('/dashboard', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/dashboard'
	   })
	   .when('/offers', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/offers'
	   })
	   .when('/jobs', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/jobs'
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
	return $resource('/api/myJobs/:jobId',
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
	return $resource('/api/jobs',
			{},
			{
				query:{
					method: 'GET', 
					params: {}, 
					isArray: true}
			});
}]);

myApp.factory('Profile',['$resource', function($resource) {
	return $resource('/api/profile',
			{},
			{
				query:{
					method: 'GET',
					isArray: false}
			});
}]);

myApp.factory('CountJob',['$resource', function($resource) {
	return $resource('/api/count',
			{},
			{
				getCount:{
					method: 'GET',
					isArray: false}
			});
}]);

myApp.factory('LastSevenJobs',['$resource', function($resource) {
	return $resource('/api/lastSevenJobs',
			{},
			{
				query:{
					method: 'GET',
					isArray: true}
			});
}]);

myApp.directive('datepicker', function() {
	  return {
		restrict: 'C',   
	    require: 'ngModel',
	    link: function(scope, el, attr, ngModelCtrl) {
	    	$(function(){
	    		el.datepicker({
	    			dateFormat:'dd MM yy',
	    			inline: true,
	    			onSelect: function(dateText, inst) {
	    				ngModelCtrl.$setViewValue(dateText);
	    				scope.$apply();
	    			}
	          });
	        });
	      }
	    };
	  });