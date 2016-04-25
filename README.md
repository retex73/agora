# test
test
'use strict';

angular.module('coursesApp')
  .controller('AboutCtrl', function ($scope) {

	var monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];    

  	function getFullMonthDetails(d) {
  		var results = {
  			first: new Date(d.getFullYear(), d.getMonth(), 1), 
  			last: new Date(d.getFullYear(), d.getMonth(), 0)
  		}; 

  		return results; 
  	}


  	function diff(from, to) {
	    var arr = [];
	    var datFrom = new Date('1 ' + from);
	    var datTo = new Date('1 ' + to);
	    var fromYear =  datFrom.getFullYear();
	    var toYear =  datTo.getFullYear();
	    var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();

	    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
	        arr.push(monthNames[i%12] + " " + Math.floor(fromYear+(i/12)));
	    }        

    	return arr;
	}



	var start = new Date('September 2015').toDateString(); 
	var end = new Date('April 2016').toDateString(); 
	

	console.log(start); 


	// var diffResultArr = diff('September 2013', 'March 2014'); 
	


	var diffResultArr = diff(start, end); 

	console.log('something'); 


	_.each(diffResultArr, function(v){
		console.log('starting'); 
		console.log(v); 
		var d = new Date(v);

		console.log(d); 
		console.log(getFullMonthDetails(d));  
	}); 




  	var now = new Date(); 


  	var result = getFullMonthDetails(now); 

  	console.log(result); 





  });
