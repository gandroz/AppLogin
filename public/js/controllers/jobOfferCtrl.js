function myJobOfferListCtrl($scope, $log, $location, $window, myJobs) {
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
    			$window.location.href = '/offers';
    		}
    	});    	
    };
    
    $scope.cancel = function() {
    	$window.location.href = '/offers';
    };
    
    $scope.remove = function(job) {
    	var id = job._id;
    	job.$remove({jobId: id}, function(){
    		$window.location.href = '/offers';
    	});
    };
}

function jobOfferListCtrl($scope, Jobs)  {
	$scope.data = {};
	Jobs.query(function(res){
		$scope.data.items = res;
	});
}