angular.module('citizen-engagement.issues', ['angular-storage'])

.controller('IssueController', function($http, $scope, apiUrl, AuthService){

		$scope.getIssues = function (){
			console.log('click');
			$http({
				method: 'GET',
				url: apiUrl + '/issues/',
				data: $scope.issues
			}).success(function(data, status, headers, config){
				$scope.issues = data;
			});		
		}
});