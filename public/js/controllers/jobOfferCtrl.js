function myJobOfferListCtrl($scope, $location, myJobs) {
	$scope.data = {};
	
	$scope.init = function(){
		myJobs.query(function(res){
			$scope.data.items = res;
			});
		};
    
    $scope.save = function() {
    	var newJob = new myJobs($scope.job);
    	newJob.$save(function(err) {
    		if(err)
    			console.log('Impossible to create new job');
    		else {
    			console.log('Ready to redirect');
    			$location.path('/offers');
    		}
    	});    	
    };    
}

function jobOfferListCtrl($scope, Jobs)  {
	$scope.data = {};
	Jobs.query(function(res){
		$scope.data.items = res;
	});
}