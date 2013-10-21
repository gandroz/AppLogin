function backlogCtrl($scope, $log, $location, $window, $element, $route,  logEntries) {	
	    
	    $scope.data = {};
	    $scope.isCollapsed = {};
	    $scope.buttonText = 'Create';
	    
	    $scope.styles = [{'bkcolor': '#D61828', 'color': 'white'},
	                     {'bkcolor': '#B018D6', 'color': 'white'},
	                     {'bkcolor': '#D6CE18', 'color': 'white'},
	                     {'bkcolor': '#36D618', 'color': 'white'}
	                     ];
		
		$scope.init = function(){
			$scope.isCollapsed = true;
			logEntries.query(function(res){
				$scope.data.entries = res;
			});
		};
	    
	    function create() {
	    	$scope.isCollapsed = true;
	    	var newEntry = new logEntries($scope.entry);
	    	newEntry.$create(function(entry) {
	    	   if(!entry)
	    		   $log.log('Impossible to create new backlog entry');
	    	   else {
	    		   $window.location.href = '/home';
	    	   }
	    	});
	    };
	    
	    function update(entry) {
	    	$scope.isCollapsed = true;
	    	var id = entry._id;
	    	entry.$update({Id: id},function(entry) {
     	       if(!entry)
	    		   $log.log('Impossible to update bakclog entry');
	    	   else {
    	   			window.location.href = '/home';
	           }
	       	});    	
	    };
	    
	    $scope.action = function(){
	    	if($scope.buttonText == 'Create')	    		
	    		create();
	    	else
	    		update($scope.entry);
	    };
	    
	    
	    $scope.cancel = function() {
	    	$scope.isCollapsed = true;
	    	$location.path('/home');
	    };
	    
	    $scope.remove = function(entry) {
	    	var id = entry._id;
	    	entry.$remove({Id: id}, function(){
	    		$window.location.href = '/home';
	    	});
	    };
	    
	    $scope.edit = function(entry, e) {
	    	if(e){
	    		e.preventDefault(); //pour empecher que le content soit développé
	    		e.stopPropagation();
	    	}
	    	$scope.entry = entry;
	    	$scope.buttonText = 'Update';
	    	$scope.isCollapsed = false;
	    };
	    
	    $scope.showPanel = function() {
	    	$scope.entry = {};
	    	$scope.buttonText = 'Create';
	    	$scope.isCollapsed = false;
	    };
}