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
			$(window).on('resize', me.setSize);
		},

		render: function() {
			return (
				<div className="App" style={this.state.style}>
					<Slides style={this.state.style} />
				</div>
			);
		}

	});

	var Slides = React.createClass({

		render: function() {
			var me = this;

			// temporary data
			var questions = [
				'Q1. Cake or Death?',
				'Q2. Sorry, we\'re fresh out of that, could I interest you in some Death?'
			];

			var style = {
				width: this.props.style.width * questions.length,
				height: this.props.style.height
			}

			var questionNodes = questions.map(function(question) {
				return <Slide question={question} style={me.props.style} />
			});

			return (
				<div className="Slides" style={style}>
					{questionNodes}
				</div>
			);
		}

	});

	var Slide = React.createClass({

		render: function() {
			return (
				<div className="Slide" style={this.props.style}>{this.props.question}</div>
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