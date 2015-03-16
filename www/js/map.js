var myapp = angular.module('citizen-engagement.map', ['geolocation']);

myapp.controller('MapController', function($scope, mapboxMapId, mapboxAccessToken, geolocation){
	
	var mapboxTileLayer = "http://api.tiles.mapbox.com/v4/" + mapboxMapId;
	mapboxTileLayer = mapboxTileLayer + "/{z}/{x}/{y}.png?access_token=" + mapboxAccessToken;
	
	$scope.mapDefaults = {
		tileLayer: mapboxTileLayer
	};

	$scope.mapCenter = {
		lat: 51.48,
		lng: 0,
		zoom: 14
	};

	geolocation.getLocation().then(function(data) {
		$scope.mapCenter.lat = data.coords.latitude;
		$scope.mapCenter.lng = data.coords.longitude;
		}, 
		function(error) {
			$log.error("Could not get location: " + error);
		}
	);

	$scope.mapMarkers = [];

	//var issue = IssueService.getIssue();

/*	$scope.mapMarkers.push({
		lat: issue.lat,
		lng: issue.lng,
		message: '<p>{{ issue.description }}</p><img src="{{ issue.imageUrl }}" width="200px" />',
		getMessageScope: function() {
			var scope = $scope.$new();
			scope.issue = issue;
			return scope;
		}
	});*/
});
