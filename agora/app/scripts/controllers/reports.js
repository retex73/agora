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

        


        // $the_register: #334773; 
        // $ftp: #20a6c3; 
        // $employers: #5c2682; 
        // $medical_schools: #b3549b; 
        // $deaneries: #7f3d90; 
        // $royal_colleges: #7b6fb1; 
        // $revalidation: #4072b7;
    	var colours = [
            '#334773', // The register
            '#4072b7', // revalidation 
            '#20a6c3', // ftp
            '#5c2682', // employers
            '#b3549b', // medical schools
            '#7f3d90' // deaneries
            ]; 
        // var colours = ['42,63,97','44,167,191','90,42,128','176,88,152','124,65,140','122,113,173','66,117,179']; 




        // convert a hexidecimal color string to 0..255 R,G,B
        var hexToRGB = function(hex){
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
        }; 

        

        var c = hexToRGB(colours[key]); 

        var rgb = c.r + ',' + c.g + ',' + c.b; 

        console.log(rgb); 


    	$(".report-group-info-text").css({



    		'background': 'rgba(' + rgb + ', 0.8)', 
            
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


    // Set view button width
    var buttonWidth = $(".panel-body").width(); 
    buttonWidth = buttonWidth + 30; 
    $(".get-started-bottom").width(buttonWidth); 

}); 

