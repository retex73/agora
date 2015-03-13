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


    
    var Pages = {
    	search: function(where, q){
    		var results = []; 
    		$.each(where, function(index, value){
    			results.push(value); 
    		}); 

    		return results; 
    	}
    }; 


    $scope.groups = Pages.search(pagesObj.repGroup, 'The Register'); 


    $scope.gotoReports = function() {
        $("#reports-tier").removeClass("reports-tier-hide");
        $("#reports-tier ul").show();
        window.location.href = "#/reports"; 
    }; 

  });
