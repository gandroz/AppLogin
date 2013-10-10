'use strict';

var myApp = angular.module('appProfile', ['ngResource']);

myApp.factory('myJobs',['$resource', function($resource) {
	return $resource('/api/allMyPostedJobs',
			{},
			{
				query:{
					'method': 'GET', 
					'params': {}, 
					isArray: true},
			    save: {
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