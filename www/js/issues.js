angular.module('citizen-engagement.issues', [])

.controller('IssueController', function(IssueService, $log, $http, $scope, apiUrl){

	// GET issues
	IssueService.getIssues(
		function(data){
			$scope.issues = data;
		}, 
		function(error){
			$log(error);
		}
	);

	function getDetails(){
		
	}

})

.controller('NewIssueController', function(IssueService, $log, $http, $scope, apiUrl){
		
	// GET issuetypes
	IssueService.getIssueTypes(
		function(data){
			$scope.issuetypes = data;
			$log.debug(data);
		},
		function(error){
			$log.debug(error);
		}
	);

	function addIssue (issueToAdd){
		//IssueService.addIssue(issueToAdd);
		$log.debug('click');
	}

})

.controller('IssueDetailsController', function(IssueService, $log, $http, $scope, apiUrl){
	/*function getDetails (id){
		$http({
			method: 'GET',
			url: apiUrl + '/issues/:id',
			params: {id: id}
		}).success(function(data, status, headers, config){
			$scope.details = data;
			//$log.debug(data);
		}).error(function(data, status, headers, config){
			$scope.error = data;
			//$log.debug('error');
		});
	}*/

	IssueService.getIssueDetails(
		function(data){
			$scope.issueDetails = data;
			$log.debug(data);
		},
		function(error){
			$scope.error = error;
			$log.debug('error');
		});
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
		getIssueDetails : function(issue, callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/:id',
				params: {id: issue.id}
			}).success(function(data, status, headers, config){
				// todo
			}).error(function(data, status, headers, config){
				// todo
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
				$log.debug(status);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});			
		}
	}
});
