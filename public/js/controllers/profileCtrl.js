function profileCtrl($scope, $log, $route, $window, Profile) {
	$scope.data = {};
	
	$scope.init = function(){
		Profile.query(function(res){
			$scope.data.profile = res;
			});
		};
	
	$scope.update = function() {
		var updatedProfile = $scope.data.profile;
		updatedProfile.$save(function(profile){
			if(!profile)
				$log.log('Error during profile update');
			else
				$route.reload();
		});
	};
}