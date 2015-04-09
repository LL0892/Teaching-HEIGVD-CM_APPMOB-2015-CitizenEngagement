angular.module('citizen-engagement.issues', [])


// Controller Issue List Page
.controller('IssueController', function(IssueService, $log, $http, $scope, apiUrl){

	//var pageCpt = 0;

	// GET issues
	$scope.currentPage = 0;
	IssueService.getIssues(
		$scope.currentPage,
		function(data){
			$scope.issues = data;
			$scope.currentPage++;
			//$log.debug(data);
		}, 
		function(error){
			$scope.error = error;
		}
	);

	$scope.loadMoreIssues = function(){
		IssueService.getIssues(
			$scope.currentPage,
			function(data){
				Array.prototype.push.apply($scope.issues, data);
				$scope.currentPage++;
			},
			function(error){
				$scope.error = error;
			}
		);
	}
})

// Controller New Issue Page
.controller('NewIssueController', function(IssueService, CameraService, $log, $http, $scope, apiUrl, qimgUrl, qimgToken, geolocation, $state){
	
	
	$scope.expandText = function(){
	var element = document.getElementById("extensibleTextarea");
	element.style.height =  element.scrollHeight + "px";
	}

	$scope.issueToAdd = {};
	$scope.placeholderUrl = '../img/placeholder.png';

    geolocation.getLocation().then(function (data) {
        $scope.issueToAdd.lat = data.coords.latitude;
        $scope.issueToAdd.lng = data.coords.longitude;
    }, function (error) {
        $log.error("Could not get location: " + error);
    });

	// GET issuetypes
	IssueService.getIssueTypes(
		function(data){
			$scope.issuetypes = data;
			//$log.debug(data);
		},
		function(error){
			$scope.error = error;
		}
	);

	$scope.addIssue = function (issueToAdd){

		// Change imageUrl with a placeholder if undefined
		if(issueToAdd.imageUrl === undefined){
			issueToAdd.imageUrl = 'http://puu.sh/h5Xe2/3815e93f0a.png';
		}

		$log.debug('desc : ' + issueToAdd.description);
		$log.debug('type : ' + issueToAdd.issueTypeId);
		$log.debug('lat : ' + issueToAdd.lat);
		$log.debug('lng : ' + issueToAdd.lng);
		$log.debug('img : ' + issueToAdd.imageUrl);
		
		IssueService.addIssue(issueToAdd, 
		function(data){
			$state.go('tab.newIssueDetails', {issueId: data.id});
		},
		function(error){
			alert.error('An error occured : '+ error);
		});
	}

	$scope.takeIssuePhoto = function(){
	    takePhoto().then(uploadPhoto).then(function (data) {
	    	//alert('image successfully uploaded !');
	      $scope.issueToAdd.imageUrl = data.data.url;
	    }, function(error) {
			alert(error);
	    });
	}

	function takePhoto(){
		return CameraService.getPicture({
			quality: 75,
			targetWidth: 400,
			targetHeight: 300,
			// return base64-encoded data instead of a file
			destinationType: Camera.DestinationType.DATA_URL
		});
	}

	function uploadPhoto(imageData){
		var result = $http({
			method: "POST",
			url: qimgUrl + "/images",
			headers: {
				Authorization: "Bearer " + qimgToken
			},
			data: {
				data: imageData
			}
		});

		return result;
	}
})

// Controller Detail Issue Page
.controller('IssueDetailsController', function(IssueService, $log, $scope, $stateParams){
	//$log.debug($stateParams);
	$scope.commentsCpt = 0;

	IssueService.getDetails(
		$stateParams.issueId,
		function(data){
			$scope.issue = data;
			$scope.commentsCpt = data.comments.length;
			$scope.tags = data.tags;
			//$log.debug($scope.tags);
		},
		function(error){
			$scope.error = error;
			//$log.debug(error);
		}
	);


})


// Controller Comments Page
.controller('CommentsController', function(IssueService, $ionicScrollDelegate, $log, $scope, $stateParams){

	$scope.expandText = function(){
	var element = document.getElementById("extensibleTextarea");
	element.style.height =  element.scrollHeight + "px";
	}
	
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
				$scope.comment.text = '';
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

// NOT USED
/*.controller("CameraController", function(CameraService, $http, qimgUrl, qimgToken) {
	// take the picture
	CameraService.getPicture({
		quality: 75,
		targetWidth: 400,
		targetHeight: 300,
		// return base64-encoded data instead of a file
		destinationType: Camera.DestinationType.DATA_URL
	}).then(function(imageData) {
		// upload the image
		$http({
			method: "POST",
			url: qimgUrl + "/images",
			headers: {
				Authorization: "Bearer " + qimgToken
			},
			data: {
				data: imageData
			}
		}).success(function(data) {
			var imageUrl = data.url;
			// do something with imageUrl
		});
	});
})*/

.factory("CameraService", function($q) {
	return {
		getPicture: function(options) {
			var deferred = $q.defer();
			navigator.camera.getPicture(
				function(result) {
					// do any magic you need
					deferred.resolve(result);
				}, 
				function(err) {
					deferred.reject(err);
				}, 
				options
			);
			return deferred.promise;
		}
	}
})

.factory('IssueService', function($http, apiUrl, $log){
	return {

		// ********
		// ISSUES
		// ********

		// Get a list of issues with pagination.
		getIssues : function (page, callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issues/',
				headers: {
					'Content-Type': 'application/json',
					'x-pagination': page + ';25',
					'x-sort': '-createdOn'
				}
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
		getIssueTypeDetails : function(callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/issueTypes/:id'
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});			
		},

		// ***********
		// My issues
		// ***********
		getMyIssues : function(page, callback, errorCallback){
			$http({
				method: 'GET',
				url: apiUrl + '/me/issues',
				headers: {
					'Content-Type': 'application/json',
					'x-pagination': page + ';25'
				}
			}).success(function(data, status, headers, config){
				callback(data);
			}).error(function(data, status, headers, config){
				errorCallback(data);
			});
		}
	}
});