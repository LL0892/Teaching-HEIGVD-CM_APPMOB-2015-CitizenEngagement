angular.module('citizen-engagement.issues', [])


// Controller Issue List Page
.controller('IssueController', function(IssueService, $log, $http, $scope, apiUrl){

	// GET issues
	IssueService.getIssues(
		function(data){
			$scope.issues = data;
		}, 
		function(error){
			$scope.error = error;
		}
	);

})

// Controller New Issue Page
.controller('NewIssueController', function(IssueService, $log, $http, $scope, apiUrl){
		
	// GET issuetypes
	IssueService.getIssueTypes(
		function(data){
			$scope.issuetypes = data;
			$log.debug(data);
		},
		function(error){
			$scope.error = error;
		}
	);

	function addIssue (issueToAdd){
		//IssueService.addIssue(issueToAdd);
		$log.debug('click');
	}

})

// Controller Detail Issue Page
.controller('IssueDetailsController', function(IssueService, $log, $scope, $stateParams){
	//$log.debug($stateParams);

	IssueService.getDetails(
		$stateParams.issueId,
		function(data){
			$scope.issue = data;
			$scope.commentsCpt = data.comments.length;
		},
		function(error){
			$scope.error = error;
			$log.debug(error);
		}
	);
})


// Controller Comments Page
.controller('CommentsController', function(IssueService, $log, $scope, $stateParams){

	IssueService.getComments($stateParams.issueId,
		function(data){
			$scope.comments = data;
			$log.debug(data);
		},
		function(error){
			$scope.error = error;
		}
	);

})







.factory('IssueService', function($http, apiUrl, $log){
	return {

		// ********
		// ISSUES
		// ********

		// Get a list of comment for this issue
		getComments : function(issueId, callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/' + issueId,
			}).success(function(data, status, headers, config){
				callback(data.comments);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});
		},

		// Get a list of issues.
		getIssues : function (callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});		
		},

		// Create a new issue.
		addIssue : function (callback, errorCallback){
			$http({
				method: 'POST',
				url: apiUrl + '/issues',
				data: issue
			}).success(function(data, status, headers, config){
				callback(data);		
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});
		},

		// Retrieve the details of a specific issue.
		getDetails : function(issueId, callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/' + issueId,
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});
		},

		// Perform MongoDB queries directly by given the query through the JSON payload. 
		//Refers to the MongoDB query. Queries are limited to the issues only.
		searchIssues : function(callback, errorCallback){

		},

		// Perform an action on the issue. (available for users)
		// 2 types of action : comments, tags
		actionIssue : function(callback, errorCallback){

		},

		// ************
		// ISSUE TYPES
		// ************

		// Retrieve the list of issue types.
		getIssueTypes : function(callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issueTypes'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});
		},

		// Retrieve the details of a specific issue type.
		getIssueTypeDetails : function(){
			$http({
				method: 'GET',
				url: apiUrl + '/issueTypes/:id'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});			
		}
	}
});
