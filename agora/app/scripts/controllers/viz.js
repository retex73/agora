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


	$scope.getInfoLink = function($event, help) {
		$event.preventDefault(); 
		
		var height = $(window).height(); 
		height = height;

		// Get 80 percent of height
		var percentHeight = height * 0.65;  

		$("#frame").css("height", percentHeight); 
		
		
		$("#frame").attr("src", help);
	}; 


	var refreshScopeVars = function() {
		$scope.$apply(function() {
			$scope.h1 = agora.vizfuncs.h1;
			$scope.h2 = agora.vizfuncs.h2;
			$scope.info = agora.vizfuncs.pages[0].description; 
			$scope.help = agora.vizfuncs.help; 
			$scope.reportUrl = agora.vizfuncs.reportUrl;
			$scope.pages = agora.vizfuncs.pages;
			$scope.url = agora.vizfuncs.url;
		});
	};

	
	$scope.downloadData = function($event) {
		$event.preventDefault(); 
		console.log('downloading data'); 
		agora.vizfuncs.showExportDataDialog();
	}; 

	$scope.downloadImage = function($event) {
		$event.preventDefault(); 
		console.log('download image'); 
		agora.vizfuncs.showExportImageDialog();
	}; 

	$scope.downloadPdf = function($event) {
		$event.preventDefault(); 
		console.log('Download pdf'); 
		agora.vizfuncs.showExportPDFDialog();
	}; 


	$scope.shareData = function($event) {
		console.log('showing modal'); 
		$("#modal-url").val(window.location.href); 
	}; 

	$scope.fullScreen = function($event) {
		$event.preventDefault(); 
		$(".top").toggle(); 
		$(".breadcrumbs").toggleClass('move-up'); 
		$("#mainViz").toggleClass('mainViz-fullscreen'); 
		$("#fullScreen").toggleClass('fullScreenButtonActive'); 
		$(".navbar-bottom").toggle(); 
		agora.vizfuncs.resizeViz();
	}; 

	$scope.revertAll = function($event){
		$event.preventDefault(); 
		agora.vizfuncs.revertAll();
	}



	agora.vizfuncs.renderViz($routeParams, $scope);
	

	// agora.vizfuncs.addEventListeners();
	
	// agora.vizfuncs.getReportUrl($routeParams); 

	// Take initial snapshot of history
	setTimeout(function() {
		// agora.vizfuncs.recordHistory();
		 
		agora.vizfuncs.onChange();
	}, 5000);
	

	angular.element(document).ready(function(){
		console.log('angular doc ready'); 
		$(function () {
			$('[data-toggle="tooltip"]').tooltip({container: 'body'})
		});

		$("#revertAll").on("click", function() {
			agora.vizfuncs.revertAll();
		});
		// Show the reports top tier nav
		$("#reports-tier").removeClass("reports-tier-hide");  
    	$("#reports-tier ul").show(); 
	}); 



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