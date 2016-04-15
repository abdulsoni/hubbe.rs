/*
	Photon by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1140px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 320px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 250);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly();

		// Load Contests Data

		var apiContests = '/api/contests';
		var apiExpertise = '/api/expertise/available';

		var fetchContests = function() {
			$.get(apiContests, function(result){
				$.get('/views/app/home/templates.html', function(templates){
					var extTemplate = $(templates).filter('#contests-tpl').html();
					var template = Hogan.compile(extTemplate);
					var rendered = template.render({'contests': result});
					$('.fill-contests').append(rendered);
				});
			});
		};


		var fetchExpertise = function() {
			$.get(apiExpertise, function(result){
				console.log('result for expertise');
				console.log(result);
				$.get('/views/app/home/templates.html', function(templates){
					var extTemplate = $(templates).filter('#expertise-tpl').html();
					var template = Hogan.compile(extTemplate);
					var rendered = template.render({'expertise': result});
					$('.fill-expertise').append(rendered);
				});
			});
		};

		var fetchInvestors = function() {
			var investors = [
				{name: 'Alain Amoretti', country: 'France', image: '1.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eveniet deserunt ad pariatur praesentium, incidunt molestiae beatae quam quasi reiciendis mollitia accusantium voluptate quaerat sequi officia a facere repellat adipisci.'},
				{name: 'Charles d\'anterroches', country: 'France', image: '2.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dignissimos nemo, sequi doloribus accusantium, obcaecati natus iure quam esse ex labore neque consequatur voluptate in, nihil ea, cum recusandae ut.'},
				{name: 'Christophe Brissiaud', country: 'China', image: '3.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo enim officia optio dolorum harum, soluta culpa unde veniam nobis eos, ducimus quod praesentium veritatis atque non nostrum ipsam. Nostrum, et!'},
				{name: 'Jean-Bernard Antoine', country: 'China', image: '4.jpeg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia recusandae aliquid quos aperiam molestiae quibusdam qui eos iure saepe optio vitae fugit unde nam, atque excepturi deserunt est, repellat alias.'},
				{name: 'Xavier Paulin', country: 'Taiwan', image: '5.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'},
				{name: 'Cindy Chung', country: 'Hong Kong', image: '6.jpg', 'bio': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt.'}
			];

			$.get('/views/app/home/templates.html', function(templates){
				var extTemplate = $(templates).filter('#investors-tpl').html();
				var template = Hogan.compile(extTemplate);
				var rendered = template.render({'investors': investors});
				$('.fill-investors').append(rendered);
			});
		}

		fetchContests();
		fetchExpertise();
		fetchInvestors();

		$('.investors-list .carousel').flickity({
  			// options
  			cellAlign: 'left',
  			contain: true
		});
	});

})(jQuery);