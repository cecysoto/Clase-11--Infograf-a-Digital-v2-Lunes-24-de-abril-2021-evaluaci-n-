// Pressure v2.0.3 | Created By Stuart Yamartino | MIT License | 2015 - 2016
!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):e.jQuery__pressure=t(e.jQuery)}(this,function(e){"use strict";function t(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}();if(!e)throw new Error("Pressure jQuery requires jQuery to be loaded.");e.fn.pressure=function(e,t){return a(this,e,t),this},e.pressureConfig=function(e){l.set(e)},e.pressureMap=function(e,t,s,n,i){return f.apply(null,arguments)};var o=function(){function e(t,s,i){n(this,e),this.routeEvents(t,s,i),this.preventSelect(t,i)}return r(e,[{key:"routeEvents",value:function(e,t,s){var n=l.get("only",s);!p||"desktop"!==n&&"mobile"===n?!y||"mobile"!==n&&"desktop"===n?this.adapter=new u(e,t).bindUnsupportedEvent():this.adapter=new c(e,t,s).bindEvents():this.adapter=new h(e,t,s).bindEvents()}},{key:"preventSelect",value:function(e,t){l.get("preventSelect",t)&&(e.style.webkitTouchCallout="none",e.style.webkitUserSelect="none",e.style.khtmlUserSelect="none",e.style.MozUserSelect="none",e.style.msUserSelect="none",e.style.userSelect="none")}}]),e}(),u=function(){function e(t,s,i){n(this,e),this.el=t,this.block=s,this.options=i,this.pressed=!1,this.deepPressed=!1,this.nativeSupport=!1,this.runKey=Math.random()}return r(e,[{key:"setPressed",value:function(e){this.pressed=e}},{key:"setDeepPressed",value:function(e){this.deepPressed=e}},{key:"isPressed",value:function(){return this.pressed}},{key:"isDeepPressed",value:function(){return this.deepPressed}},{key:"add",value:function(e,t){this.el.addEventListener(e,t,!1)}},{key:"runClosure",value:function(e){e in this.block&&this.block[e].apply(this.el,Array.prototype.slice.call(arguments,1))}},{key:"fail",value:function(e,t){l.get("polyfill",this.options)?this.runKey===t&&this.runPolyfill(e):this.runClosure("unsupported",e)}},{key:"bindUnsupportedEvent",value:function(){var e=this;this.add(y?"touchstart":"mousedown",function(t){return e.runClosure("unsupported",t)})}},{key:"_startPress",value:function(e){this.isPressed()===!1&&(this.setPressed(!0),this.runClosure("start",e))}},{key:"_startDeepPress",value:function(e){this.isPressed()&&this.isDeepPressed()===!1&&(this.setDeepPressed(!0),this.runClosure("startDeepPress",e))}},{key:"_changePress",value:function(e,t){this.nativeSupport=!0,this.runClosure("change",e,t)}},{key:"_endDeepPress",value:function(){this.isPressed()&&this.isDeepPressed()&&(this.setDeepPressed(!1),this.runClosure("endDeepPress"))}},{key:"_endPress",value:function(){this.isPressed()&&(this._endDeepPress(),this.setPressed(!1),this.runClosure("end")),this.runKey=Math.random(),this.nativeSupport=!1}},{key:"runPolyfill",value:function(e){this.increment=10/l.get("polyfillSpeed",this.options),this.setPressed(!0),this.runClosure("start",e),this.loopPolyfillForce(0,e)}},{key:"loopPolyfillForce",value:function(e,t){this.isPressed()&&this.nativeSupport===!1&&(this.runClosure("change",e,t),e>=.5?this._startDeepPress(t):this._endDeepPress(),e=e+this.increment>1?1:e+this.increment,setTimeout(this.loopPolyfillForce.bind(this,e,t),10))}}]),e}(),h=function(e){function i(e,s,r){return n(this,i),t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,s,r))}return s(i,e),r(i,[{key:"bindEvents",value:function(){this.add("webkitmouseforcewillbegin",this._startPress.bind(this)),this.add("mousedown",this.support.bind(this)),this.add("webkitmouseforcechanged",this.change.bind(this)),this.add("webkitmouseforcedown",this._startDeepPress.bind(this)),this.add("webkitmouseforceup",this._endDeepPress.bind(this)),this.add("mouseleave",this._endPress.bind(this)),this.add("mouseup",this._endPress.bind(this))}},{key:"support",value:function(e){this.isPressed()===!1&&this.fail(e,this.runKey)}},{key:"change",value:function(e){this.isPressed()&&e.webkitForce>0&&this._changePress(this.normalizeForce(e.webkitForce),e)}},{key:"normalizeForce",value:function(e){return this.reachOne(f(e,1,3,0,1))}},{key:"reachOne",value:function(e){return e>.995?1:e}}]),i}(u),c=function(e){function i(e,s,r){return n(this,i),t(this,(i.__proto__||Object.getPrototypeOf(i)).call(this,e,s,r))}return s(i,e),r(i,[{key:"bindEvents",value:function(){b?(this.add("touchforcechange",this.start.bind(this)),this.add("touchstart",this.supportTest.bind(this,0)),this.add("touchend",this._endPress.bind(this))):(this.add("touchstart",this.startLegacyTest.bind(this)),this.add("touchend",this._endPress.bind(this)))}},{key:"start",value:function(e){e.touches.length>0&&(this._startPress(e),this.touch=this.selectTouch(e),this.touch&&this._changePress(this.touch.force,e))}},{key:"supportTest",value:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.runKey;this.isPressed()===!1&&(e<=6?(e++,setTimeout(this.supportTest.bind(this,e,t,s),10)):this.fail(t,s))}},{key:"startLegacyTest",value:function(e){this.initialForce=e.touches[0].force,this.supportLegacyTest(0,e,this.runKey,this.initialForce)}},{key:"supportLegacyTest",value:function(e,t,s,n){n!==this.initialForce?(this._startPress(t),this.loopForce(t)):e<=6?(e++,setTimeout(this.supportLegacyTest.bind(this,e,t,s,n),10)):this.fail(t,s)}},{key:"loopForce",value:function(e){this.isPressed()&&(this.touch=this.selectTouch(e),setTimeout(this.loopForce.bind(this,e),10),this._changePress(this.touch.force,e))}},{key:"selectTouch",value:function(e){if(1===e.touches.length)return this.returnTouch(e.touches[0],e);for(var t=0;t<e.touches.length;t++)if(e.touches[t].target===this.el)return this.returnTouch(e.touches[t],e)}},{key:"returnTouch",value:function(e,t){return e.force>=.5?this._startDeepPress(t):this._endDeepPress(),e}}]),i}(u),l={polyfill:!0,polyfillSpeed:1e3,preventSelect:!0,only:null,get:function(e,t){return t.hasOwnProperty(e)?t[e]:this[e]},set:function(e){for(var t in e)e.hasOwnProperty(t)&&this.hasOwnProperty(t)&&"get"!=t&&"set"!=t&&(this[t]=e[t])}},a=function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof e||e instanceof String)for(var n=document.querySelectorAll(e),i=0;i<n.length;i++)new o(n[i],t,s);else if(d(e))new o(e,t,s);else for(var i=0;i<e.length;i++)new o(e[i],t,s)},d=function(e){return"object"===("undefined"==typeof HTMLElement?"undefined":i(HTMLElement))?e instanceof HTMLElement:e&&"object"===("undefined"==typeof e?"undefined":i(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName},f=function(e,t,s,n,i){return(e-t)*(i-n)/(s-t)+n},p=!1,y=!1,b=!1;"undefined"!=typeof window&&(y="ontouchstart"in window.document,p=!y,b="ontouchforcechange"in window.document)});

