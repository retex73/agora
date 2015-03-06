var agora = window.agora || {};

(function() {
	agora.themr = {

		

		/**
		 * Actually gets the current theme for section 
		 * @param {[type]} section [description]
		 */
		setCurrentState: function(section) {						
			return agora.reports.getSectionTheme(section); 
		}, 

		/**
		 * Preloads the images for better caching
		 * @return {[type]} [description]
		 */
		preloader: function(){
			// console.log(groups); 
			var images = []; 
			$.each(groups, function(key, value){
				var theme = agora.themr.setCurrentState(key); 
				images.push(theme.image); 
			}); 

			var i = 0; 
			$.each(images, function(k, v){
				var img = "img" + i; 
				img = new Image(); 
				img.src = "/images/" + v; 
				i++; 
				
			}); 
		}, 

		getDefaultColour: function() {
			return "#797979"; 
		}

		




	}
})();