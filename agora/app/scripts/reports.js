var agora = window.agora || {}; 

(function(){

	/**
	 * @ngdoc service
	 * @name agora.reports
	 * @description 
	 * Searches the config file for report names and report sections		
	 */
	agora.reports = {
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

			if(typeof result[0] == "undefined") {
				return false; 
			} else {
				return result[0].pages; 
			}
		}, 

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
		sanitizeCategoryName: function(categoryName) {			
			// replace underscores with spaces
			var str = categoryName.replace("_", " "); 
			// Ucwords
			// str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			// 	return letter.toUpperCase(); 
			// }); 

			return str; 
		}, 

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