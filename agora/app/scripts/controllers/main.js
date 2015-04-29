'use strict';

/**
 * @ngdoc controller
 * @name ng.controller:MainCtrl
 * @requires $scope
 * @description
 * Controller for the main landing page. 
 */

angular.module('agoraApp')
  .controller('MainCtrl', function ($scope) {

/**
 * @ngdoc method
 * @name ng.controller:MainCtrl#gotoReports
 * @methodOf ng.controller:MainCtrl
 * @description
 * Forwards the user to the reports section after they click on 'get started'
 */
    $scope.gotoReports = function() {
        $("#reports-tier").removeClass("reports-tier-hide");
        $("#reports-tier ul").show();
        window.location.href = "#/reports"; 
    }; 

  });