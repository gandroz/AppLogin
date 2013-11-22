function adminCtrl($scope, $route, Api) {
	$scope.data = {};
	
	/*
	 * Load data
	 */
	
	$scope.initProfile = function() {
		Api.Profiles.query(function(res){
			$scope.data.profiles = res;
		});
	};
	
	$scope.initApplications = function(){
		Api.Applications.query(function(res){
			$scope.data.applications = res;
			
		});
	};
	
	$scope.initJobs = function(){
		Api.Jobs.query(function(res){
			$scope.data.jobs = res;
		});
	};
	
	$scope.initUsers = function(){
        Api.Users.query(function(res){
			$scope.data.users = res;
		});
	};
    
	/*
	 * Remove data
	 */
	
    $scope.removeProfile = function(profile) {
    	var id = profile._id;
    	profile.$remove({profileId: id}, function(){
    		$route.reload();
    	});
    };
    
    $scope.removeApplication = function(application) {
    	var id = application._id;
    	application.$remove({applicationId: id}, function(){
    		$route.reload();
    	});
    };
    
    $scope.removeJob = function(job) {
    	var id = job._id;
    	job.$remove({jobId: id}, function(){
    		$route.reload();
    	});
    };
    
    $scope.removeUser = function(user) {
    	var id = user._id;
    	user.$remove({userId: id}, function(){
    		$route.reload();
    	});
    };
}