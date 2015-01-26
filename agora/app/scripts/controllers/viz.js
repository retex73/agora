'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:VizCtrl
 * @description
 * # VizCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp').controller('VizCtrl', function($scope, $routeParams) {
	
	$scope.h1 = $routeParams.reportname; 

	var getReportUrl = function() {
		
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
        
        // console.log(result[0].pages[group][0].pageSubheading); 
        $scope.h2 = result[0].pages[group][0].pageSubheading; 
        return pagesObj.reportsBaseUrl + result[0].pages[group][0].url; 
	}; 

	var VizFuncs = {
		mainViz: '', 

		renderViz: function(url) {
			var mainVizDiv = $("#mainViz");
	    	var mainWorkbookUrl = url; 
		    var mainVizOptions = {
		        hideTabs: true,
		        hideToolbar: true,
		        //toolbarPositon: top  (or "bottom")
		        width: mainVizDiv.parent().innerWidth() + "px",
		        height: mainVizDiv.parent().innerHeight() + "px",
		        onFirstInteractive: function () {
		            mainWorkbook = mainViz.getWorkbook();
	        	}
	        }; 
	        //  Create viz
	    	mainViz = new tableauSoftware.Viz(mainVizDiv[0], mainWorkbookUrl, mainVizOptions);	    	 
		}, 

		addEventListeners: function() {
			mainViz.addEventListener("tabswitch", this._ventOnTabSwitch); 
		}, 

		_ventOnTabSwitch: function() {
			console.log('tab switched'); 
			
			var tabName = mainViz.getWorkbook().getActiveSheet().getName();
			$scope.h2 = tabName; 
		 	console.log(tabName); 
		}


	}



	VizFuncs.renderViz(getReportUrl()); 
	VizFuncs.addEventListeners(); 


	


});