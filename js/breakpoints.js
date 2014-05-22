$(document).ready(function(){

	enquire.register('(max-width: 400px) ', {
		match: function () {
			console.log('[!] mobile');
		},
		unmatch: function () {
			console.log('[x] mobile')
		}
	});

	enquire.register('(min-width: 401px) and (max-width: 1000px) ', {
		match: function () {
			console.log('[!] tablet');
		},
		unmatch: function () {
			console.log('[x] tablet')
		}
	});

	enquire.register('(min-width: 1001px) and (max-width: 1600px) ', {
		match: function () {
			console.log('[!] desktop');
		},
		unmatch: function () {
			console.log('[x] desktop')
		}
	}, true); // default rule to match on incapable browsers

	enquire.register('(min-width: 1601px)', {
		match: function () {
			console.log('[!] hd');
		},
		unmatch: function () {
			console.log('[x] hd')
		}
	});

});