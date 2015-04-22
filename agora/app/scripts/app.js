'use strict';

/**
 * @ngdoc overview
 * @name agoraApp
 * @description
 * # agoraApp
 *
 * Main module of the application.
 */
angular
  .module('agoraApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/reports/:id', {
        templateUrl: 'views/section.html', 
        controller: 'SectionCtrl'
      })
      .when('/reports/:id/:report/:reportname', {
        templateUrl: 'views/viz.html', 
        controller: 'VizCtrl'
      })

      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })      

      .when('/ie', {
        templateUrl: 'views/ie.html',
        controller: 'IeCtrl'
      })
      .otherwise({
        // redirectTo: '/'
      });
  });
