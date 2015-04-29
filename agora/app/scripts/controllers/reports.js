'use strict';

/**
 * @ngdoc controller
 * @name ng.controller:ReportsCtrl
 * @requires $scope
 * @description
 * Contains methods to handle the reports page
 * @requires $scope
 * 
 */
angular.module('agoraApp')
  .controller('ReportsCtrl', function ($scope) {  

    var pages = agora.reports.search(pagesObj, 'repGroup'); 
    var current_colour_class = ''; 
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
    	var img = "/home/images/reports-" + key + ".jpg"; 
    	$('.reports-background').after().css(
    	{
    		'background-image': 'url("' + img + '")', 
    	});

        $(".report-group-info-text").removeClass(current_colour_class + "_text_box"); 
        $(".bubble").removeClass(current_colour_class + "_border_right"); 
        
        var gn = desc.groupName.replace(new RegExp(" ", 'g'), "_").toLowerCase();
        current_colour_class = gn; 
                
        $(".report-group-info-text").addClass(gn + "_text_box");  
        
        $('.bubble').addClass(gn + "_border_right"); 

        $(".report-section-text").removeClass('report-default-text'); 
    }; 
    
  });


$(document.body).on('click', '.report-group-link-box', function(e){
    e.preventDefault(); 
    
    var top = $(this).position().top; 
    top = top + 4; 
    var bgCol = $(this).closest('li').css("background-color");

    $('.bubble').show(); 
    
    $('.bubble').stop(); 
     
    $('.bubble').animate({
        'top': top, 
    }); 

    $('.get-started button').css('background', bgCol);
    $('.section-info-rollover a').css('color', bgCol);     

}); 

