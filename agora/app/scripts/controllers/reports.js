'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('ReportsCtrl', function ($scope) {    
    var pages = agora.reports.search(pagesObj, 'repGroup'); 
    $scope.pages = pages[2]; 
    $scope.bgClass = ""; 

    $scope.defaultText = "Please choose the data report you would like to explore"; 
    $scope.getDescription = function(desc, key) {
    	
    	$scope.defaultText = desc; 
    	// $scope.bgClass="background-" + key; 
    	var img = "/images/reports-" + key + ".jpg"; 
    	$('.reports-background').after().css(
    	{
    		'background-image': 'url("' + img + '")', 
    	});


    	var colours = ['#2a3f61','#2ca7bf','#5a2a80','#b05898','#7c418c','#7a71ad','#4275b3']; 


    	$(".report-group-info-text").css({
    		'background': colours[key], 
    		'color': '#fff'
    	}); 




    }; 


    
    
  });
