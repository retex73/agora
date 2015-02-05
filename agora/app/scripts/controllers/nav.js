'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:MainCtrl
 * @description
 * # NavCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('NavCtrl', function($scope, $route, $parse, $templateCache, $location) {

    

    $scope.isActive = function(viewLocation) {
      var active = (viewLocation === "#" + $location.path());

      // var parts = window.location.pathname.split('/'); 
      var parts = $location.path().split('/'); 


      // console.log($location.path());

      // console.log(parts); 

      // angular.forEach(parts, function(value, key) {
      //   console.log(value); 

      // }); 

      return active;
    };

    $scope.toggleTier = function(action, selector) {
      if (action == 'show') {
        showTier(selector);
      } else {
        hideTier(selector);
        hideTier(".custom-tier3-bootstrap-menu-nav"); 
      }
    };

    /**
     * Show third tier nav based on report group selected
     */
    $scope.reportSections = {}; 

    $scope.reportSelect = function(group) {

      
      // var reportSections = Pages.getPages(group); 
      var reportSections = agora.reports.getPages(group); 
      
      $(".reportSections").html(""); 

      var html = ''; 
      angular.forEach(reportSections, function(value, key){
        console.log('Key: ' + key); 
        html += "<li><a href='/#reports/" + group + "/" + key + "/report1'>" + key + "</a></li>"; 
      }); 


      $(".reportSections").append(html); 
      // $scope.reportSections = Pages.getPages('The Register'); 
    }


    var showTier = function(selector) {
      $(selector)
        .css('opacity', 1)
        .slideDown('fast')
        .animate({
          opacity: 1
        }, {
          queue: false,
          duration: 'slow'
        });
      
    };

    var hideTier = function(selector) {
      $(selector)
      .css('opacity', 1)
        .slideUp('fast')
        .animate({
          opacity: 1
        }, {
          queue: false,
          duration: 'slow'
        });
    };
    
    $scope.groups = agora.reports.getGroups(); 

  });