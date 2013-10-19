function myJobOfferListCtrl($scope, $log, $location, $window, $route,  myJobs, Jobs, CountJob, LastSevenJobs, Profile) {
	$scope.data = {};
	
	$scope.init = function(){
		myJobs.query(function(res){
			$scope.data.myJobs = res;
		});
		
		CountJob.getCount(function(res){
			$scope.count = res.count;
		});
		
		/*Jobs.query(function(res){
		   $scope.data.items = res;
	    });*/
		
		LastSevenJobs.query(function(res){
		   $scope.data.lastJobs = res;
	    });
		
		Profile.query(function(res){
			$scope.data.profile = res;
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
    
    $scope.updateProfile = function() {
		var updatedProfile = $scope.data.profile;
		updatedProfile.$save(function(profile){
			if(!profile)
				$log.log('Error during profile update');
			else
				$route.reload();
		});
	};
}