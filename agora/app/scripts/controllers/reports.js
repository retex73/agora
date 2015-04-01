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
    $scope.gotoReports = function(link) {            
            window.location.href = link; 
    }; 


    var addDefaultTextClass = function(){
        $(".report-section-text").addClass('default-text'); 
    }; 

    addDefaultTextClass(); 
    $scope.getDescription = function(desc, key) {
        $(".report-section-text").removeClass('default-text'); 
        // Remove default text class
    	
        $scope.descTitle = desc.groupName;  
    	$scope.defaultText = desc.description; 
        $scope.descPages = desc.pages; 
    	// $scope.bgClass="background-" + key; 
    	var img = "/images/reports-" + key + ".jpg"; 
    	$('.reports-background').after().css(
    	{
    		'background-image': 'url("' + img + '")', 
    	});

        


        
    	// var colours = ['#2a3f61','#2ca7bf','#5a2a80','#b05898','#7c418c','#7a71ad','#4275b3']; 
        var colours = ['42,63,97','44,167,191','90,42,128','176,88,152','124,65,140','122,113,173','66,117,179']; 


    	$(".report-group-info-text").css({
    		'background': 'rgba(' + colours[key] + ', 0.8)', 
    		'color': '#fff'
    	}); 

    }; 
    
  });


$(document.body).on('click', '.report-group-link-box', function(e){
    e.preventDefault(); 
    
    var top = $(this).position().top; 
    top = top + 4; 
    var bgCol = $(this).closest('li').css("background-color");

    // get numbers
    var n = bgCol.replace(/[^\d,]/g, '').split(',');
    


    
    

    // $('.bubble').offset({top: top});
    $('.bubble').show(); 
    

    $('.bubble').stop(); 
     
    $('.bubble').animate({
        'top': top, 
    }); 

    var rgba = n.toString() + ", 0.8"; 
    var bgProp = "50px solid rgba(" + rgba + ")"; 
    
    
    $('.bubble').css("border-right", bgProp); 
    $('.get-started button').css('background', bgCol);
    $('.section-info-rollover a').css('color', bgCol);     

}); 

