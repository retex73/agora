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

	var slideNav = function() {

		var body = document.body,
			mask = document.createElement("div"),
			toggleSlideLeft = document.querySelector(".toggle-slide-left"),			
			activeNav;

		mask.className = "mask";

		/* hide active menu if mask is clicked */
		mask.addEventListener("click", function() {
			classie.remove(body, activeNav);
			activeNav = "";
			document.body.removeChild(mask);
		});

		/* hide active menu if close menu button is clicked */
		[].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el, i) {
			el.addEventListener("click", function() {
				classie.remove(body, activeNav);
				activeNav = "";
				document.body.removeChild(mask);
			});
		});

		$(document).ready(function() {
			$(".close-menu").on("click", function() {
				activeNav = "sml-open";
				classie.remove(body, activeNav);
				activeNav = "";
				// document.body.removeChild(mask);
				
				$(".mask").remove(); 
			});

			setTimeout(function() {
				$(".toggle-slide-left").on("click", function() {
					classie.add(body, "sml-open");
					document.body.appendChild(mask);
					activeNav = "sml-open";
				});

			}, 250);
		});
	};


	slideNav(); 

	$scope.onBack = function() {
		agora.vizfuncs.onBack();
	};

	var refreshScopeVars = function() {
		$scope.$apply(function() {
			$scope.h1 = agora.vizfuncs.h1;
			$scope.h2 = agora.vizfuncs.h2;
			$scope.reportUrl = agora.vizfuncs.reportUrl;
			$scope.pages = agora.vizfuncs.pages;
			$scope.url = agora.vizfuncs.url;
		});
	};




	var getReportUrl = function() {
		console.log('The get report url function is called'); 
		var group = $routeParams.report,
			cName = $routeParams.id;

		var result = $.grep(pagesObj.repGroup, function(e) {
			return e.groupName == cName;
		});

		if (typeof result[0] == "undefined") {
			// redirect to 404
			console.log('not found');
			return false;
		}

		$scope.pages = result;
		// console.log(result[0].pages[group][0].pageSubheading); 
		$scope.h1 = result[0].pages[group][0].pageHeading;
		$scope.h2 = result[0].pages[group][0].pageSubheading;

		$routeParams.reportname = $scope.h1;
		return pagesObj.reportsBaseUrl + result[0].pages[group][0].url;
	};



	// VizFuncs.setReportTitle('PRU1'); 

	// VizFuncs.renderViz(getReportUrl()); 

	agora.vizfuncs.renderViz($routeParams, $scope);
	agora.vizfuncs.addEventListeners();
	getReportUrl();

	setTimeout(function() {
		agora.vizfuncs.recordHistory();
	}, 5000);
	// VizFuncs.addEventListeners(); 


	Object.observe(agora.vizfuncs, function(changes) {
		console.log('changes');
		refreshScopeVars();

		if (agora.vizfuncs.customViewName <= 1) {
			console.log('add disabed');
			$("#undo").attr('disabled', 'disabled');
		} else {
			console.log('remove disabled')
			$("#undo").removeAttr('disabled');
		}
	});


});



/**
 * The nav stuff
 */
// (function( window ){

// 'use strict';



// })( window );