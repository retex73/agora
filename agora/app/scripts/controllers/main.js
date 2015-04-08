'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('MainCtrl', function ($scope) {

    $scope.gotoReports = function() {
        $("#reports-tier").removeClass("reports-tier-hide");
        $("#reports-tier ul").show();
        window.location.href = "#/reports"; 
    }; 

  });
