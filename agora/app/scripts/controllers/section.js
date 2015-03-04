'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('SectionCtrl', function($scope, $route, $parse, $location, $document) {

    // console.log($route.current.params); 
    $scope.sectionText = "Hover over the left icons for more info"; 

    $scope.sectionName = agora.reports.sanitizeCategoryName($route.current.params.id);



    agora.themr.setCurrentState($route.current.params.id); 


    $scope.sectionDescription = agora.reports.getSectionDescription($scope.sectionName); 

    $scope.pages = agora.reports.getPages($route.current.params.id);

    $scope.getDescription = function(desc) {
      
      $scope.sectionText = desc; 
      
    }; 

    $scope.sectionImages = {
      'Stats' : 'stats.png', 
      'UK maps': 'uk.png', 
      'World maps': 'world.png'
    }; 

    var colours = ['#2a3f61','#2ca7bf','#5a2a80','#b05898','#7c418c','#7a71ad','#4275b3']; 

    $scope.sectionDescriptions = agora.reports.getSectionDescriptions(pagesObj, Object.keys($scope.pages));


    function hex2rgba(hex, opacity){
        //extract the two hexadecimal digits for each color
        var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
        var matches = patt.exec(hex);

        //convert them to decimal
        var r = parseInt(matches[1], 16);
        var g = parseInt(matches[2], 16);
        var b = parseInt(matches[3], 16);

        //create rgba string
        var rgba = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";

        //return rgba colour
        return rgba;
    }


    var theme = agora.themr.setCurrentState($route.current.params.id); 
    $scope.sectionColour = theme.colour; 
    $scope.sectionImage = "/images/" + theme.image; 


    // $scope.sectionColour = getSectionColour(); 

    // console.log('Section Colour: ' + $scope.sectionColour); 
    
    var setSectioncolour = function() {   
      $(".report-groups ul li").css('background', $scope.sectionColour); 
      $(".reports-background").css('background-image', 'url(' + $scope.sectionImage +')');  
      // $("#section-info").css('background', hex2rgba($scope.sectionColour, 0.9));
      // $(".section-description").css('background', hex2rgba($scope.sectionColour, 0.9)); 

    }; 
    
    setTimeout(function(){
      setSectioncolour(); 
    }, 10); 


    $scope.gotoViz = function(url) {
      $location.path($location.path() + "/" + url);
    }

  });

