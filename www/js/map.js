var myapp = angular.module('citizen-engagement.map', ['geolocation']);

myapp.controller('MapController', function($scope, mapboxMapId, mapboxAccessToken, geolocation, IssueService, $log, apiUrl, $state){
	
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
	var pageCpt = 0;

	// GET issues
	IssueService.getIssues(
		pageCpt,
		function(data){
			$scope.mapMarkers = data;
		}, 
		function(error){
			$log.debug(error);
		}
	);

	$scope.$on('leafletDirectiveMarker.click', function(e, args){
		$log.debug(args.leafletEvent.target.options.id);
		$state.go('tab.issueDetails', {issueId: args.leafletEvent.target.options.id});
	});

	function createMarkerScope(issue){
		return function(){
			var scope = $scope.$new();
			scope.issue = issue;
			return issue;
		}
	}

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
