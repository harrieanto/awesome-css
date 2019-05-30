/**
 * Pureawesome.js
 * 
 * @author harrieanto31@yahoo.com
 * @web bandd.web.id
 * 
 * Handle the common ui interactions by pureawesome css
 **/
$(document).ready(function() {
	var menuVisible = false, 
	    keyCodeESC = 27, 
	    mq = window.matchMedia('only screen and (max-width: 45em)');
	
	$.fn.navigationCollapse = function () {
    	// Top menu
      	$('.menu-close-button').click(function(e) {
    		e.preventDefault();
    		!menuVisible ? revealMenu() : hideMenu();
      	});

    	// Listen to ESC, close menu if visible
      	$(document).keyup(function(e) {
    		if (e.keyCode == keyCodeESC) handleESCKey();
      	});
	};
      	
 	$().navigationCollapse();

    //Hide side navigation by clicking `ESC` key
    function handleESCKey() {
    	if (menuVisible) hideMenu();
    }

    //Change navigation state
    function toggleMenuStates() {
    	if(!mq.matches) $('body').toggleClass('scroll');
    	if(mq.matches) $('body').toggleClass('no-scroll');
    	$('.menu-close-button').toggleClass('menu-active');
    }

    //HIde side navigation
    function hideMenu() {
      	$("nav.navigation").removeClass("show");
      	$("nav.navigation").addClass("hidden");
      	$("nav.navigation").removeClass("col-30-percent");
      	$("div.main-content").removeClass("col-70-percent");
      	$("div.main-content").addClass("col-100-percent");
    	menuVisible = false;
    	toggleMenuStates();
    }

    //Reveal side navigation
    function revealMenu() {
      	$("nav.navigation").removeClass("hidden");
      	$("nav.navigation").addClass("col-30-percent");
      	$("nav.navigation").addClass("show");
      	$("nav.navigation > .nav").addClass("show");
      	$("div.main-content").removeClass("col-100-percent");
      	$("div.main-content").addClass("col-70-percent");
    	menuVisible = true;
    	toggleMenuStates();
    }

    /**
     * Slick handler
     * 
     * See @https://kenwheeler.github.io/slick/
     **/
    $('.slider-2').slick({
      infinite: true,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      dots: true,
      cssEase: 'linear'
    });

    /**
     * Slick handler
     * 
     * See @https://kenwheeler.github.io/slick/
     **/
    $('.slider-1').slick({
      infinite: true,
      autoplay: true, 
      autoplaySpeed: 5000, 
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      cssEase: 'linear'
    });

/**
 * Dropdown handler
 * 
 * When the user clicks on the button,
 * toggle between hiding and showing the dropdown content
 **/
$(".dropdown-button").click(function(e) {
	$(e.currentTarget.nextElementSibling).toggle('show');
});
	
$(document).click(function(e) {
	if (!$(e.target).closest('.dropdown').length) {
		$('.dropdown-collapse').hide();
	}
});

$.fn.lazyBackground = function($basePath = "/home/public/images/portfolio/") {
	// Load background images
	$("[data-image]").each(function(i, elem) {
		let $elem = $(elem),
			$target= $basePath + $elem.attr('data-image');
		
		if(/[(http)|(https)]:\/\/(.+)/.test($elem.attr('data-image'))) {
			$target = $elem.attr('data-image');
		}
		
		if ($target == null || $target.length <= 0 ) { return; }
		
		$elem.addClass('image-loading');
		
		$('<img/>').attr('src', $target).load(function() {
			$(this).remove();
			let $container = $('<div class="lazy-bg"/>');
			$container.css( 'background-image', 'url(' + $target + ')');
			$elem.prepend($container);
			$elem.
				removeClass('image-loading').
				addClass('image-ready');
		});
	});
};

$().lazyBackground();
/**
 * Header scrolled up
 * 
 * Show fixed header if the window scrolled up, and
 * hide the header when scrolled down
 **/
$.fn.scrollUp = function() {
	if ($('.header').hasClass('scroll-up')) {
		let scrolledHeader = $('.scroll-up'),
			pos = scrolledHeader.offset();	
		// Hide Header on on scroll down
		var didScroll;
		var lastScrollTop = 0;
		var delta = 5;
		var scrollupHeight = scrolledHeader.outerHeight();
		
		$(window).scroll(function(event){
			didScroll = true;
		});
		
		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);
		
		function removeHeaderProportion($class = 'col-70-percent') {
		  if(scrolledHeader.hasClass($class))
		      scrolledHeader.removeClass($class);
		}

		function addHeaderProportion($class = 'col-70-percent') {
		  scrolledHeader.addClass($class);
		}
		
		function hasScrolled() {
			var st = $(window).scrollTop();
			
			// Make sure they scroll more than delta
			if(Math.abs(lastScrollTop - st) <= delta){
				return;
			}
				
			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > scrollupHeight) {
				// Scroll Down
				removeHeaderProportion();
				removeHeaderProportion('fixed-header');
				addHeaderProportion('header');
			} else {
				// Scroll Up
				if(st > delta && st + $(window).height() < $(document).height()) {
					   removeHeaderProportion('header');
					   addHeaderProportion('fixed-header');

					if (!mq.matches) {
					   if(menuVisible) addHeaderProportion();
					} else {
					   if(menuVisible) addHeaderProportion('header');
					}

					$('nav.navigation > .nav').css({'width': '100%','position': 'relative', 'left': 0, 'right': 0, 'bottom': 0, 'top':0});

                  	$(document).keyup(function(e) {
                		if (e.keyCode == keyCodeESC) removeHeaderProportion();
                  	});
					
					if(st > $(window).height()) {
					   removeHeaderProportion();
					}
				} else {
					// Scroll Down
					removeHeaderProportion();
					$('nav.navigation').css('position', 'relative');
					removeHeaderProportion('fixed-header');
					addHeaderProportion('header');
				}
			}
			lastScrollTop = st;
		}
	}
}

