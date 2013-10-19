function backlogCtrl($scope, $log, $location, $window, $element, $route,  logEntries) {
		function togglePanel(value){
			$element.find('.backlogPanel').slideToggle('fast');
			$element.find('#actionButton').text(value);
		};
	    
	    $scope.data = {};
	    
	    $scope.styles = [{'bkcolor': '#D61828', 'color': 'white'},
	                     {'bkcolor': '#B018D6', 'color': 'white'},
	                     {'bkcolor': '#D6CE18', 'color': 'white'},
	                     {'bkcolor': '#36D618', 'color': 'white'}
	                     ];
		
		$scope.init = function(){
			logEntries.query(function(res){
				$scope.data.entries = res;
			});
		};
	    
	    function create() {
	    	togglePanel(function(){
	    	   var newEntry = new logEntries($scope.entry);
	    	   newEntry.$create(function(entry) {
	    		   if(!entry)
	    			   $log.log('Impossible to create new backlog entry');
	    		   else {
	    			   $window.location.href = '/home';
	    		   }
	    	   }); 
	    	});
	    };
	    
	    function update(entry) {
	    	togglePanel(function(){
	    	   var id = entry._id;
	    	   entry.$update({Id: id},function(entry) {
     	           if(!entry)
	    			   $log.log('Impossible to update bakclog entry');
	    		   else {
    	    			$window.location.href = '/home';
	         		}
	        	});    	
	    	});
	    };
	    
	    $scope.action = function(){
	    	var text = $element.find('#actionButton').text();
	    	if(text == 'Create')
	    		create();
	    	else
	    		update($scope.entry);
	    };
	    
	    
	    $scope.cancel = function() {
	    	togglePanel(function(){
	    	   $location.path('/home');
	    	});
	    };
	    
	    $scope.remove = function(entry) {
	    	var id = entry._id;
	    	entry.$remove({Id: id}, function(){
	    		$window.location.href = '/home';
	    	});
	    };
	    
	    $scope.edit = function(entry) {
	    	$scope.entry = entry;
	    	togglePanel('Update');
	    };
	    
	    $scope.showPanel = function() {
	    	togglePanel('Create');
	    };
}