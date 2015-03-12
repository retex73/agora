/**
 * The nav stuff
 */
(function( window ){
	
	'use strict';

	var body = document.body,
		mask = document.createElement("div"),
		toggleSlideLeft = document.querySelector( ".toggle-slide-left" ),		
		activeNav
	;
	mask.className = "mask";

	
	/* hide active menu if mask is clicked */
	mask.addEventListener( "click", function(){
		classie.remove( body, activeNav );
		activeNav = "";
		document.body.removeChild(mask);
	} );

	/* hide active menu if close menu button is clicked */
	[].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el,i){		
		el.addEventListener( "click", function(){
			classie.remove( body, activeNav );
			activeNav = "";
			document.body.removeChild(mask);
		} );
	});

	$(document).ready(function(){
		$(".close-menu").on("click", function(){
			classie.remove( body, activeNav );
				activeNav = "";
				document.body.removeChild(mask);
		}); 

		setTimeout(function() {
    		$(".toggle-slide-left").on("click", function(){
    			classie.add(body, "sml-open"); 
    			document.body.appendChild(mask); 
    			activeNav = "sml-open"; 
    		}); 
    		
		}, 250);
		
	}); 

})( window );





