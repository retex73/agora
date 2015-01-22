'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('SectionCtrl', function($scope, $route, $parse, $location) {


    // console.log($route.current.params); 



    var Pages = {
      getPages: function(where, categoryName) {
        var cName = this.sanitizeCategoryName(categoryName);

        var result = $.grep(where, function(e) {
          return e.groupName == cName;
        });

        if (typeof result[0] == "undefined") {
          // redirect to 404
          return false;
        }

        return result[0].pages;

      },

      sanitizeCategoryName: function(categoryName) {

        // Exceptions list 



        var nameExceptions = ["Banana", "Orange", "Apple", "Mango", "FTP"],
          inException = nameExceptions.indexOf(categoryName);


        if (inException) {
          return categoryName;
        }


        // replace underscores with spaces
        var str = categoryName.replace("_", " ");
        // Ucwords
        str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
        });

        console.log('category name: ' + str);
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

    $scope.sectionName = Pages.sanitizeCategoryName($route.current.params.id);

    $scope.pages = Pages.getPages(pagesObj.repGroup, $route.current.params.id);

    // console.log($scope.pages);

    $scope.sectionDescriptions = Pages.getSectionDescriptions(pagesObj, Object.keys($scope.pages));



    $scope.gotoViz = function(url) {
      $location.path($location.path() + "/" + url); 
    }



  });