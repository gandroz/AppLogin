function lastJobOffersCtrl($scope, $resource)  {
	   var Jobs = $resource('/api/lastSevenJobs');
       $scope.data = {};
	   Jobs.query(function(res){
		   $scope.data.items = res;
	   });
}