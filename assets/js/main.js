/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
			$main
				.scrollex({
					mode: 'top',
					enter: function () {
						$nav.addClass('alt');
					},
					leave: function () {
						$nav.removeClass('alt');
					},
				});

			// Links.
			var $nav_a = $nav.find('a');

			$nav_a
				.scrolly({
					speed: 1000,
					offset: function () { return $nav.height(); }
				})
				.on('click', function () {

					var $this = $(this);

					// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

					// Deactivate all links.
					$nav_a
						.removeClass('active')
						.removeClass('active-locked');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

				})
				.each(function () {

					var $this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
					if ($section.length < 1)
						return;

					// Scrollex.
					$section.scrollex({
						mode: 'middle',
						initialize: function () {

							// Deactivate section.
							if (skel.canUse('transition'))
								$section.addClass('inactive');

						},
						enter: function () {

							// Activate section.
							$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
							if ($nav_a.filter('.active-locked').length == 0) {

								$nav_a.removeClass('active');
								$this.addClass('active');

							}

							// Otherwise, if this section's link is the one that's locked, unlock it.
							else if ($this.hasClass('active-locked'))
								$this.removeClass('active-locked');

						}
					});

				});

		}

		// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});


		// Spotlights.
		$('.spotlights')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function () {

					// Deactivate section.
					if (skel.canUse('transition'))
						$(this).addClass('inactive');

				},
				enter: function () {

					// Activate section.
					$(this).removeClass('inactive');

				}
			})
			.each(function () {

				var $this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
				$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
				if (x = $img.data('position'))
					$image.css('background-position', x);

				// Hide <img>.
				$img.hide();

			});

		// Features.
		if (skel.canUse('transition'))
			$('.features')
				.scrollex({
					mode: 'middle',
					top: '-50vh',
					bottom: '-50vh',
					initialize: function () {

						// Deactivate section.
						$(this).addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$(this).removeClass('inactive');

					},
					leave: function () {
						// Deactivate section.
						$(this).addClass('inactive');
					},
				});

		// Counters
		if (skel.canUse('transition'))
			$('.counters')
				.scrollex({
					mode: 'middle',
					top: '-50vh',
					bottom: '-50vh',
					initialize: function () {
						experiencia.innerHTML = 00;
						tutores.innerHTML = 00;
						alumnos.innerHTML = 000;
						horas.innerHTML = 0000;
					},
					enter: function () {
						experiencia.innerHTML = new Date().getFullYear() - 2005;
						tutores.innerHTML = 18;
						alumnos.innerHTML = 678;
						horas.innerHTML = 8869;
					},
					leave: function () {
						experiencia.innerHTML = 00;
						tutores.innerHTML = 00;
						alumnos.innerHTML = 000;
						horas.innerHTML = 0000;
					},
				});

	});

})(jQuery);

$("#slideshow > div:gt(0)").hide();

setInterval(function () {
	$('#slideshow > div:first')
		.fadeOut(0)
		.next()
		.fadeIn(1000)
		.end()
		.appendTo('#slideshow');
}, 3000);
