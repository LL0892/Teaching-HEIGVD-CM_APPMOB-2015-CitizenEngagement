angular.module('citizen-engagement.comment', [])

.controller('CommentController', function(commentervice, $log, $http, $scope, apiUrl){

	// GET comment
	Commentervice.getComments(
		function(data){
			$scope.comment = data;
		}, 
		function(error){
			$log(error);
		}
	);

})

.factory('CommentService', function($http, apiUrl, $log){
	return {

		// ********
		// COMMENTS
		// ********

		// Get a list of comments.
		getComments : function (callback, errorCallback){
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
	}
	
});