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
	   .when('/application', {
		   controller: 'myJobOfferListCtrl',
		   templateUrl: '/application'
	   })
	   .otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true);
}]);

/*
 * Services
 */
myApp.factory('Api',['$resource', function($resource) {
	return {
		myJobs : $resource('/api/myJobs/:jobId',
						{ jobId: '@jobId' },
						{
							get:{
								method: 'GET',
								isArray: false},
							create: { method: 'POST' },
							remove: { method: 'DELETE' }
				     }),
	    Jobs : $resource('/api/jobs',
					{},
					{
						query:{
							method: 'GET',
							isArray: true}
					}),
		Application : $resource('/api/myApplications/:applicationId',
				{ applicationId: '@applicationId' },
				{
					get:{
						method: 'GET', 
						isArray: false
					},
					create: {
				    	method: 'POST'
				    },
				    remove: {
				    	method: 'DELETE'
				    }
				}),
		Profile : $resource('/api/profile',
				{},
				{
					query:{
						method: 'GET',
						isArray: false}
				}),
		CountJob:$resource('/api/count',
				{},
				{
					getCount:{
						method: 'GET',
						isArray: false}
				}),
		LastSevenJobs : $resource('/api/lastSevenJobs',
				{},
				{
					query:{
						method: 'GET',
						isArray: true}
				}),
		'tempJobApplied' : {}
	};
}]);


/*
 * Directive Datepicker
 */
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