'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
