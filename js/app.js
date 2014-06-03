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
			this.setState({
				currentSlide: slide.props.key - 1
			});
		},

		nextSlide: function(slide) {
			this.setState({
				currentSlide: slide.props.key + 1
			});
		},

		onSubtract: function(slide) {
			var newState = $.extend({}, this.state);

			newState.questions[slide.props.key].answer = newState.questions[slide.props.key].answer - 1;

			this.setState(newState);
		},

		onAdd: function(slide) {
			var newState = $.extend({}, this.state);

			newState.questions[slide.props.key].answer = newState.questions[slide.props.key].answer + 1;

			this.setState(newState);						
		},

		getInitialState: function() {
			return {
				questions: [
					{question: 'Q1. Cake or Death?', answer: 0},
					{question: 'Q2. Sorry, we\'re fresh out of that, could I interest you in some Death?', answer: 0},
					{question: 'Q3. Just some other question...', answer: 0}				
				],
				currentSlide: 0,
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
					<Slides
						style={this.state.style}
						questions={this.state.questions}
						currentSlide={this.state.currentSlide}
						previousSlide={this.previousSlide}
						nextSlide={this.nextSlide}
						onAdd={this.onAdd}
						onSubtract={this.onSubtract}>
					</Slides>
				</div>
			);
		}

	});

	var Slides = React.createClass({

		render: function() {
			var me = this,
				key = 0;

			var style = {
				left: -(me.props.currentSlide * me.props.style.width),
				width: me.props.style.width * me.props.questions.length,
				height: me.props.style.height
			}

			var questionsNodes = me.props.questions.map(function(question, i) {
				return (
					<Slide
						key={key++}
						question={question}
						previousSlide={me.props.previousSlide}
						nextSlide={me.props.nextSlide}
						onAdd={me.props.onAdd}
						onSubtract={me.props.onSubtract}
						style={me.props.style}>
					</Slide>
				);
			});

			return (
				<div className="Slides" style={style}>
					{questionsNodes}
				</div>
			);
		}

	});

	var Slide = React.createClass({

		render: function() {
			var me = this,
				key = me.props.key,
				buttons = [];

			if (key > 0) {
				buttons.push(
					<div key="previous" className="previous" onClick={me.props.previousSlide.bind(null, me)} onTouchEnd={me.props.previousSlide.bind(null, me)}>previous</div>
				);
			}

			if (key < (me._owner.props.questions.length - 1)) {
				buttons.push(
					<div key="next" className="next" onClick={me.props.nextSlide.bind(null, me)} onTouchEnd={me.props.nextSlide.bind(null, me)}>next</div>
				);
			}

			return (
				<div className="Slide" style={me.props.style}>
					{me.props.question.question} - {me.props.question.answer}
					<AnswerInput question={me.props.question} onAdd={me.props.onAdd.bind(null, me)} onSubtract={me.props.onSubtract.bind(null, me)} />
					{buttons}
				</div>
			);
		}
	});

	var AnswerInput = React.createClass({
		render: function() {
			return (
				<div className="AnswerInput">
					<a href="#" onClick={this.props.onSubtract}>-</a>
					<input value={this.props.question.answer} readOnly="true" />
					<a href="#" onClick={this.props.onAdd}>+</a>
				</div>
			);
		}
	});

	$(document).ready(function() {

		React.initializeTouchEvents(true);

		React.renderComponent(
			<App />,
			$('#viewport')[0]
		);
		
	});

})(jQuery, this, document);




















	/*
	var Draglet = React.createClass({

		getInitialState: function() {
			return {
				dragging: false,
				rel: {
					x: 0
				},
				pos: {
					x: 0
				}
			}
		},

		render: function() {
			var dragHandler = this.state.dragging ? this.dragHandler : null;

			return (
				<div className="Draglet">
					<div
						className="handle"
						style={{left: this.state.pos.x}}
						onMouseDown={this.dragStart}
						onMouseUp={this.dragEnd}
						onMouseMove={dragHandler}>
					</div>
				</div>
			);
		},

		dragStart: function(e) {
			//if (e.button !== 0) return; // only left mouse button
			var pos = $(this.getDOMNode()).offset();
			this.setState({
				dragging: true,
				rel: {
					x: e.pageX - pos.left // @todo calculate based on Draglet instead of Page
				}
			});

			e.stopPropagation();
			e.preventDefault();
		},

		dragEnd: function(e) {			
			this.setState({dragging: false});

			e.stopPropagation();
			e.preventDefault();
		},

		dragHandler: function(e) {
			//console.log($.extend({}, e));

			if (!this.state.dragging) return;

			this.setState({
				pos: {
					x: e.pageX - this.state.rel.x
				}
			});

			e.stopPropagation();
			e.preventDefault();
		},

	});
	*/