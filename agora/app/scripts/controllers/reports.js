'use strict';

/**
 * @ngdoc function
 * @name agoraApp.controller:ReportsCtrl
 * @description
 * # ReportsCtrl
 * Controller of the agoraApp
 */
angular.module('agoraApp')
  .controller('ReportsCtrl', function ($scope) {
    
var Pages = {
    	search: function(where, q){
    		var results = []; 
    		$.each(where, function(index, value){
    			results.push(value); 
    		}); 

    		return results; 
    	}, 


    }; 


    $scope.groups = Pages.search(pagesObj.repGroup, 'The Register'); 

    var pages = Pages.search(pagesObj, 'repGroup'); 

    $scope.pages = pages[2]; 



    
  });
