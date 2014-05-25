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

		previousSlide: function() {
			this.setState({
				currentSlide: this.state.currentSlide - 1
			});
		},

		nextSlide: function() {
			this.setState({
				currentSlide: this.state.currentSlide + 1
			});
		},

		getInitialState: function() {
			return {
				currentSlide: false,
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
					<Slides style={this.state.style} currentSlide={this.state.currentSlide} previousSlide={this.previousSlide} nextSlide={this.nextSlide} />
				</div>
			);
		}

	});

	var Slides = React.createClass({

		// temporary data
		questions: [
			'Q1. Cake or Death?',
			'Q2. Sorry, we\'re fresh out of that, could I interest you in some Death?'
		],

		render: function() {
			var me = this;

			var style = {
				left: -(this.props.currentSlide * this.props.style.width),
				width: this.props.style.width * me.questions.length,
				height: this.props.style.height
			}

			var questionNodes = me.questions.map(function(question, i) {
				return <Slide key={i} question={question} previousSlide={me.props.previousSlide} nextSlide={me.props.nextSlide} style={me.props.style} />
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
				<div className="Slide" style={this.props.style}>
					{this.props.question}
					<div className="previous" onClick={this.props.previousSlide} onTouchStart={this.props.previousSlide}>previous</div>
					<div className="next" onClick={this.props.nextSlide} onTouchStart={this.props.nextSlide}>next</div>
				</div>
			);
		}

	});

	$(document).ready(function() {

		React.initializeTouchEvents(true);

		React.renderComponent(
			<App />,
			document.getElementById('viewport')
		);
		
	});

})(jQuery, this, document);