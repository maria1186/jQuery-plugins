$(function(){
	$("#example").handyAccordion({
		// User-required defined variable
		minWidth:150, // minimum banner width(px)
		duration:1000, // moving time (1000=1second)

		// User-selected defined variable
		scr:'.handy_slide', // Banner Screen Area - Default:'.handy_slide'
		scrWidth:1100, // screen(this) width (px)
		maxWidth:450, // maximum banner width (px)
		method:'mouseover', // How the button works('mouseover', 'click') - default:'mouseover'
		autoplay:true, // auto play(true/false) - default:true
		timeout:4000, // Time interval between replays(1000=1second) - default:5000
		loop:true, // repeat(true/false) - default:true
		fade:true, // fade effect(true/false) - default:true
		easing:'easeOutQuint' // moving effect(http://jqueryui.com/effect/#easing) - default:'linear'
	});
});