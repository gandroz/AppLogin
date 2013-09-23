function jobOfferCtrl($scope, $resource)  {
	var Jobs = $resource('/api/alljobs');
	$scope.data = {};
	Jobs.query(function(res){
		$scope.data.items = res;
	});
}