// DOCUMENT READY
jQuery(document).ready(function($){

	// GET HEADER HEIGHT
	var headerHeight = $('header').outerHeight();
	
	// CACHED INT VALUE FOR SCROLLING
	var rememberScroll = 0;

	// MOBILE DETECTION FIRST
	if(WURFL.is_mobile){$('body').addClass('mobile');}
	if(WURFL.form_factor == 'Tablet'){$('body').addClass('tablet');}
	
	// HIDE/SHOW CONTENT DEN
	if(location.origin.split('.')[0].split('//')[1] == 'den' || location.search.indexOf('dev=true') > -1){
		$('body').addClass('live den');
	}
	// HIDE/SHOW CONTENT CHI
	if(location.origin.split('.')[0].split('//')[1] == 'chi'){
		$('body').addClass('live chi');
	}	
	if(!$('body').hasClass('live')){
		$('body').html('').append('<p style="text-align:center;font-size:4rem;font-weight:bold;color:#333;margin:6rem 0;text-transform:uppercase;">A new version of geebart.com is on the way!</p>');
		return false;
	}

	// VIEWPORT FUNCTION
	$.fn.isOnScreenWithOffset = function(offset){

		if(!offset){
			offset = 190;
		} 

	    var win = $(window);

	    var viewport = {
	        top : win.scrollTop(),
	        left : win.scrollLeft()
	    };
	    viewport.right = viewport.left + win.width();
	    viewport.bottom = (viewport.top + (win.height() - offset));

	    var bounds = this.offset();
	    bounds.right = bounds.left + this.outerWidth();
	    bounds.bottom = (bounds.top + offset) + this.outerHeight();

	    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

	};

	// BUILD PERSONALITIES
	function runPersonalities(){
		var $slider = $('#headshot-frame').find('.slider');
		var $active = $slider.find('.active');
		if($active.next().length){
			$active.removeClass('active').next().addClass('active');
		}else{
			$active.removeClass('active').siblings(':first-child').addClass('active');
		}
	}

	// PLAY RECURSIVE SLIDER 
	var playPersonalities = setInterval(runPersonalities, 3000);

	// LETTERING.JS FOR #DENVER
	$('#denver .union-text-large').lettering();

	// TIMELINE ANIMATIONS AND WINDOW SCROLL
	var $tm = $('#timeline');
	var $tmProgress = $tm.find('.progress');
	var $window = $(window);
	$tm.find('> ul > li').addClass('active');

	// TIMELINE ON SCROLL
	$(window).scroll(function(){
		if(!$body.hasClass('mobile')){
			if($tm.isOnScreenWithOffset()){
				$tm.find('> ul > li').each(function(){
					if($(this).isOnScreenWithOffset()){
						$(this).addClass('active');
					} else if($(this).offset().top > $(window).scrollTop()){
						$(this).removeClass('active');
					}
					if($(this).is(':last-child') && $(this).hasClass('active') && !$(this).hasClass('last') && !$(this).hasClass('once')){
						$(this).addClass('last once');
						var $btn = $(this).find('.button');
						setTimeout(function(){
							$btn.addClass('active');
						}, 400);
						setTimeout(function(){
							$btn.removeClass('active');
						}, 700);
					} else{
						$(this).removeClass('last');
					}
					// DRAW LINE
					$tmProgress.height($tm.find('li.active').last().position().top + 5);
				});
			}
			// FIXED/STICKY NAV
			if(!$('#greet-hero').isOnScreenWithOffset(20)){
				$('header').addClass('active');
			} else{
				$('header').removeClass('active');
			}
		} else{
			$tm.find('> ul > li').addClass('active');
		}
	});

	// IMAGES LOADED
	$body.imagesLoaded(function(){

		// ADD IMAGES LOADED CLASS
		$('body').addClass('images-loaded');

		// GET HASH
		var hash = location.hash;

		// CHECK FOR HASH
		if(hash){
			if(hash != '#resume'){
				var $target = $('.projects-wrap').find('.project[data-project="' + location.hash.replace('#', '') + '"]');
				$("html, body").animate({scrollTop: $target.position().top}, 600);
				$target.find('.logo').trigger('click');
			} else{
				var $target = $('.resume-link').trigger('click');
				$("html, body").animate({scrollTop: 0}, 600);
				$target.trigger('click');
			}
		}
	});

	// ANIMATE SCROLL
	$(document).on('click', '.scroll', function(e){

		// PREVENT CLICK
		e.preventDefault();
		
		// SWITCH BASED ON DESTINATION
		switch($(this).attr('data-scroll')){
			// SPECIAL CASES FOR SCROLLS TO COMPENSATE FOR STICKY OR NO STICKY
			case '#hire-me':
				$("html, body").animate({scrollTop: $($(this).attr('data-scroll')).position().top}, 600);
			break;
			case '#origins':
				$("html, body").animate({scrollTop: $($(this).attr('data-scroll')).position().top + 80}, 600);
			break;
			case '#denver':
				$("html, body").animate({scrollTop: ($($(this).attr('data-scroll')).position().top) - (headerHeight + parseInt($('#hire-me').css('padding-top')) + 20)}, 600);
			break;
			default:
				$("html, body").animate({scrollTop: ($($(this).attr('data-scroll')).position().top) - (headerHeight)}, 600);
			break;
		}
		// TRIGGER HIRE ME FORM
		if($(this).hasClass('hire-me-trigger') || $(this).attr('href') == '#hire-me'){
			$('#hire-me .frame-wrap').addClass('swap');
		}

	});

	// REMOVE ERROR CLASS FROM FIELDS
	$(document).on('focus', 'input.error, select.error, textarea.error', function(){
		$(this).removeClass('error');
	});

	// CONTACT FORM VALIDATION
	function validate(form){

		// CLEAN FORM
		form.removeClass('error').find('.error').removeClass('error');
		form.addClass('load').addClass('done').removeClass('success');

		// DELAY TEXT REMOVAL FOR ANIMATION
		// setTimeout(function(){
			form.find('.message').text('');

			var errorFound = false;
			var message = '';

			// VALIDATE FIELDS
			form.find('input, select, textarea').each(function(){
				// VALIDATE EMAIL
				if($(this).attr('type') == 'email'){
					var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  					if(!re.test($(this).val())){
  						errorFound = true;
  						message = 'Enter a Valid Email Address';
  					}
				}
				// NO EMPTY FIELDS
				if(!$(this).val()){
					errorFound = true;
					form.addClass('error');
					$(this).addClass('error');
					message = 'All Fields are Required';
				}
				// PAINT MESSAGE
				form.find('.message').text(message);
			});

			// RETURN ERROR STATUS
			if(errorFound == true){
				return true;
			} else{
				return false;
			}

		//}, 400);
	}

	// FORM SUBMISSION
	$(document).on('submit', '#contact-form', function(event){
		event.preventDefault();
		var $this = $(this);
		if(!validate($this)){
			$.ajax({
				url: "http://formspree.io/" + "geeb" + "@" + "geebart" + "." + "com",
				method: "POST",
				data: $this.serialize(),
				dataType: "json",
				success: function(){
					setTimeout(function(){
						$this.removeClass('load').addClass('success').find('.message').text('Success!');
					}, 800);
					setTimeout(function(){
						$this.removeClass('done');
					}, 1400);
				},
				error: function(){
					setTimeout(function(){
						$this.addClass('error').removeClass('load').removeClass('success').removeClass('done').find('.message').text('An unknown error occurred. Try again.');
					}, 800);
				}
			});
		}
	});

	// TOGGLE FRAME WRAP
	$(document).on('click', '.toggle-frame', function(event){
		$('#hire-me .frame-wrap').toggleClass('swap');
	});

	// SETUP CONTENT STORAGE
	var workContent = [];
	var resumeContent = [];
	$('#work .project').each(function(){
		workContent.push('');
	});
	resumeContent.push('');

	// PROJECT BACK BUTTON
	$(document).on('click', '#slide .back', function(event){
		// PREVENT CLICK
		event.preventDefault();

		// CLEAN UP WINDOW LOCATION HASH
		location.hash = '';

		// REMOVE WORK SLIDE ACTIVE CLASS
		$('body').removeClass('slide-active work-active resume-active');

		// ACTIVATE HERO ANIMATIONS
		$('#greet-hero').addClass('active');

		// SCROLL BACK TO PREVIOUS SECTION
		if($('.projects-wrap .project.active').length > 0){
			$('html, body').scrollTop($('.projects-wrap .project.active').offset().top - headerHeight);
		}

		// RESET HERO BACKGROUND VIDEO IN CASE WE STARTED THE PAGE IN A SLIDE
		resizePlayer();
	});

	// PROJECT QUICK NAV NEXT
	$(document).on('click', '.slide-nav .next a', function(event){

		// PREVENT CLICK
		event.preventDefault();

		// CACHE NEXT PROJECT
		var $thisProject = $('.projects-wrap .project.active');
		var $nextProject = $thisProject.next();

		// NEXT PROJECT
		if($nextProject.length){
			$nextProject.find('.logo').trigger('click');
		} else{
			$thisProject.siblings('.project:first-child').find('.logo').trigger('click');
		}

	});

	// PROJECT QUICK PREV NEXT
	$(document).on('click', '.slide-nav .prev a', function(event){

		// PREVENT CLICK
		event.preventDefault();

		// CACHE NEXT PROJECT
		var $thisProject = $('.projects-wrap .project.active');
		var $prevProject = $thisProject.prev();

		// NEXT PROJECT
		if($prevProject.length){
			$prevProject.find('.logo').trigger('click');
		} else{
			$thisProject.siblings('.project:last-child').find('.logo').trigger('click');
		}

	});

	// LOAD RESUME
	$(document).on('click', '.resume-link', function(event){
		
		// PREVENT CLICK
		event.preventDefault();

		// SHOW LOADING ANIMATION FROM INSIDE WORK SLIDE
		$body.addClass('load');

		// SETUP VARS
		var url = $(this).attr('href');
		var $resumeSlide = $('#slide');
		var $resumeSlideContent = $resumeSlide.find('.slide-content');

		// START ANIMATION
		$('body').addClass('slide-active resume-active');

		// CHECK FOR CONTENT IN STORAGE FIRST // DELAY FOR ANIMATION
		setTimeout(function(){
			if(!resumeContent[0].length){
				// AJAX GET HTML
				$.get(url, function(data){
					// SCROLL TO TOP
					setTimeout(function(){
						$('body, html').scrollTop(0);
						$resumeSlideContent.html(data);
						// HIDE LOADING ANIMATION FROM INSIDE WORK SLIDE
						$('#slide').imagesLoaded(function(){
							$body.removeClass('load');
						});
					});
				});
			} else{
				// SCROLL TO TOP
				$('body, html').scrollTop(0);
				// SEE IF CONTENT IS CACHED ALREADY
				$parent.find('.work-content').html(resumeContent[index]);
				// HIDE LOADING ANIMATION FROM INSIDE WORK SLIDE
				$('#slide').imagesLoaded(function(){
					$body.removeClass('load');
				});
			}

		}), 300;

		// ADD HASH
		location.hash = '#resume';

	});

	// PROJECT CLICKS
	$(document).on('click', '.project .logo', function(event){

		// PREVENT CLICK
		event.preventDefault();

		// SHOW LOADING ANIMATION FROM INSIDE WORK SLIDE
		$body.addClass('load');

		// SETUP VARS
		var url = $(this).attr('href');
		var $parent = $(this).parents('.project');
		var index = $parent.index();
		var $workSlide = $('#slide');
		var $workSlideContent = $workSlide.find('.slide-content');
		// CLEAN OUT OLD CONTENT
		$workSlideContent.html('');
		rememberScroll = $parent.offset().top - headerHeight;

		// REMOVE/ADD ACTIVE CLASSES
		$parent.siblings('.active').removeClass('active');
		$parent.addClass('active');

		// OPEN OR CLOSED?
		if(!$parent.hasClass('open')){
			// CHECK FOR CONTENT IN STORAGE FIRST
			if(!workContent[index].length){
				$parent.addClass('load');
				// AJAX GET HTML
				$.get(url, function(data){
					$('body').addClass('slide-active work-active');
					setTimeout(function(){
						$workSlideContent.html(data);
						// HIDE LOADING ANIMATION FROM INSIDE WORK SLIDE
						$('#slide').imagesLoaded(function(){
							$parent.removeClass('load');
							$body.removeClass('load');
						});
					}, 800);
					$('body, html').scrollTop(0);
				});
			} else{
				// SEE IF CONTENT IS CACHED ALREADY
				$parent.find('.work-content').html(workContent[index]);
			}
		} else{
			// NOTHING YET
		}

		// ADD HASH
		location.hash = $parent.attr('data-project');
	});

	// LAZY LOAD IMAGES ON SCROLL ONCE THE WINDOW IS READY
	//$(window).load(function(){
		// LAZY LOAD ON SCROLL
		$(window).scroll(function(){
			// SELECT ALL LAZY IMAGES AND BACKGROUNDS ON PAGE
			$('.lazy, .data-background-image').each(function(){
				// IF PREVIOUS SECTION IS IN SCREEN, LOAD IMAGES IN THIS (THE NEXT) SECTION
				if($(this).parents('section').prev().isOnScreenWithOffset()){
					if($(this).attr('data-lazy-src')){
						// LAZY LOAD CLASS AND IMAGE
						$(this).attr('src', $(this).attr('data-lazy-src')).removeClass('lazy');
					} else{
						// OTHER BACKGROUND IMAGES
						$(this).attr('style', 'background-image: url(images/' + $(this).attr("data-background-image") + ')');
					}
				}
			});
		});
		// LOAD JS INJECT EASTER EGG
		$.get('easter-egg/egg.html', function(data){
			$body.append(data);
		});
	//});
});

