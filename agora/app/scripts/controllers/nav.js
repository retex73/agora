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

    // preload images
    agora.themr.preloader(); 


    $scope.structure = agora.reports.getReportStructure();

    $scope.groups = groups;

    window.lastSelected = '';

    $scope.timer = '';

    $scope.showSections = function(e, section) {

      var theme = agora.themr.setCurrentState(section); 
      var sectionColour = theme.colour; 
      var sectionImage = "/images/" + theme.image; 

      $("#reports-tier").css('background', sectionColour); 
      

      lastSelected = section;


      $scope.tierOne = (Object.keys(groups[section]));
      $scope.tierOne.push(section);

      $scope.showTierOne = "show-tier-one";

      $scope.marginLeft = (e.offsetX - 100) + "px";

      var delay = 100;




      $scope.timer = setTimeout(function() {
        var marginLeft = (e.offsetX - 100) + "px";
        $('#tier-one-ul').hide();
        $('#tier-one-ul li:first').css('margin-left', marginLeft);
        $('#tier-one-ul').fadeIn(100);
      }, delay);
    };



    $scope.hideSections = function() {
      $scope.showTierOne = "";
      $('#reports-tier').find("li:contains(" + lastSelected + ")").removeClass('persisting-hover');
    };


    $scope.persistSections = function() {
      clearTimeout($scope.timer);
      $scope.showTierOne = "show-tier-one";

      $('#reports-tier').find("li:contains(" + lastSelected + ")").addClass('persisting-hover');
    };


    $scope.isActive = function(viewLocation) {

      var parts = $location.path().split('/'),
        mainPart = "#/" + parts[1];

      return viewLocation === mainPart;
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
      angular.forEach(reportSections, function(value, key) {
        console.log('Key: ' + key);
        html += "<li><a href='/#reports/" + group + "/" + key + "/report'>" + key + "</a></li>";
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



$(document).ready(function() {
  $(".nav-main").on("click", function() {
    var id = $(this).attr('id');

    if (id == "reports") {
      $("#reports-tier").removeClass("reports-tier-hide");
      $("#reports-tier ul").show();
      console.log('showing stuff');
    } else {
      $("#reports-tier").addClass("reports-tier-hide");
      $("#reports-tier ul").hide();
    }
  });
});


window.onload = function() {
  if (window.location.hash != "#/reports") {    
    $("#reports-tier").addClass("reports-tier-hide");
    $("#reports-tier ul").hide();
  }
}