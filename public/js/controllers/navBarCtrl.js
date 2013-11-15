function navBarCtrl($scope, $location) 
{ 
    $scope.isActive = function (viewLocation) { 
    	var location = $location.absUrl();
    	return location.indexOf(viewLocation) !== -1 || (location.indexOf('profile') !== -1 && viewLocation.indexOf('dash') !== -1) || (location.indexOf('profile') !== -1 && viewLocation.indexOf('offerD') !== -1);
    };
    $scope.location = $location.absUrl();
}