$().scrollUp();

/**
 * Form input transition effect
 * 
 **/
$(".form-input.input-transition").click(function(){
    $input = this;
	// When the user clicks anywhere outside of the modal, close it
	$(window).click(function(e){
	   function hideBy($className) {
	       $($className).removeClass('padding-32');
	       $($className).css('border-bottom', '1px solid  #808080');
	   }
	   
	   if (!(e.target == $input))
	       hideBy($input);
	   
	   if (!$(e.target).closest('.form').length)
	       hideBy('.form-input');
	});

	$($input).addClass('zoom padding-32');
	$($input).css('border-bottom', '1.2px solid rgba(255, 100, 100, 0.8)');
});

/**
 * Model
 * 
 * Handle modal behaviour
 **/
$.fn.modal = function() {
    $('.modal-close-button').click(function(e) {
        $(e.target).closest('.modal').hide();
    });
}
//Call the modal handler
$().modal();

/**
 * Site finder
 * 
 * Handle search container behaviour
 **/
$.fn.finder = function() {
    $('.site-search-open').click(function(e) {
        $site = $(e.currentTarget.nextElementSibling);
        $('.site-search .site-search-close-button').
        addClass('site-search-close-icon-active');
    	if(!$('body').hasClass('no-scroll')) $('body').addClass('no-scroll');
    	$site.fadeIn();
    });

    $('.site-search-close-button').click(function() {
       $('.site-search').fadeOut();
       $('body').removeClass('no-scroll');
    });
}
//Call the site finder
$().finder();

/**
 * Handle general ESC key when clicked by user
 **/
$(document).keyup(function(e) {
    if (e.keyCode == keyCodeESC) {
        $('.modal').hide();
        $('.site-search').fadeOut();
        if($('body').hasClass('no-scroll')) $('body').removeClass('no-scroll');
    }
});

hljs.initHighlightingOnLoad();
});