var activeProductImages = [];

var paginate = {

	start: function(event) {
		activeProductImages = $(this).find('img[data-pressure-point]');
	},

	change: function(force, event) {

		$('.force').html(force); // outputs amount of force for development purposes

		activeProductImages.each(function(){
			if(force >= $(this).data('pressure-point')) {
				$(this).addClass('Show');
			}
			else {
				$(this).removeClass('Show');
			}
		});


		if(force >= .3) {

			$(this).children('img:nth-child(2)').addClass('Show');
		}
		else {

			$(this).children('img:nth-child(2)').removeClass('Show');
		}
		if(force == 1) {
			$(this).children('img:last').addClass('Show');
		}
		else {
			$(this).children('img:last').removeClass('Show');
		}


	},


	startDeepPress: function(event) {
		// code to execute when pressure equals or exceeds 50%
	},

	endDeepPress: function() {
		// code to execute when pressure is less than 50%
	},

	end: function() {
		$(this).children('img').not(':first').removeClass('Show');
	},

	unsupported: function() {
		$('.NoSupport').html('3D Touch not supported.');
	}
}

$(document).ready(function(){

	var productImages = $('.pressureImages');
	productImages.each(function(){

		var imgCount = $(this).find('img').length;

		var pressureInterval = 1/(imgCount - 1);	// last pressure point will always be 1, so subtract 1 from the count because we don't want to include it in our interval

		$(this).attr('data-pressure-interval', pressureInterval);

		$(this)
			.find('img')
			.not(':first')
			.each(function(){
				var index = $(this).index();
				var pPoint = index * pressureInterval;
				if($(this).is(':last')){
					$(this).attr('data-pressure-point', 1);
				}
				else {
					$(this).attr('data-pressure-point', pPoint);
				}
			});

	});
    coveranimation();

});

$('.pressureImages').pressure(paginate, {
	preventDefault: true
});

/* ANIMATE COVER */
function coveranimation(){
    var elem0 = $('#cover ul .st0');
    var elem1 = $('#cover ul .st1');
    var elem2 = $('#cover ul .st2');
    var elemlg = $('#cover ul .lg');

    elem0
        .velocity({ left:'1100px'}, { duration: 11000, easing: 'linear' })
        .delay(1)
        .velocity({ left:'0px'}, { duration: 1 });
    elem1
        .velocity({ left:'2200px'}, { duration: 11000, easing: 'linear' })
        .delay(1)
        .velocity({ left:'1100px'}, { duration: 1 });
    elem2
        .velocity({ left:'0px'}, { duration: 11000, easing: 'linear' })
        .delay(1)
        .velocity({ left:'-1100px'}, { duration: 1 });

    coveranimation();
}