// YOUTUBE VIDEO HERO BACKGROUND
// JQUERY FIX
$ = jQuery;

$body = $('body');
$hero = $body.find('#greet-hero');
$player = $hero.find('#player');

playerWidth = $hero.width();
playerHeight = parseInt((playerWidth * 1080) / 1920) + 1;

$player.height(playerHeight);
$player.width(playerWidth);

var tag = document.createElement('script');
var player;

tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '' + playerHeight + '',
		width: '' + playerWidth + '',
		videoId: 'Oy15fCRPJ5U',
		playerVars: {
			'rel': 0,
			'controls': 0,
			'showinfo': 0,
			'autoplay': 1,
			'loop': 1,
			'modestbranding': 1,
			'frameborder': 0,
			'allowfullscreen': 1,
			'vq':'hd1080'
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function resizePlayer(){
	var leftOffset = 0;
	$player = $('#player');
	$player.attr('style', '');
	playerWidth = $hero.width();
	playerHeight = parseInt((playerWidth * 1080) / 1920);
	if(playerHeight < $hero.height()){
		playerHeight = $hero.height();
		playerWidth = (1920 * playerHeight) / 1080;
		leftOffset = ((playerWidth - $hero.width()) / 2) * -1; 
	}
	$player.width(playerWidth);
	$player.height(playerHeight);
	//$player.css('left', leftOffset);
	player.setSize(playerWidth, playerHeight);
}

function onPlayerReady(event){
	resizePlayer();
	player.playVideo();
	
	// MUTE
	player.mute();
	// jQuery('#player-volume').removeClass('unmuted');
}

function onPlayerStateChange(event) {
	if (event.data === YT.PlayerState.PLAYING && $body.hasClass('load')){
		// YOUTUBE VIDEO READY
		$body.removeClass('load');
		// TRIGGER HERO ANIMATIONS
		$('#greet-hero').addClass('active');
	} else if (event.data === YT.PlayerState.ENDED){
		// LOOP VIDEO ENDLESSLY
		player.playVideo(); 
	}
}

/* MINIFIED LIBRARIES */

/* Lettering.js */
!function(a){function b(b,c,d,e){var f=b.text(),g=f.split(c),h="";g.length&&(a(g).each(function(a,b){h+='<span class="'+d+(a+1)+'" aria-hidden="true">'+b+"</span>"+e}),b.attr("aria-label",f).empty().append(h))}var c={init:function(){return this.each(function(){b(a(this),"","char","")})},words:function(){return this.each(function(){b(a(this)," ","word"," ")})},lines:function(){return this.each(function(){var c="eefec303079ad17405c889e092e105b0";b(a(this).children("br").replaceWith(c).end(),c,"line","")})}};a.fn.lettering=function(b){return b&&c[b]?c[b].apply(this,[].slice.call(arguments,1)):"letters"!==b&&b?(a.error("Method "+b+" does not exist on jQuery.lettering"),this):c.init.apply(this,[].slice.call(arguments,0))}}(jQuery);

/*!
* imagesLoaded PACKAGED v4.1.1
* JavaScript is all like "You images are done yet or what?"
* MIT License
*/
!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});