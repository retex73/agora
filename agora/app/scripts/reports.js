var agora = window.agora || {}; 

(function(){

/**
 * @ngdoc service
 * @name ng.service:reports
 * @description
 * Contains methods to select from the mainconfig file
 */
	agora.reports = {
		dataSrc: pagesObj, 

/**
 * @ngdoc method
 * @name ng.service:reportsl#getGroups
 * @methodOf ng.service:reports
 * @description
 * Grabs the groups and returns an array
 <pre>
 	getGroups(); 
 </pre>
 */	
		getGroups: function() {
			var groups = []; 
			$.each(this.dataSrc.repGroup, function(index, value) {
				groups.push(value.groupName); 				
			}); 

			return groups; 
		}, 
/**
 * @ngdoc method
 * @name ng.service:reportsl#getPages
 * @methodOf ng.service:reports
 * @description
 * Grabs the pages belonging to a given group
 * @param {string} string Category Name
 <pre>
 	getPages(categoryName); 
 </pre>
 */	
		getPages: function(categoryName) { 
			var cName = this.sanitizeCategoryName(categoryName); 
			var result = $.grep(this.dataSrc.repGroup, function(e) {
				return e.groupName == cName; 
			}); 

			if(typeof result[0] == "undefined") {
				return false; 
			} else {
				return result[0].pages; 
			}
		}, 
/**
 * @ngdoc method
 * @name ng.service:reportsl#getSectionDescription
 * @methodOf ng.service:reports
 * @description
 * Gets the section description from the config file
 * @param {string} string Category Name
 <pre>
 	getSectionDescription(categoryName); 
 </pre>
 */	
		getSectionDescription: function(categoryName){
			var cName = this.sanitizeCategoryName(categoryName); 
			var result = $.grep(this.dataSrc.repGroup, function(e) {
				return e.groupName == cName; 
			}); 

			if(typeof result[0] == "undefined") {
				return false; 
			} else {
				// console.log(result[0].description); 
				return result[0].description; 
			}
		}, 

		/**
		 * format the category name
		 * @param  {string} categoryName [description]
		 * @return {string}              [description]
		 */
/**
 * @ngdoc method
 * @name ng.service:reportsl#sanitizeCategoryName
 * @methodOf ng.service:reports
 * @description
 * Cleans up the category name if it was grabbed from the url for example to convert it to 
 * lowercase and replace spaces with underscores. 
 * e.g. Fitness to practise becomes fitness_to_practise
 * @param {string} string Category Name
 <pre>
 	sanitizeCategoryName(categoryName); 
 </pre>
 @return {string} string sanitised category name
 */			
		sanitizeCategoryName: function(categoryName) {			
			// replace underscores with spaces
			var str = categoryName.replace("_", " "); 
			// Ucwords
			// str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			// 	return letter.toUpperCase(); 
			// }); 

			return str; 
		}, 
/**
 * @ngdoc method
 * @name ng.service:reportsl#getSectionDescriptions
 * @methodOf ng.service:reports
 * @description
 * Searches the mainconfig for the specific report descriptions 
 * @param {object} object Where to search (usually master object of mainconfig)
 * @return {array} array Array of results
 <pre>
 	getSectionDescriptions(where, cats); 
 </pre>
 */	
		getSectionDescriptions: function(where, cats) {
			// Remove class for default text 
			var result = []; 

			$.each(cats, function(index, value) {
				var the_string = value; 
				var desc = where.sectionDescriptions[value]; 
			
				result[value] = desc; 
			}); 			

			return result; 
		}, 


		search: function(where, q) {
			var results = []; 
			$.each(where, function(index, value) {
				results.push(value); 
			}); 

			return results; 
		}, 


/**
 * @ngdoc method
 * @name ng.service:reportsl#getReportStructure
 * @methodOf ng.service:reports
 * @description
 * Puts the mainconfig object into a more readable js object
 * @return {object} object object of results
 <pre>
 	getReportStructure(); 
 </pre>
 */	
		getReportStructure: function() {
			var structure = {}; 
			var groups = this.getGroups(); 

			$.each(groups, function(key, value) {
				// structure[value] = ["one", "two", "three"]; 
				var pages = agora.reports.getPages(value); 
				structure[value] = pages; 
			}); 

			return structure; 
		}, 

		/**
		 * returns the colour and image for a section
		 * @param  {[type]} sectionName [description]
		 * @return obj colour, theme
		 */
/**
 * @ngdoc method
 * @name ng.service:reportsl#getSectionTheme
 * @methodOf ng.service:reports
 * @description
 * Searches the config for the section's theme (colour and image)
 * @param {string} string The section name
 * @return {object} object Object containing colour and image
 <pre>
 	getSectionTheme(sectionName); 
 </pre>
 */			
		getSectionTheme: function(sectionName) {			
			var theme = {}; 
			var result = $.grep(this.dataSrc.repGroup, function(e) {
				return e.groupName == sectionName; 
			}); 

			if(typeof result[0] == "undefined") {
				theme['colour'] = "#797979";
				theme['image'] = '';  
				
			} else {
				// console.log(result[0].description);
				theme['colour'] = result[0].colour; 
				theme['image'] = result[0].image;  
				// return result[0].colour; 
				
			}
			return theme; 
		}
	}; 



	groups = agora.reports.getReportStructure(); 
	 

})();