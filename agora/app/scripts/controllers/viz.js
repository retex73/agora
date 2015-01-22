'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:VizCtrl
 * @description
 * # VizCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp').controller('VizCtrl', function($scope, $routeParams) {
	console.log($routeParams);


	$scope.url = pagesObj.reportsBaseUrl;

	console.log($scope.url + $routeParams.id + "/" + $routeParams.report);



	renderViz(); 

	// activateEventListeners(); 
	

});