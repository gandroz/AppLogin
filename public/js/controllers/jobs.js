angular.module('jobApp').controller('JobsController', ['$scope', '$routeParams', '$location', 'Jobs', function ($scope, $routeParams, $location, Jobs) {
	
	$scope.find = function() {
    	Jobs.query({}, function(jobs) {
            $scope.jobs = jobs;
        });
    };

    $scope.findOne = function() {
    	Jobs.get({},{ title: $routeParams.title }, function(job) {
            $scope.job = job;
        });
    };
    
    $scope.create = function() {
        var job = new Jobs({
            title: this.title,
            content: this.content
        });
        job.$save(function(response) {
            $location.path("articles/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(article) {
    	job.$remove();  

        for (var i in $scope.jobs) {
            if ($scope.articles[i] == job) {
                $scope.articles.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var job = $scope.job;
        if (!job.updated) {
        	job.updated = [];
        }
        job.updated.push(new Date().getTime());

        job.$update(function() {
            $location.path('jobs/' + job._id);
        });
    };

    
}]);