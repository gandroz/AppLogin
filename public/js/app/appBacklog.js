'use strict';
/*
 * Définition du module d'application
 */
var backlog = angular.module('appBacklog', ['ngResource','ui.bootstrap']);

backlog.factory('logEntries',['$resource', function($resource) {
	return $resource('/api/backlog/:Id',
			{ Id: '@Id' },
			{
				query:{
					method: 'GET', 
					isArray: true
					},
				create: {
				    	method: 'POST'
				    },
				update: {
				    	method: 'POST'
				    },    
				remove: {
				    	method: 'DELETE'
				    }
			});
}]);
