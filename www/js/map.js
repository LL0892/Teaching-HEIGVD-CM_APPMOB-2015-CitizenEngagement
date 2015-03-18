var myapp = angular.module('citizen-engagement.map', ['geolocation']);

myapp.controller('MapController', function($scope, mapboxMapId, mapboxAccessToken, geolocation, IssueService, $log){
	
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

	// GET issues
	IssueService.getIssues(
		function(data){
			$scope.mapMarkers = data;
		}, 
		function(error){
			$log(error);
		}
	);

	$scope.mapMarkers = [];

	// Push each marker on the map
	for (var i = $scope.mapMarkers.length - 1; i >= 0; i--) {
		$scope.mapMarkers[i].push({
			lat: issue.lat,
			lng: issue.lng
		})
	};

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
