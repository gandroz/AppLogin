function myJobOfferListCtrl($scope, $log, $location, $window, $route, $modal, Api) {
	$scope.data = {};
	
	$scope.initMyApplications = function(){
		Api.Application.query(function(res){
			$scope.data.myApplications = res;
			
		});
	};
	
	$scope.initMyOffers = function(){
		Api.myJobs.query(function(res){
			$scope.data.myJobs = res;
		});
	};
	
	$scope.initUpdateProfile = function(){
        Api.Profile.query(function(res){
			$scope.data.profile = res;
		});
	};
	
	$scope.initDashboard = function(){
		$scope.gridOptions = {
		       data: 'data.allJobs',
			   jqueryUITheme: true,
			   columnDefs: [
			        {field:'title', displayName:'Offre'},
			        {field:'category', displayName:'Category', width: 200},
			        {field:'postedDate', displayName:'Date', width: 200, cellFilter:"date:\'dd/MM/yyyy\'" }
			   ]
		};
	
		
		Api.LastSevenJobs.query(function(res){
		   $scope.data.lastJobs = res;
	    });
		
		Api.Jobs.query(function(res){
			   $scope.data.allJobs = res;}
		);
				
		Api.Profile.query(function(res){
			$scope.data.profile = res;
		});
	};
	
    $scope.create = function() {
    	var newJob = new Api.myJobs($scope.job);
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
	
	$scope.apply = function(job) {
		Api.tempJobApplied = job;
		
		var modalInstance = $modal.open({
		   templateUrl: 'newApplication',
		   controller: ModalInstanceCtrl,
		   resolve: {}
		});

		modalInstance.result.then(function (newapplication) {
		  	var application = new Api.Application(newapplication);
			application.$create(function(applik) {
		  		if(!applik)
		   			$log.log('Impossible to create new application');
		   		else {
		   			$location.path('/offers');
		   		}
		   	});
		});		
	};	
}

var ModalInstanceCtrl = function ($scope, $modalInstance, Api) {

	$scope.application = new Api.Application();
	$scope.application.jobData = Api.tempJobApplied;
	Api.tempJobApplied = {};
	
	  $scope.submitApplication = function () {
	    $modalInstance.close($scope.application);
	  };

	  $scope.cancelApplication = function () {
	    $modalInstance.dismiss('cancel');
	  };
	};