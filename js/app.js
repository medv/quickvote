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

		previousSlide: function(slide) {
			if (slide.props.key > 0) {
				this.setState({
					currentSlide: slide.props.key - 1
				});
			}
		},

		nextSlide: function(slide) {
			console.log(arguments);
			if (slide.props.key < (this.state.questions.length - 1)) {
				this.setState({
					currentSlide: slide.props.key + 1
				});
			}
		},

		getInitialState: function() {
			return {
				questions: [
					'Q1. Cake or Death?',
					'Q2. Sorry, we\'re fresh out of that, could I interest you in some Death?',
					'Q3. Just some other question...'
				],
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
					<Slides style={this.state.style} questions={this.state.questions} currentSlide={this.state.currentSlide} previousSlide={this.previousSlide} nextSlide={this.nextSlide} />
				</div>
			);
		}

	});

	var Slides = React.createClass({

		render: function() {
			var me = this;

			var style = {
				left: -(me.props.currentSlide * me.props.style.width),
				width: me.props.style.width * me.props.questions.length,
				height: me.props.style.height
			}

			var questionNodes = me.props.questions.map(function(question, i) {
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
			var key = this.props.key,
				buttons = [];

			if (key > 0) {
				buttons.push(
					<div key="previous" className="previous" onClick={this.props.previousSlide.bind(null, this)} onTouchStart={this.props.previousSlide.bind(null, this)}>previous</div>
				);
			}

			if (key < (this._owner.props.questions.length - 1)) {
				buttons.push(
					<div key="next" className="next" onClick={this.props.nextSlide.bind(null, this)} onTouchStart={this.props.nextSlide.bind(null, this)}>next</div>
				);
			}

			return (
				<div className="Slide" style={this.props.style}>
					{this.props.question}
					{buttons}
				</div>
			);
		},



	});

	$(document).ready(function() {

		React.initializeTouchEvents(true);

		React.renderComponent(
			<App />,
			document.getElementById('viewport')
		);
		
	});

})(jQuery, this, document);