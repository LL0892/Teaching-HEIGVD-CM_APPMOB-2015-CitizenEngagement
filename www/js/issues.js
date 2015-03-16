angular.module('citizen-engagement.issues', ['angular-storage'])

.controller('IssueController', function(IssueService, $log, $http, $scope, apiUrl, AuthService){

		IssueService.getIssues(
			function(data){
				$scope.issues = data;
			}, 
			function(error){
				$log(error);
			}
		)


		addIssue = function (callback, errorCallback){
			$http({
				method: 'POST',
				url: apiUrl + '/issues/',
				data: issue
			}).success(function(data, status, headers, config){
				$scope.issue = data;
				$log.debug(status);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			})		
		};


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
				$log.debug(status);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});		
		},

		// Create a new issue.
		postIssue : function (callback, errorCallback){
			$http({
				method: 'POST',
				url: apiUrl + '/issues',
				data: issue
			}).success(function(data, status, headers, config){
				// todo			
			}).error(function(data, status, headers, config){
				// todo
			});
		},

		// Retrieve the details of a specific issue.
		getIssueDetail : function(callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/:id'
				//data: issueId
			}).success(function(data, status, headers, config){
				// todo
			}).error(function(data, status, headers, config){
				// todo
			});
		},

		// Perform MongoDB queries directly by given the query through the JSON payload. 
		//Refers to the MongoDB query. Queries are limited to the issues only.
		searchIssue : function(callback, errorCallback){

		},

		// Perform an action on the issue. (available for users)
		// 2 types of action : comments, tags
		actionIssue : function(callback, errorCallback){

		},

		// ************
		// ISSUE TYPES
		// ************

		// Retrieve the list of issue types.
		getIssueTypes : function(){
			$http({
				method: 'GET',
				url: apiUrl + '/issuetypes'
			}).success(function(data, status, headers, config){
				// todo
			}).error(function(data, status, headers, config){
				// todo
			});
		},

		// Retrieve the details of a specific issue type.
		getIssueTypeDetail : function(){
			$http({
				method: 'GET',
				url: apiUrl + '/issuetypes/:id'
			}).success(function(data, status, headers, config){
				// todo
			}).error(function(data, status, headers, config){
				// todo
			});			
		}
	}
});
