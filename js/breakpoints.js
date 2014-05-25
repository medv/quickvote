/** @jsx React.DOM */
$(document).ready(function(){

	enquire.register('(max-width: 400px) ', {
		match: function () {
			console.log('[!] mobile');
			<App />
		},
		unmatch: function () {
			console.log('[x] mobile')
		}
	});

	enquire.register('(min-width: 401px) ', {
		match: function () {
			console.log('[!] desktop');
		},
		unmatch: function () {
			console.log('[x] desktop')
		}
	});

});