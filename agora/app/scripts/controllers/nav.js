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

    var Pages = {
      dataSrc: pagesObj,

      getGroups: function() {
        var groups = [];
        $.each(this.dataSrc.repGroup, function(index, value) {
          groups.push(value.groupName);
        });

        return groups;
      },

      getPages: function(categoryName) {
        var cName = this.sanitizeCategoryName(categoryName);
        var result = $.grep(this.dataSrc.repGroup, function(e) {
          return e.groupName == cName;
        });

        if (typeof result[0] == "undefined") {
          // redirect to 404
          return false;
        }

        return result[0].pages;

      },



      sanitizeCategoryName: function(categoryName) {

        // replace underscores with spaces
        var str = categoryName.replace("_", " ");
        // Ucwords
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
        });

        return str;
      },

      getSectionDescriptions: function(where, cats) {
        var result = [];
        $.each(cats, function(index, value) {
          // $scope.value = where.sectionDescriptions[value]; 
          var the_string = value;
          var desc = where.sectionDescriptions[value];

          // $scope[value] = desc; 

          result[value] = desc;

        });

        return result;
      }

    };

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




    $scope.hideSubNav = function() {      
      $("#collapseReportSections").collapse('hide'); 
      $("#collapseReports").collapse('hide'); 
    }


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

      
      var reportSections = Pages.getPages(group); 
      
      $(".reportSections").html(""); 

      var html = ''; 
      angular.forEach(reportSections, function(value, key){
        console.log('Key: ' + key); 
        html += "<li><a href='/#reports/" + group + "/" + key + "/report1'>" + key + "</a></li>"; 
      }); 


      $(".reportSections").append(html);       
      // $scope.reportSections = Pages.getPages('The Register'); 
      $("#collapseReportSections").collapse('show'); 
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

    


    

    // $scope.pages = Pages.getPages("The Register"); 

    $scope.groups = Pages.getGroups();



  


  });