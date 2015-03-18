'use strict';
var App = angular.module('App', [
    'ionic']);

/**
 * Routing table including associated controllers.
 */
App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('menu', {url: "/map", abstract: true, templateUrl: "menu.html"})
        .state('menu.home', {url: '/home', views: {'menuContent': {templateUrl: 'main.html', controller: 'MainCtrl'} }  })
        .state('menu.help', {url: '/help', views: {'menuContent': {templateUrl: 'helpView.html', controller: 'HelpCtrl'} }  });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/map/home');
}]);

/**
 * HEADER - handle menu toggle
 */
App.controller('HeaderCtrl', function($scope) {
    // Main app controller, empty for the example
    $scope.leftButtons = [
        { 
        type: 'button-clear',
        content: '<i class="icon ion-navicon"></i>',
        tap: function(e) {
            $scope.sideMenuController.toggleLeft();
            }
        }
    ];
});
/**
 * MAIN CONTROLLER - handle inapp browser
 */
App.controller('MainCtrl', ['$scope', function($scope) {
  // do something
}]);


/**
 * MAIN CONTROLLER - handle inapp browser
 */
App.controller('HelpCtrl', ['$scope', function($scope) {
  // do something
}]);




/**
 * Menu item click directive - intercept, hide menu and go to new location
 */
App.directive('clickMenulink', function() {
    return {
        link: function(scope, element, attrs) {
            element.on('click', function() {
              //Comment out for sticky menu
                scope.sideMenuController.toggleLeft();
            });
        }
    }
})


