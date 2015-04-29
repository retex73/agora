'use strict';

/**
 * @ngdoc controller
 * @name ng.controller:NavCtrl
 * @requires $scope
 * @requires $route
 * @requires $routeParams
 * @requires $parse
 * @requires $templateCache
 * @requires $location
 * @requires $window 
 * @description
 * Contains methods to handle the navigation menus. This could probably do with a cleanup as there are some
 * methods left over from previous iterations of the nav
 */
angular.module('agoraApp')
  .controller('NavCtrl', function($scope, $route, $routeParams, $parse, $templateCache, $location, $window) {

    
/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#defaultColour
 * @methodOf ng.controller:NavCtrl
 * @description
 * Sets the default menu colour depending on the section 
 * as set in the url via $routeParams
<pre>
<div id="reports-tier" style="background: {{defaultColour}}">...</div>
</pre>
 * @return {String} String colour as hex value
 */    
    $scope.defaultColour = function(){      
      var theme = agora.themr.setCurrentState($routeParams.id); 
      // Return theme color
      return theme.colour; 
      
    }; 


/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#doNothing
 * @methodOf ng.controller:NavCtrl
 * @description
 * When a user clicks on the top level nav, we want to prevent the hyperlink 
 * from working (for now)
 */
    $scope.doNothing = function($event) {
      $event.preventDefault(); 
    }; 

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#setSectionColour
 * @methodOf ng.controller:NavCtrl
 * @description
 * Applies the corresponding section colour to the second level nav
 * based on the given section 
 <pre>
  setSectionColour(section);
 </pre>
 * @param {string} string Section name e.g. revalidation
 */
    var setSectionColour = function(section) {    
    
      var theme = agora.themr.setCurrentState(section);
      var sectionColour = theme.colour;

      $("#reports-tier").css('background', sectionColour);
    };

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#hashChanged
 * @methodOf ng.controller:NavCtrl
 * @description
 * Listens for url hash change on window load and re-applies the appropriate colour
 * to the nav. 
 <pre>
      $window.onload = function() {
        hashChanged();
      }

      window.addEventListener("hashchange", hashChanged);
 </pre> 
 */
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

    // Grabs the report structure from the main config
    $scope.structure = agora.reports.getReportStructure();
    // Grabs the group names
    $scope.groups = groups;


    window.lastSelected = '';


    $scope.timer = '';

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#showSections
 * @methodOf ng.controller:NavCtrl
 * @description
 * Shows the subsections when hovering over a group name
 <pre>
      $window.onload = function() {
        hashChanged();
      }

      window.addEventListener("hashchange", hashChanged);
 </pre>
 * @param {object} object e Mouse event
 * @param {string} string Section name
 * @param {string} string id of parent html element
 */
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

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#getElementPosition
 * @methodOf ng.controller:NavCtrl
 * @description
 * Gets the screen coordinates for a given element to 
 * align the subsection text
 <pre>
      getElementPosition(key)
 </pre> 
 * @param {string} string if of parent html element
 * @return {string} string left position in px
 */
    var getElementPosition = function(key) {

      var selector = "#" + key;      
      var pos = $(selector).offset();
      var marginLeft = (pos.left - 30) + "px";
      
      return marginLeft;
    };


/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#hideSections
 * @methodOf ng.controller:NavCtrl
 * @description
 * Hides the subsections on mouseout
 <pre>
      <a ... ng-mouseleave="hideSections(); ... </a>
 </pre>
 */

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


/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#persistSections
 * @methodOf ng.controller:NavCtrl
 * @description
 * Keeps the subsections visible when the mouse leaves the parent div
 <pre>
      <div id="reports-tier-one" class="{{showTierOne}}" ng-mouseover="persistSections(e);" ... </div>
 </pre> 
 */
    $scope.persistSections = function() {
      agora.themr.setHoverClass($scope.section);
      setSectionColour($scope.section);
      $scope.showTierOne = "show-tier-one";

      $('#reports-tier').find("li:contains(" + lastSelected + ")").addClass('persisting-hover');
    };


/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#isActive
 * @methodOf ng.controller:NavCtrl
 * @description
 * Determines if the nav's element should have the active class
 <pre>
      getElementPosition(key)
 </pre> 
 * @param {string} string if of parent html element
 * @return {string} string left position in px
 */
    $scope.isActive = function(viewLocation) {
      var parts = $location.path().split('/'),
        mainPart = "#/" + parts[1];

      return viewLocation === mainPart;
    };


/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#isActiveReport
 * @methodOf ng.controller:NavCtrl
 * @description
 * Determines if the nav's report tier element should have the active class
 <pre>
      isActiveReport(viewLocation)
 </pre> 
 * @param {string} string viewLocation report url
 * @return {bool} bool report section should have active class
 */
    $scope.isActiveReport = function(viewLocation) {
      var parts = $location.path().split('/'),
        mainPart = parts[2], 
        viewLocationParts = viewLocation.split('/'), 
        mainLocationPart = viewLocationParts[2]; 
            
      return mainLocationPart === mainPart; 
    }, 

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#toggleTier
 * @methodOf ng.controller:NavCtrl
 * @description
 * Toggles the second nav tier to show or hide
 */
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
        html += "<li class='subsection-hover'><a href='/#reports/" + group + "/" + key + "/report'>" + key + "</a></li>";
      });

      $(".reportSections").append(html);      
    }

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#showTier
 * @methodOf ng.controller:NavCtrl
 * @description
 * Handles the animation of the nav showing the second tier
 <pre>
      showTier(selector); 
 </pre> 
 * @param {string} string Selector The name of the id to apply to
 */
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
/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#hideTier
 * @methodOf ng.controller:NavCtrl
 * @description
 * Handles the animation of the nav hiding the second tier
 <pre>
      hideTier(selector); 
 </pre> 
 * @param {string} string Selector The name of the id to apply to
 */
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

    

    $scope.groups = Object.keys(groups); 

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#openLink
 * @methodOf ng.controller:NavCtrl
 * @description
 * Opens a given link in a new window with fixed dimensions of w:500px x h:900px
 <pre>
      <a ng-click="openLink($event,'http://www.gmc-uk.org/disclaimer.asp');" href="#">Disclaimer</a>
 </pre> 
 * @param {object} object $event The click event object
 * @param {string} string link The link to open 
 */
    $scope.openLink = function($event, link) {
      $event.preventDefault(); 
      window.open(link, link, "width:500, height:900");       
    }; 


/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#feedBack
 * @methodOf ng.controller:NavCtrl
 * @description
 * Opens the feedback form in a new window. The feedback link is hard coded
 <pre>
      <a ng-click="feedBack($event);" href="#">Feedback</a>
 </pre> 
 * @param {object} object $event The click event object
 */
    $scope.feedBack = function($event) {
      $event.preventDefault(); 
    
      var link = 'http://www.gmc-uk.org/help/agora_feedback.asp'; 
      window.open(link, link, "width:1000, height:600");       
    }; 

/**
 * @ngdoc method
 * @name ng.controller:NavCtrl#checkLink
 * @methodOf ng.controller:NavCtrl
 * @description
 * Opens a viz from the nav if route paramaters are found, otherwise just returns
 <pre>
      <a ng-click="checkLink();"...</a>
 </pre> 
 */
    $scope.checkLink = function() {      
      if(Object.keys($routeParams).length === 0) {
        return; 
      } else {
        agora.vizfuncs.renderViz($routeParams); 
      }      
    }; 


  });


