'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('SectionCtrl', function($scope, $route, $parse, $location) {

    // console.log($route.current.params); 
    $scope.sectionText = "Hover over the left icons for more info"; 

    $scope.sectionName = agora.reports.sanitizeCategoryName($route.current.params.id);

    $scope.sectionDescription = agora.reports.getSectionDescription($scope.sectionName); 

    $scope.pages = agora.reports.getPages($route.current.params.id);

    $scope.getDescription = function(desc) {
      
      $scope.sectionText = desc; 
      
    }; 

    var colours = ['#2a3f61','#2ca7bf','#5a2a80','#b05898','#7c418c','#7a71ad','#4275b3']; 

    $scope.sectionDescriptions = agora.reports.getSectionDescriptions(pagesObj, Object.keys($scope.pages));



    // console.log($scope.sectionDescriptions); 
    

    var i = 0; 

    $.each(groups, function(key, val){
      console.log(key); 
    }); 
    



    $scope.gotoViz = function(url) {
      $location.path($location.path() + "/" + url);
    }

  });