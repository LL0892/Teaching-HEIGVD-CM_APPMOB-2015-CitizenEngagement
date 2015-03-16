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

		/*$scope.addIssue = function(){
			$http({
				method: 'POST',
				url: apiUrl + 'issues',
				data: $scope.issue
			}).success(function()
		}*/
})

.factory('IssueService', function($http, apiUrl, $log){
	return {
		getIssues : function (callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/',
			}).success(function(data, status, headers, config){
				callback(data);
				$log.debug(status);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});		
		}

	}
});
