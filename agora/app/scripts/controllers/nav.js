'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:MainCtrl
 * @description
 * # NavCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('NavCtrl', function($scope, $route, $parse, $templateCache, $location, $window) {

    $scope.defaultColour = '#797979';

    $scope.doNothing = function($event) {
      $event.preventDefault(); 

      console.log('do nothing method called'); 
    }; 

    var setSectionColour = function(section) {      
      var theme = agora.themr.setCurrentState(section);
      var sectionColour = theme.colour;

      $("#reports-tier").css('background', sectionColour);
    };

    function hashChanged() {
      // Determine what the section colour is
      $scope.defaultColour = agora.themr.getDefaultColour();
      // If we are on a reports page, show the navigation bar, else hide it
      var isReportPage = window.location.hash.search("reports");

      if (isReportPage > 0) {        
        $("#reports-tier").removeClass("reports-tier-hide");
        $("#reports-tier ul").show();
      } 
      else {
        $("#reports-tier").addClass("reports-tier-hide");
        $("#reports-tier ul").hide();
      }

      // Reset nav bar to default colour
      agora.themr.removeHoverClass();
      $("#reports-tier").css('background', $scope.defaultColour);  
    }

    $window.onload = function() {
      hashChanged();
    }

    // Listen for changes in the address bar
    window.addEventListener("hashchange", hashChanged);


    // preload images for faster loading
    agora.themr.preloader();


    $scope.structure = agora.reports.getReportStructure();

    $scope.groups = groups;


    window.lastSelected = '';


    $scope.timer = '';

    $scope.showSections = function(e, section, key) {

      $scope.section = section; 

      // Get selector for parent element so we can find the position  
      var marginLeft = getElementPosition(key);

      // Set the theme based on the sections
      setSectionColour(section);
      // globally set lastSelected
      lastSelected = section;

      agora.themr.setHoverClass($scope.section);

      $scope.tierOne = (Object.keys(groups[section]));
      $scope.tierOne.push(section);

      $scope.showTierOne = "show-tier-one";


      $('#tier-one-ul').hide();
      $('#tier-one-ul li:first').css('margin-left', marginLeft);
      $('#tier-one-ul').show();


      $(".viz-breadcrumb-info").hide();
      $(".viz-controls").hide();
    };



    var getElementPosition = function(key) {
      var selector = "#" + key;
      var pos = $(selector).offset();
      var marginLeft = (pos.left - 50) + "px";

      return marginLeft;
    };

    $scope.hideSections = function() {

      agora.themr.removeHoverClass();

      $("#reports-tier").css('background', $scope.defaultColour);

      setTimeout(function() {
        $(".viz-breadcrumb-info").fadeIn("fast");
        $(".viz-controls").fadeIn("fast");
      }, 300);


      $scope.showTierOne = "";

      $('#reports-tier').find("li:contains(" + lastSelected + ")").removeClass('persisting-hover');



    };



    $scope.persistSections = function() {
      agora.themr.setHoverClass($scope.section);
      setSectionColour($scope.section);
      $scope.showTierOne = "show-tier-one";

      $('#reports-tier').find("li:contains(" + lastSelected + ")").addClass('persisting-hover');
    };



    $scope.isActive = function(viewLocation) {
      var parts = $location.path().split('/'),
        mainPart = "#/" + parts[1];

      return viewLocation === mainPart;
    };

    $scope.isActiveReport = function(viewLocation) {
      var parts = $location.path().split('/'),
        mainPart = parts[2], 
        viewLocationParts = viewLocation.split('/'), 
        mainLocationPart = viewLocationParts[2]; 
            
      return mainLocationPart === mainPart; 
    }, 

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
      var reportSections = agora.reports.getPages(group),
      html = '';
      $(".reportSections").html("");

      
      angular.forEach(reportSections, function(value, key) {
        html += "<li><a href='/#reports/" + group + "/" + key + "/report'>" + key + "</a></li>";
      });

      $(".reportSections").append(html);      
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


