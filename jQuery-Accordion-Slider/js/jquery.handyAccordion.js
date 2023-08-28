// jQuery Handy Accordion v20140102 Beta
// Created by Gyumin Choi

$(function(){
	$.config={
		// internal use variable
		list:null, // banner list
		listLen:0, // number of banners

		// User-required defined variable
		minWidth:0, // minimum banner width(px)
		duration:0, // moving time(1000=1second)

		// User-selected defined variable
		scr:'.handy_slide', // banner screen area
		scrWidth:0, // screen(this) horizontal length(px)
		maxWidth:0, // maximum banner width(px)
		method:'mouseover', // How the button works(mouseover, click)
		autoplay:true, // auto play(true/false)
		timeout:5000, // Time interval between replays(1000=1second)
		loop:true, // repeat(true/false)
		fade:true, // fade effect(true/false)
		easing:'linear' // moving effect(http://jqueryui.com/effect/#easing)
	};

	$.fn.handyAccordion=function(defaults){
		let option=$.extend({},$.config,defaults);

		option.scr=$(this).find(option.scr),
		option.list=option.scr.find('>li'),
		option.listLen=option.list.length
		if(option.scrWidth==0) option.scrWidth=$(this).width();
		if(option.maxWidth==0) option.maxWidth=option.scrWidth-((option.list.length-1)*option.minWidth);

		$(this).width(option.scrWidth);
		option.scr.width(option.scrWidth+option.minWidth);
		if(option.scr.find('>.on').html()==null) option.list.eq(0).addClass('on');

		option.list.each(function(i){
			$(this).attr('data-no',i);
			if($(this).hasClass('on')) $(this).width(option.maxWidth);
			else $(this).width(option.minWidth);
		});

		function accordion(no){
			option.list.queue('fx',[]).stop().find('>div').queue('fx',[]).stop();
			if(no>=option.listLen){
				if(option.loop==true) no=0;
				else return false;
			}
			current=option.list.eq(no),
			siblings=current.siblings(),
			old=option.scr.find('>.on')

			if(option.fade==true){
				current.find('>div').animate({'opacity':0},33,function(){
					$(this).animate({'opacity':1},100).parent().addClass('on');
				});
				old.find('>div').animate({'opacity':0},33,function(){
					siblings.find('>div').animate({'opacity':1},100);
					$(this).parent().removeClass('on');
				});
			}else{
				current.addClass('on');
				old.removeClass('on');
			}
			current.animate({'width':option.maxWidth},option.duration,option.easing);
			siblings.animate({'width':option.minWidth},option.duration,option.easing);
		}

		if(option.autoplay==true) {let repeat=setInterval(function(){accordion(~~option.scr.find('>.on').attr('data-no')+1)},option.timeout);}

		option.list.on('keyup '+option.method,function(){
			clearInterval(repeat);
			if($(this).hasClass('on')==false) accordion($(this).attr('data-no'));
		});

		option.list.on('mouseleave',function(){
			if(option.autoplay==true) repeat=setInterval(function(){accordion(~~option.scr.find('>.on').attr('data-no')+1)},option.timeout);
		});
	};
});

