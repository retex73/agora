'use strict';

/**
 * @ngdoc controller
 * @name ng.controller:VizCtrl
 * @requires $scope
 * @requires $routeParams
 * @description
 * Contains methods to handle the viz page
 */
angular.module('agoraApp').controller('VizCtrl', function($scope, $routeParams) {

	

	$scope.breadCrumbs = $routeParams;

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#onBack
 * @methodOf ng.controller:VizCtrl
 * @description
 * Invokes the viz history back button
 <pre>
  	<button id="undo" ng-click="onBack();" ... </button>
 </pre>
 */	
	$scope.onBack = function() {
		agora.vizfuncs.onBack();
	};

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#getInfoLink
 * @methodOf ng.controller:VizCtrl
 * @description
 * Opens a new page showing the appropriate help pages
 * at a fixed size of h:600px x w:1100
 * @param {object} object click event
 * @param {string} string Help url
 <pre>
  	<span ng-click="getInfoLink($event, help);" ... </span>
 </pre>
 */	
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
/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#refreshScopeVars
 * @methodOf ng.controller:VizCtrl
 * @description
 * Updates viz titles and attributes 
 <pre>
  	Object.observe(agora.vizfuncs, function(changes) {
		refreshScopeVars();
		... 
	});
 </pre>
 */	
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

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#downloadData
 * @methodOf ng.controller:VizCtrl
 * @description
 * Invokes the tableau api to show the download data dialogue box
 * @param {object} object click event
 <pre>
  	<a id="downloadData" ng-click="downloadData($event);" ... </a>
 </pre>
 */	
	$scope.downloadData = function($event) {
		$event.preventDefault();
		agora.vizfuncs.showExportDataDialog();
	};
/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#downloadImage
 * @methodOf ng.controller:VizCtrl
 * @description
 * Invokes the tableau api to show the download image dialogue box
 * @param {object} object click event
 <pre>
  	<a id="downloadImage" ng-click="downloadImage($event);" href="#"> ... </a>
 </pre>
 */	
	$scope.downloadImage = function($event) {
		$event.preventDefault();
		agora.vizfuncs.showExportImageDialog();
	};
/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#downloadPdf
 * @methodOf ng.controller:VizCtrl
 * @description
 * Invokes the tableau api to show the download pdf dialogue box
 * @param {object} object click event
 <pre>
  	<a id="downloadPdf" ng-click="downloadPdf($event);" href="#">PDF</a>
 </pre>
 */	
	$scope.downloadPdf = function($event) {
		$event.preventDefault();
		agora.vizfuncs.showExportPDFDialog();
	};

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#shareData
 * @methodOf ng.controller:VizCtrl
 * @description
 * Saves a custom view on the Viz server, generates a url and displays to the user
 * @param {object} object click event
 <pre>
  	<button id="shareData" ng-click="shareData($event);" data-toggle="tooltip" data-placement="bottom" title="Share" class="btn btn-mini btn-default">
		<span data-toggle="modal" data-target="#myModal" class="glyphicon glyphicon-share"></span>
	</button>
 </pre>
 */	
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

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#fullScreen
 * @methodOf ng.controller:VizCtrl
 * @description
 * Causes the viz to occupy all of the browser window
 * @param {object} object click event
 <pre>
 <button id="fullScreen" ng-click="fullScreen($event);" data-toggle="tooltip" data-placement="bottom" title="View in fullscreen" class="btn btn-mini btn-default">
 <span class="glyphicon glyphicon-fullscreen"></span></button>
 </pre>
 */	
	$scope.fullScreen = function($event) {
		$event.preventDefault();
		$(".top").toggle();
		$(".breadcrumbs").toggleClass('move-up');
		$("#mainViz").toggleClass('mainViz-fullscreen');
		$("#fullScreen").toggleClass('fullScreenButtonActive');
		$(".navbar-bottom").toggle();
		agora.vizfuncs.resizeViz();
	};

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#revertAll
 * @methodOf ng.controller:VizCtrl
 * @description
 * Removes all of Tableau's filters and parameters
 * @param {object} object click event
 <pre>
	 <button id="revertAll" ng-click="revertAll($event);" data-toggle="tooltip" data-placement="bottom" title="Clear filters" class="btn btn-mini btn-default">
	 <span class="glyphicon glyphicon-refresh"></span>
	 </button>
 </pre>
 */	
	$scope.revertAll = function($event) {
		$event.preventDefault();
		agora.vizfuncs.revertAll();
	}


	/**
	 * Presents a hard coded link to Tablue with a credential. Tableau should then
	 * authenticate the user and return an auth code.
	 * The auth code should be appended to the reportsBaseUrl under pagesObj.reportsBaseUrl
	 */
/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#preAuth
 * @methodOf ng.controller:VizCtrl
 * @description
 * Provides an inelegant but working method to silently authorise the user to view a viz without 
 * invoking Tableau's login window allowing the user to move directly to the viz. 
 * The method first posts to Tableau to retrieve a token and then makes a further get call 
 * to Tableau to a random Viz with this token. Further calls to other viz's should now not need 
 * authentication. 
 
 <pre>
	 preAuth(); 
 </pre>
 */		
	var preAuth = function() {
		var url, 
		username, 
		custView; 
		switch(Mapper.env) {
			case "local": 
			url = 'http://tstagora.gmc-uk.org/trusted/'; 
			username = 'Svc_agoraint_tst'; 
			custView = 'TheRegister_pub/PRS1'; 
			break; 
			case "dev": 
			url = 'http://agoradev.gmc-uk.org/trusted/'; 
			username = 'Svc_agoraint_tst'; 
			custView = 'TheRegister_pub/PRS1'; 
			break; 
			case "test": 
			url = 'http://tstagora.gmc-uk.org/trusted/'; 
			username = 'Svc_agoraint_tst'; 
			custView = 'TheRegister_pub/PRS1'; 
			break; 
			case "prod": 
			url = 'http://agora.gmc-uk.org/trusted/'; 
			username = 'Svc_agoraint_prd'; 
			custView = 'TheRegister_prod/PRS1'; 
			break; 
		}



		// For local 
		// agora.vizfuncs.renderViz($routeParams, $scope);
		


		// for test and live
		$.post(url, {
				username: username
			})
			.done(function(data) {
				// console.log(data);

				var newUrl = url + data + '/views/' + custView;
				console.log(newUrl);
				$.get(newUrl, function(data) {					
					agora.vizfuncs.renderViz($routeParams, $scope);
				});
			});
	};

	preAuth();


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