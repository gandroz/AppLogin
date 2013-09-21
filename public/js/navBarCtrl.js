function navBarCtrl($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
    	var location = $location.absUrl();
    	return location.indexOf(viewLocation) !== -1;
    };
    $scope.location = $location.absUrl();
}