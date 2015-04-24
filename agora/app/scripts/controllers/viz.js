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

		// window.open(help); // new tab
		window.open(help, help, "height=600,width=1100"); // new window

		return;

		// Dynamically set the height of the modal. Because the content is in an 
		// iframe we can't rely on it to automatically set its own height. 
		var height = $(window).height();
		height = height;
		// Get 80 percent of height
		var percentHeight = height * 0.65;

		$("#frame").css("height", percentHeight);
		// Set the content of the iframe to the correct help page.  				
		$("#frame").attr("src", help);
	};

	// Updates the viz info for h1 and h2 etc on change. 
	// This is dependent on the observer function within this script
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
		agora.vizfuncs.showExportDataDialog();
	};

	$scope.downloadImage = function($event) {
		$event.preventDefault();
		agora.vizfuncs.showExportImageDialog();
	};

	$scope.downloadPdf = function($event) {
		$event.preventDefault();
		agora.vizfuncs.showExportPDFDialog();
	};


	$scope.shareData = function($event) {
		$("#modal-url").val('Generating...');
		$(".label-info").text("Please wait...");
		$("#modal-url").prop("disabled", true);
		$("#spinner, #basic-addon1").show();

		setTimeout(function() {
			agora.vizfuncs.saveCustomView();
			$("#model-url").focus(function() {
				this.select();
			});
		}, 300);
		// agora.vizfuncs.saveCustomView(); 
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

	$scope.revertAll = function($event) {
		$event.preventDefault();
		agora.vizfuncs.revertAll();
	}



	var getAuthUrl = function() {		
		var url = 'http://localhost:9000/ajaxtest.json';

		var baseUrl = Mapper.getBaseUrl(); 

		
		$.get(url, function(data) {
			// $(".result").html(data);
			console.log(data.code); 
			baseUrl += data.code; 
			// pagesObj.reportsBaseUrl = baseUrl + data.code; 
			
			


			agora.vizfuncs.renderViz($routeParams, $scope);
		});
		// $.post(url, {
		// 		username: "agorapublic"		
		// 	})
		// 	.done(function(data) {
		// 		// Data should be the new url or token
		// 		// Append to the current url of agora.vizfuncs.url
		// 		alert("Data Loaded: " + data);
		// 	});
	};

	getAuthUrl(); 


	// agora.vizfuncs.renderViz($routeParams, $scope);

	// Take initial snapshot of history
	setTimeout(function() {
		// agora.vizfuncs.recordHistory();

		agora.vizfuncs.onChange();
	}, 5000);

	angular.element(document).ready(function() {
		$(function() {
			$('[data-toggle="tooltip"]').tooltip({
				container: 'body'
			})
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

	// Update the scope values when the viz changes e.g. tab changes updates h1 and h2 values
	// probably will need to implement a polyfill for older browsers here
	// see (https://github.com/jdarling/Object.observe/blob/master/Object.observe.poly.js)
	Object.observe(agora.vizfuncs, function(changes) {
		refreshScopeVars();
		setUndoButtonState();
	});
});


$(document).ready(function() {
	$("#basic-addon1").on('click', function() {
		console.log('clicked!');
	});
});


$(document.body).on('click', '#basic-addon1', function(e) {
	e.preventDefault();

	console.log('clicked!!!');

	$("#modal-url").focus();
});