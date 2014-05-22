;(function($, window, document, undefined) {

	$(document).ready(function() {

		var viewportEl = $('#viewport'),
			sliderEl =$('#slider'),
			placeSlider = function (e) {
				var pageX = e.originalEvent.x || e.originalEvent.touches[0].pageX,
					cssX = 0;

				if (pageX < 50) {
					cssX = 50;
				}
				else if (pageX > (viewportEl.outerWidth() - 50)) {
					cssX = viewportEl.outerWidth() - 50;
				}
				else {
					cssX = pageX;
				}

				sliderEl.css({
					left: cssX
				});
			};


		viewportEl.on('touchstart mousedown', function(e){
			placeSlider(e);

			viewportEl.on('touchmove mousemove', function(e) {

				e.preventDefault();
				e.stopPropagation();

				placeSlider(e);				
			});

			viewportEl.on('touchend mouseup', function() {
				viewportEl.off('touchmove mousemove');
				viewportEl.off('touchend mouseup');
			});

		});

	});

})(jQuery, this, document);