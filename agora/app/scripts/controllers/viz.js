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
        
        $scope.pages = result; 
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

		setReportTitle: function(reportName) {

			getReportUrl(); 
        	var reports = []; 
        	$.each($scope.pages[0].pages, function(index, value) {
          		reports.push(value); 
        	}); 
        	
        	$.each(reports, function(index, value){
        		$.each(value, function(index, value){
        			if(value.pageId == reportName) { 
        			console.log('match of tab and model');
        				$scope.$apply(function(){
        					$scope.h1 = value.pageHeading; 
        					$scope.h2 = value.pageSubheading; 
        				}); 
        			}
        		}); 

        	}); 
        	
		}, 

		addEventListeners: function() {
			mainViz.addEventListener("tabswitch", this._ventOnTabSwitch); 
			mainViz.addEventListener("parametervaluechange", this._ventOnParameterChanged);
			mainViz.addEventListener("filterchange", this._ventOnFilterChanged);
		}, 

		_ventOnTabSwitch: function() {
			console.log('tab switched'); 
			
			var tabName = mainViz.getWorkbook().getActiveSheet().getName();
			$scope.h2 = tabName; 
		 	console.log(tabName); 
		 	VizFuncs.setReportTitle(tabName); 
		}, 

		_ventOnParameterChanged: function() {
			console.log('parameter changed'); 
			VizFuncs._getParametersAsync(); 
		}, 

		_ventOnFilterChanged: function() {
			console.log('filter changed'); 
			VizFuncs._getFiltersAsync(); 
		}, 

		_getParametersAsync: function() {
    		mainWorkbook = mainViz.getWorkbook();

    		var onSuccess = function (params) {
    			console.log(params); 
        		// alertOrConsole("This workbook contains " + params.length + " parameters");
    		};
		    var onError = function (err) {
		        // alertOrConsole("Whoops");
		        console.log('error!!!'); 
		    };

	    	mainWorkbook.getParametersAsync().then(onSuccess, onError);
		}, 




		_getFiltersAsync: function() {

			mainWorkbook = mainViz.getWorkbook();

		    var onSuccess = function (filters) {
		    	console.log(filters); 
		        // alertOrConsole(filters[2].getPeriod());
		    };

		    var onError = function (err) {
		    	console.log('error!!!!')
		        // alertOrConsole("Whoops");
		    };

		    mainWorkbook.activateSheetAsync("The Register").then(function (newSheet) {
		        newSheet.getFiltersAsync().then(onSuccess, onError);
		    });


		    
				    
		}



	}


	

	// VizFuncs.setReportTitle('PRU1'); 

	VizFuncs.renderViz(getReportUrl()); 
	VizFuncs.addEventListeners(); 

	
	


});