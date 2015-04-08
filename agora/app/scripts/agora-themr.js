var agora = window.agora || {};

(function() {
	agora.themr = {

		
		className: '', 
		hoverClassName: '', 
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

		convertSectionNameToUnderscore: function(section) {
			var toLower = section.toLowerCase(); 
			var toUnderscore = toLower.split(' ').join('_'); 
			
			return toUnderscore; 
		}, 

		setClassName: function(section) {			
			this.className = this.convertSectionNameToUnderscore(section); 
		}, 

		getClassName: function() {
			return this.className; 
		}, 


		setHoverClassName: function(section) {			
			this.hoverClassName = this.convertSectionNameToUnderscore(section); 
		}, 

		getHoverClassName: function() {			
			return this.hoverClassName; 
		}, 

		setHoverClass: function(section) {					
			var className; 

			if(typeof section == 'undefined') {
				className = lastSelected; 
			} else {
				className = section; 
			}
			this.hoverClassName = this.convertSectionNameToUnderscore(className); 

			// this.applyClassNames(); 
			console.log(this.hoverClassName); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(this.hoverClassName); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').addClass(this.hoverClassName); 
		}, 

		removeHoverClass: function() {				

			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(this.hoverClassName); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').addClass(this.className); 
		}, 

		getDefaultColour: function() {
			// Detect section from url 
			var url = decodeURIComponent(window.location.hash); 
			
			var sections = Object.keys(groups); 

			var section = ''; 
			$.each(sections, function(key, val){				
				var search = url.search(val);

				if(search > 0) {
					section = val; 
				}
				
			}); 

			// Now we have the section name, get the theme
			var theme = this.setCurrentState(section); 
			// Get the associated class name by converting spaces to underscores
			this.setClassName(section); 
			// Remove any previously set className
			// this.applyClassNames(); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(this.className); 									
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').addClass(this.className); 

			return theme.colour; 
		}, 

		applyClassNames: function() {
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(); 
			// $('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(this.hoverClassName); 
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').addClass(this.hoverClassName); 
			
			// $('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').removeClass(this.className); 									
			$('#custom-bootstrap-menu.navbar-default .navbar-nav > .active > a').addClass(this.className); 
		}
	}
})();