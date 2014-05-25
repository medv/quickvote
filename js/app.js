/** @jsx React.DOM */
;(function($, window, document, undefined) {

	var App = React.createClass({

		setSize: function() {
			var me = this,
				$window = $(window);

			me.setState({
				style: {
					width: $window.width(),
					height: $window.height()
				}
			});
		},

		getInitialState: function() {
			return {
				style: {
					width: 0,
					height: 0
				}
			}
		},

		componentWillMount: function() {
			var me = this;

			me.setSize();
			$(window).on('resize', me.setSize());
		},

		render: function() {
			return (
				<div className="App" style={this.state.style}>
					{this.state.style.width} x {this.state.style.height}
				</div>
			);
		}

	});

	$(document).ready(function() {

		React.initializeTouchEvents();

		React.renderComponent(
			<App />,
			document.getElementById('viewport')
		);
		
	});

})(jQuery, this, document);