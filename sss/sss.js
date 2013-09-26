/** Super Simple Slider by @intllgnt **/

;(function($, window, document, undefined ) {

$.fn.sss = function(options) {

// Options

	var settings = $.extend({
	'slideshow' : 'true',
	'speed' : 3500,
	'show_nav' : 'true'
	}, options);

// Setup

	this.children().wrapAll('<div class="sss"/>').addClass('ssslide');

// Variables

	var
	slider = $(this).find('.sss'),
	slides = slider.find('.ssslide'),
	slide_count = slides.length,
	target = 0,
	animating = false,
	clicked,
	timer,
	key,
	next,
	prev;

// Reset Slideshow

	var reset_timer = settings.slideshow === 'true' ? function() {
	clearTimeout(timer);
	timer = setTimeout(next_slide, settings.speed);
	} : $.noop;

// Animate Slider

	function get_height(target) {
	return ((slides.eq(target).height() / slider.width()) * 100) + '%';
	}

	function animate_slide(target) {
	if (!animating) {
	animating = true;
	var target_slide = slides.eq(target);

	target_slide.fadeIn();
	slides.not(target_slide).fadeOut();

	slider.animate({paddingBottom: get_height(target)}, function() {
	animating = false;
	});

	reset_timer();

	}};

// Next Slide

	function next_slide() {
	target = target === slide_count - 1 ? 0 : target + 1;
	animate_slide(target);
	}

// Prev Slide

	function prev_slide() {
	target = target === 0 ? slide_count - 1 : target - 1;
	animate_slide(target);
	}

	if (settings.show_nav === 'true' ) {
	slider.append('<div class="sssprev"/>', '<div class="sssnext"/>');
	next = slider.find('.sssnext');
	prev = slider.find('.sssprev');
	}

	return this.each(function() {
	$(window).load(function() {

	slider.css({paddingBottom: get_height(0)}).click(function(e) {
	clicked = $(e.target);
	if (clicked.is(next)) { next_slide() }
	if (clicked.is(prev)) { prev_slide() }
	});

	slides.eq(0).fadeIn();
	reset_timer();

	$(document).keydown(function(e) {
	key = e.keyCode;
	if (key === 39) { next_slide() }
	else if (key === 37) { prev_slide() }
	});

	});
// End

});

};
})(jQuery, window, document);