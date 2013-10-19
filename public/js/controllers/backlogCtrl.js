function backlogCtrl($scope, $log, $location, $window, $route,  logEntries) {
		$scope.data = {};
		
		$scope.init = function(){
			logEntries.query(function(res){
				$scope.data.entries = res;
			});
		};
	    
	    $scope.create = function() {
	    	var newEntry = new logEntries($scope.entry);
	    	newEntry.$create(function(entry) {
	    		if(!entry)
	    			$log.log('Impossible to create new job');
	    		else {
	    			$window.location.href = '/home';
	    		}
	    	});    	
	    };
	    
	    $scope.cancel = function() {
	    	$location.path('/home');
	    };
	    
	    $scope.remove = function(entry) {
	    	var id = entry._id;
	    	entry.$remove({Id: id}, function(){
	    		$window.location.href = '/home';
	    	});
	    };
}