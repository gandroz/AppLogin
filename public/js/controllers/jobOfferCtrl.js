function myJobOfferListCtrl($scope, $log, $location, $window, $route,  myJobs) {
	$scope.data = {};
	
	$scope.init = function(){
		myJobs.query(function(res){
			$scope.data.items = res;
			});
		};
    
    $scope.create = function() {
    	var newJob = new myJobs($scope.job);
    	newJob.$create(function(job) {
    		if(!job)
    			$log.log('Impossible to create new job');
    		else {
    			$location.path('/offers');
    		}
    	});    	
    };
    
    $scope.cancel = function() {
    	$location.path('/offers');
    };
    
    $scope.remove = function(job) {
    	var id = job._id;
    	job.$remove({jobId: id}, function(){
    		$route.reload();
    	});
    };
}

function jobOfferListCtrl($scope, Jobs)  {
	$scope.data = {};
	Jobs.query(function(res){
		$scope.data.items = res;
	});
}