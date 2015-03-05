var agora = window.agora || {};

(function() {
	agora.themr = {


		setCurrentState: function(section) {						
			return agora.reports.getSectionTheme(section); 
		}, 

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

	}
})();