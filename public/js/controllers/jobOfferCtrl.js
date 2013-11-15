function myJobOfferListCtrl($scope, $log, $routeParams, $location, $window, $route, $modal, Api) {
	$scope.data = {};
	
	$scope.initMyApplications = function(){
		Api.myApplication.query(function(res){
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
	
	$scope.initOfferDetails = function(){
		var jobId = $routeParams.jobId;
		Api.myJobs.get({jobId: jobId}, function(res){
			$scope.data.job = res;
		});
		Api.Application.get({jobId: jobId}, function(res){
			$scope.data.applications = res;
		});
	};
	
	$scope.initDashboard = function(){
		$scope.filterOptions = {
		        filterText: "",
		        useExternalFilter: true
		    };
		
		$scope.totalServerItems = 0;
		    
		$scope.pagingOptions = {
				pageSizes: [1, 2, 10, 20, 50, 100],
				pageSize: 10,
				currentPage: 1
		};
		
	    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
	        //setTimeout(function () {
	            Api.Jobs.query({offset: (page - 1) * pageSize, limit: pageSize},function(res){
	            	$scope.myData = {};
	            	$scope.myData = res; 
	 			});
	        //}, 100);
	    };
		
	    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
		
	    $scope.$watch('pagingOptions', function (newVal, oldVal) {
	        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
	        	//s'assurer que la current page newVal est coherente avec le nombre max de pages possibles.
	          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
	        }
	    }, true);
	    
	    $scope.$watch('filterOptions', function (newVal, oldVal) {
	        if (newVal !== oldVal) {
	          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
	        }
	    }, true);
		
		$scope.gridOptions = {
		       data: 'myData',
			   jqueryUITheme: true,
			   enablePaging: true,
			   showFooter: true,
			   showFilter: true,
			   totalServerItems:'totalServerItems',
			   footerTemplate: 'gridFooterTemplate',
			   rowTemplate: 'gridRowTemplate',
			   pagingOptions: $scope.pagingOptions,
			   filterOptions: $scope.filterOptions,
			   columnDefs: [
			        {field:'title', displayName:'Offre', cellTemplate: 'gridCellTemplate'},
			        {field:'category', displayName:'Category', width: 200, cellTemplate: 'gridCellTemplate'},
			        {field:'postedDate', displayName:'Date', width: 200, cellFilter:"date:\'dd/MM/yyyy\'" }
			   ]
		};
				
		Api.LastSevenJobs.query(function(res){
		   $scope.data.lastJobs = res;
	    });
		
		/*Api.Jobs.query(function(res){
			   $scope.data.allJobs = res;}
		);*/
				
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
		   			$location.path('/dashboard');
		   		}
		   	});
		});		
	};	
}

var ModalInstanceCtrl = function ($scope, $modalInstance, Api) {

	$scope.application = new Api.myApplication();
	$scope.application.jobData = Api.tempJobApplied;
	Api.tempJobApplied = {};
	
	  $scope.submitApplication = function () {
	    $modalInstance.close($scope.application);
	  };

	  $scope.cancelApplication = function () {
	    $modalInstance.dismiss('cancel');
	  };
	};