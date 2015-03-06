'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:VizCtrl
 * @description
 * # VizCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp').controller('VizCtrl', function($scope, $routeParams) {

	// $scope.h1 = $routeParams.reportname;

	$scope.breadCrumbs = $routeParams;

	$scope.onBack = function() {
		agora.vizfuncs.onBack();
	};

	var refreshScopeVars = function() {
		$scope.$apply(function() {
			$scope.h1 = agora.vizfuncs.h1;
			$scope.h2 = agora.vizfuncs.h2;
			$scope.info = agora.vizfuncs.pages[0].description; 
			$scope.reportUrl = agora.vizfuncs.reportUrl;
			$scope.pages = agora.vizfuncs.pages;
			$scope.url = agora.vizfuncs.url;
		});
	};

	



	agora.vizfuncs.renderViz($routeParams, $scope);
	

	// agora.vizfuncs.addEventListeners();
	
	// agora.vizfuncs.getReportUrl($routeParams); 

	// Take initial snapshot of history
	setTimeout(function() {
		// agora.vizfuncs.recordHistory();
		 
		agora.vizfuncs.onChange();
	}, 5000);
	


	var setUndoButtonState = function() {
		// if (agora.vizfuncs.customViewName <= 1) {
		if (agora.vizfuncs.tabHistory.length <= 0) {			
			$("#undo").attr('disabled', 'disabled');
		} else {			
			$("#undo").removeAttr('disabled');
		}
	}; 


	setUndoButtonState(); 

	Object.observe(agora.vizfuncs, function(changes) {
		
		refreshScopeVars();
		setUndoButtonState(); 
	});
});

$(document).ready(function(){
	// Show the reports top tier nav
	$("#reports-tier").removeClass("reports-tier-hide");  
    $("#reports-tier ul").show(); 

}); 