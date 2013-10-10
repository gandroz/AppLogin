//Articles service used for REST
angular.module('jobApp').factory("Jobs", ['$resource', function($resource) {
    return $resource('/jobs/:title', 
    		{ title: '@title' }, 
    		{
    			"update": { method: 'PUT' }
    		}
    );
}]);