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

    console.log($route.current.params); 

    $scope.sectionName = agora.reports.sanitizeCategoryName($route.current.params.id);

    console.log($scope.sectionName); 

    $scope.pages = agora.reports.getPages($route.current.params.id);

    $scope.sectionDescriptions = agora.reports.getSectionDescriptions(pagesObj, Object.keys($scope.pages));

    $scope.gotoViz = function(url) {
      $location.path($location.path() + "/" + url);
    }

  });