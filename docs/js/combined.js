function onYouTubeIframeAPIReady(){player=new YT.Player("player",{height:""+playerHeight,width:""+playerWidth,videoId:"Oy15fCRPJ5U",playerVars:{rel:0,controls:0,showinfo:0,autoplay:1,loop:1,modestbranding:1,frameborder:0,allowfullscreen:1,vq:"hd1080"},events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}})}function resizePlayer(){var a=0;$player=$("#player"),$player.attr("style",""),playerWidth=$hero.width(),playerHeight=parseInt(1080*playerWidth/1920),playerHeight<$hero.height()&&(playerHeight=$hero.height(),playerWidth=1920*playerHeight/1080,a=(playerWidth-$hero.width())/2*-1),$player.width(playerWidth),$player.height(playerHeight),player.setSize(playerWidth,playerHeight)}function onPlayerReady(a){resizePlayer(),player.playVideo(),player.mute()}function onPlayerStateChange(a){a.data===YT.PlayerState.PLAYING&&$body.hasClass("load")?($body.removeClass("load"),$("#greet-hero").addClass("active")):a.data===YT.PlayerState.ENDED&&player.playVideo()}jQuery(document).ready(function(a){function b(){var b=a("#headshot-frame").find(".slider"),c=b.find(".active");c.next().length?c.removeClass("active").next().addClass("active"):c.removeClass("active").siblings(":first-child").addClass("active")}function c(b){b.removeClass("error").find(".error").removeClass("error"),b.addClass("load").addClass("done").removeClass("success"),b.find(".message").text("");var c=!1,d="";return b.find("input, select, textarea").each(function(){if("email"==a(this).attr("type")){var e=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;e.test(a(this).val())||(c=!0,d="Enter a Valid Email Address")}a(this).val()||(c=!0,b.addClass("error"),a(this).addClass("error"),d="All Fields are Required"),b.find(".message").text(d)}),1==c}var d=a("header").outerHeight(),e=0;WURFL.is_mobile&&a("body").addClass("mobile"),"Tablet"==WURFL.form_factor&&a("body").addClass("tablet"),a.fn.isOnScreenWithOffset=function(b){b||(b=190);var c=a(window),d={top:c.scrollTop(),left:c.scrollLeft()};d.right=d.left+c.width(),d.bottom=d.top+(c.height()-b);var e=this.offset();return e.right=e.left+this.outerWidth(),e.bottom=e.top+b+this.outerHeight(),!(d.right<e.left||d.left>e.right||d.bottom<e.top||d.top>e.bottom)};setInterval(b,3e3);a("#denver .union-text-large").lettering();var f=a("#timeline"),g=f.find(".progress");a(window);f.find("> ul > li").addClass("active"),a(window).scroll(function(){$body.hasClass("mobile")?f.find("> ul > li").addClass("active"):(f.isOnScreenWithOffset()&&f.find("> ul > li").each(function(){if(a(this).isOnScreenWithOffset()?a(this).addClass("active"):a(this).offset().top>a(window).scrollTop()&&a(this).removeClass("active"),a(this).is(":last-child")&&a(this).hasClass("active")&&!a(this).hasClass("last")&&!a(this).hasClass("once")){a(this).addClass("last once");var b=a(this).find(".button");setTimeout(function(){b.addClass("active")},400),setTimeout(function(){b.removeClass("active")},700)}else a(this).removeClass("last");g.height(f.find("li.active").last().position().top+5)}),a("#greet-hero").isOnScreenWithOffset(20)?a("header").removeClass("active"):a("header").addClass("active"))}),$body.imagesLoaded(function(){a("body").addClass("images-loaded");var b=location.hash;if(b)if("#resume"!=b){var c=a(".projects-wrap").find('.project[data-project="'+location.hash.replace("#","")+'"]');a("html, body").animate({scrollTop:c.position().top},600),c.find(".logo").trigger("click")}else{var c=a(".resume-link").trigger("click");a("html, body").animate({scrollTop:0},600),c.trigger("click")}}),a(document).on("click",".scroll",function(b){switch(b.preventDefault(),a(this).attr("data-scroll")){case"#hire-me":a("html, body").animate({scrollTop:a(a(this).attr("data-scroll")).position().top},600);break;case"#origins":a("html, body").animate({scrollTop:a(a(this).attr("data-scroll")).position().top+80},600);break;case"#denver":a("html, body").animate({scrollTop:a(a(this).attr("data-scroll")).position().top-(d+parseInt(a("#hire-me").css("padding-top"))+20)},600);break;default:a("html, body").animate({scrollTop:a(a(this).attr("data-scroll")).position().top-d},600)}(a(this).hasClass("hire-me-trigger")||"#hire-me"==a(this).attr("href"))&&a("#hire-me .frame-wrap").addClass("swap")}),a(document).on("focus","input.error, select.error, textarea.error",function(){a(this).removeClass("error")}),a(document).on("submit","#contact-form",function(b){b.preventDefault();var d=a(this);c(d)||a.ajax({url:"http://formspree.io/geeb@geebart.com",method:"POST",data:d.serialize(),dataType:"json",success:function(){setTimeout(function(){d.removeClass("load").addClass("success").find(".message").text("Success!")},800),setTimeout(function(){d.removeClass("done")},1400)},error:function(){setTimeout(function(){d.addClass("error").removeClass("load").removeClass("success").removeClass("done").find(".message").text("An unknown error occurred. Try again.")},800)}})}),a(document).on("click",".toggle-frame",function(b){a("#hire-me .frame-wrap").toggleClass("swap")});var h=[],i=[];a("#work .project").each(function(){h.push("")}),i.push(""),a(document).on("click","#slide .back",function(b){b.preventDefault(),location.hash="",a("body").removeClass("slide-active work-active resume-active"),a("#greet-hero").addClass("active"),a(".projects-wrap .project.active").length>0&&a("html, body").scrollTop(a(".projects-wrap .project.active").offset().top-d),resizePlayer()}),a(document).on("click",".slide-nav .next a",function(b){b.preventDefault();var c=a(".projects-wrap .project.active"),d=c.next();d.length?d.find(".logo").trigger("click"):c.siblings(".project:first-child").find(".logo").trigger("click")}),a(document).on("click",".slide-nav .prev a",function(b){b.preventDefault();var c=a(".projects-wrap .project.active"),d=c.prev();d.length?d.find(".logo").trigger("click"):c.siblings(".project:last-child").find(".logo").trigger("click")}),a(document).on("click",".resume-link",function(b){b.preventDefault(),$body.addClass("load");var c=a(this).attr("href"),d=a("#slide"),e=d.find(".slide-content");a("body").addClass("slide-active resume-active"),setTimeout(function(){i[0].length?(a("body, html").scrollTop(0),$parent.find(".work-content").html(i[index]),a("#slide").imagesLoaded(function(){$body.removeClass("load")})):a.get(c,function(b){setTimeout(function(){a("body, html").scrollTop(0),e.html(b),a("#slide").imagesLoaded(function(){$body.removeClass("load")})})})}),300,location.hash="#resume"}),a(document).on("click",".project .logo",function(b){b.preventDefault(),$body.addClass("load");var c=a(this).attr("href"),f=a(this).parents(".project"),g=f.index(),i=a("#slide"),j=i.find(".slide-content");j.html(""),e=f.offset().top-d,f.siblings(".active").removeClass("active"),f.addClass("active"),f.hasClass("open")||(h[g].length?f.find(".work-content").html(h[g]):(f.addClass("load"),a.get(c,function(b){a("body").addClass("slide-active work-active"),setTimeout(function(){j.html(b),a("#slide").imagesLoaded(function(){f.removeClass("load"),$body.removeClass("load")})},800),a("body, html").scrollTop(0)}))),location.hash=f.attr("data-project")}),a(window).scroll(function(){a(".lazy, .data-background-image").each(function(){a(this).parents("section").prev().isOnScreenWithOffset()&&(a(this).attr("data-lazy-src")?a(this).attr("src",a(this).attr("data-lazy-src")).removeClass("lazy"):a(this).attr("style","background-image: url(images/"+a(this).attr("data-background-image")+")"))})}),a(window).load(function(){a(window).resize()}),a.get("easter-egg/egg.html",function(a){$body.append(a)})}),$=jQuery,$body=$("body"),$hero=$body.find("#greet-hero"),$player=$hero.find("#player"),playerWidth=$hero.width(),playerHeight=parseInt(1080*playerWidth/1920)+1,$player.height(playerHeight),$player.width(playerWidth);var tag=document.createElement("script"),player;tag.src="//www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag),!function(a){function b(b,c,d,e){var f=b.text(),g=f.split(c),h="";g.length&&(a(g).each(function(a,b){h+='<span class="'+d+(a+1)+'" aria-hidden="true">'+b+"</span>"+e}),b.attr("aria-label",f).empty().append(h))}var c={init:function(){return this.each(function(){b(a(this),"","char","")})},words:function(){return this.each(function(){b(a(this)," ","word"," ")})},lines:function(){return this.each(function(){var c="eefec303079ad17405c889e092e105b0";b(a(this).children("br").replaceWith(c).end(),c,"line","")})}};a.fn.lettering=function(b){return b&&c[b]?c[b].apply(this,[].slice.call(arguments,1)):"letters"!==b&&b?(a.error("Method "+b+" does not exist on jQuery.lettering"),this):c.init.apply(this,[].slice.call(arguments,0))}}(jQuery),!function(a,b){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",b):"object"==typeof module&&module.exports?module.exports=b():a.EvEmitter=b()}("undefined"!=typeof window?window:this,function(){function a(){}var b=a.prototype;return b.on=function(a,b){if(a&&b){var c=this._events=this._events||{},d=c[a]=c[a]||[];return-1==d.indexOf(b)&&d.push(b),this}},b.once=function(a,b){if(a&&b){this.on(a,b);var c=this._onceEvents=this._onceEvents||{},d=c[a]=c[a]||{};return d[b]=!0,this}},b.off=function(a,b){var c=this._events&&this._events[a];if(c&&c.length){var d=c.indexOf(b);return-1!=d&&c.splice(d,1),this}},b.emitEvent=function(a,b){var c=this._events&&this._events[a];if(c&&c.length){var d=0,e=c[d];b=b||[];for(var f=this._onceEvents&&this._onceEvents[a];e;){var g=f&&f[e];g&&(this.off(a,e),delete f[e]),e.apply(this,b),d+=g?0:1,e=c[d]}return this}},a}),function(a,b){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(c){return b(a,c)}):"object"==typeof module&&module.exports?module.exports=b(a,require("ev-emitter")):a.imagesLoaded=b(a,a.EvEmitter)}(window,function(a,b){function c(a,b){for(var c in b)a[c]=b[c];return a}function d(a){var b=[];if(Array.isArray(a))b=a;else if("number"==typeof a.length)for(var c=0;c<a.length;c++)b.push(a[c]);else b.push(a);return b}function e(a,b,f){return this instanceof e?("string"==typeof a&&(a=document.querySelectorAll(a)),this.elements=d(a),this.options=c({},this.options),"function"==typeof b?f=b:c(this.options,b),f&&this.on("always",f),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new e(a,b,f)}function f(a){this.img=a}function g(a,b){this.url=a,this.element=b,this.img=new Image}var h=a.jQuery,i=a.console;e.prototype=Object.create(b.prototype),e.prototype.options={},e.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},e.prototype.addElementImages=function(a){"IMG"==a.nodeName&&this.addImage(a),this.options.background===!0&&this.addElementBackgroundImages(a);var b=a.nodeType;if(b&&j[b]){for(var c=a.querySelectorAll("img"),d=0;d<c.length;d++){var e=c[d];this.addImage(e)}if("string"==typeof this.options.background){var f=a.querySelectorAll(this.options.background);for(d=0;d<f.length;d++){var g=f[d];this.addElementBackgroundImages(g)}}}};var j={1:!0,9:!0,11:!0};return e.prototype.addElementBackgroundImages=function(a){var b=getComputedStyle(a);if(b)for(var c=/url\((['"])?(.*?)\1\)/gi,d=c.exec(b.backgroundImage);null!==d;){var e=d&&d[2];e&&this.addBackground(e,a),d=c.exec(b.backgroundImage)}},e.prototype.addImage=function(a){var b=new f(a);this.images.push(b)},e.prototype.addBackground=function(a,b){var c=new g(a,b);this.images.push(c)},e.prototype.check=function(){function a(a,c,d){setTimeout(function(){b.progress(a,c,d)})}var b=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(b){b.once("progress",a),b.check()}):void this.complete()},e.prototype.progress=function(a,b,c){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!a.isLoaded,this.emitEvent("progress",[this,a,b]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,a),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&i&&i.log("progress: "+c,a,b)},e.prototype.complete=function(){var a=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(a,[this]),this.emitEvent("always",[this]),this.jqDeferred){var b=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[b](this)}},f.prototype=Object.create(b.prototype),f.prototype.check=function(){var a=this.getIsImageComplete();return a?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},f.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},f.prototype.confirm=function(a,b){this.isLoaded=a,this.emitEvent("progress",[this,this.img,b])},f.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},f.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},f.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},f.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},g.prototype=Object.create(f.prototype),g.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var a=this.getIsImageComplete();a&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},g.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},g.prototype.confirm=function(a,b){this.isLoaded=a,this.emitEvent("progress",[this,this.element,b])},e.makeJQueryPlugin=function(b){b=b||a.jQuery,b&&(h=b,h.fn.imagesLoaded=function(a,b){var c=new e(this,a,b);return c.jqDeferred.promise(h(this))})},e.makeJQueryPlugin(),e});