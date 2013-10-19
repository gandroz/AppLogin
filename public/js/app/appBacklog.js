'use strict';
/*
 * Définition du module d'application
 */
var backlog = angular.module('appBacklog', ['ngResource']);

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
				remove: {
				    	method: 'DELETE'
				    }
			});
}]);
