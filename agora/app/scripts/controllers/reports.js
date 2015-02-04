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
    
  });
