angular.module('citizen-engagement.issues', ['angular-storage'])

.factory('issueService', ['issueService', 
	function($http){
		function getIssues (){
			$http.get(apiUrl + 'users').sucess().error();			
		}

		function addIssue (){
			$http.post(apiUrl + 'users').sucess().error();
		}
}]);
