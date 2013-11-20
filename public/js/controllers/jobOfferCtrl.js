function myJobOfferListCtrl($scope, $log, $routeParams, $location, $window, $route, $modal, Api) {
	$scope.data = {};
	$scope.loaded = false;
	
	$scope.initProfile = function() {
		Api.Profile.query(function(res){
			$scope.data.profile = res;
		});
	};
	
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
		var jobLoaded = false,
		    profileLoaded = false;
		
		//Spinner
		var opts = {
				  lines: 13, // The number of lines to draw
				  length: 20, // The length of each line
				  width: 10, // The line thickness
				  radius: 30, // The radius of the inner circle
				  corners: 1, // Corner roundness (0..1)
				  rotate: 0, // The rotation offset
				  direction: 1, // 1: clockwise, -1: counterclockwise
				  color: '#000', // #rgb or #rrggbb or array of colors
				  speed: 1, // Rounds per second
				  trail: 60, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  top: 'auto', // Top position relative to parent in px
				  left: 'auto' // Left position relative to parent in px
				};
		var target = document.getElementById('spinner');
		var spinner = new Spinner(opts).spin(target);
		
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
			   footerTemplate: '/profile/gridFooterTemplate',
			   rowTemplate: '/profile/gridRowTemplate',
			   pagingOptions: $scope.pagingOptions,
			   filterOptions: $scope.filterOptions,
			   columnDefs: [
			        {field:'title', displayName:'Offre', cellTemplate: '/profile/gridCellTemplate'},
			        {field:'category', displayName:'Category', width: 200, cellTemplate: '/profile/gridCellTemplate'},
			        {field:'postedDate', displayName:'Date', width: 200, cellFilter:"date:\'dd/MM/yyyy\'" }
			   ]
		};
				
		Api.LastSevenJobs.query(function(res){
		   $scope.data.lastJobs = res;
		   jobLoaded = true;
		   $scope.loaded = jobLoaded && profileLoaded;
		   if($scope.loaded) spinner.stop();
	    });
		
		Api.Profile.query(function(res){
			$scope.data.profile = res;
			profileLoaded = true;
			$scope.loaded = jobLoaded && profileLoaded;
			if($scope.loaded) spinner.stop();
		});
	};
	
    $scope.create = function() {
    	var newJob = new Api.myJobs($scope.job);
    	newJob.$create(function(job) {
    		if(!job)
    			$log.log('Impossible to create new job');
    		else {
    			$location.path('/profile/offers');
    		}
    	});    	
    };
    
    $scope.cancel = function() {
    	$location.path('/profile/offers');
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
		   			$location.path('/profile/dashboard');
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