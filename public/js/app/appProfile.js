'use strict';
/*
 * Définition du module d'application
 */
var myApp = angular.module('appProfile', ['ngResource']);

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