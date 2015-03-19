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
		IssueService.addIssue(issueToAdd);
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
			$scope.tags = data.tags;
			$log.debug($scope.tags);
		},
		function(error){
			$scope.error = error;
			$log.debug(error);
		}
	);
})


// Controller Comments Page
.controller('CommentsController', function(IssueService, $ionicScrollDelegate, $log, $scope, $stateParams){

	$scope.comment = {};

	IssueService.getComments($stateParams.issueId,
		function(data){
			$scope.comments = data;
			//$log.debug(data);
		},
		function(error){
			$scope.error = error;
		}
	);

	$scope.addComment = function(){
		IssueService.addComments(
			$stateParams.issueId,
			$scope.comment,
			function(data){
				$scope.comments = data.comments;
				//$scope.comments.push(data);
			},
			function(error){
				$scope.error = error;
			}
		);
	}

	$scope.scrollBottom = function(){
		$ionicScrollDelegate.scrollBottom();
	}
})







.factory('IssueService', function($http, apiUrl, $log){
	return {

		// ********
		// ISSUES
		// ********

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
		addIssue : function (issue, callback, errorCallback){
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

		// ***************
		// ISSUE COMMENTS
		// ***************

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

		// Add a new comment
		addComments : function(issueId, post, callback, errorCallback){
			$http({
				method: 'POST',
				url: apiUrl + '/issues/' + issueId + '/actions',
				data: {
						  "type": "comment",
						  "payload": {
						    "text": post.text
						}
				}
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});
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
