/** @jsx React.DOM */
;(function($, window, document, undefined) {

	/**
	 *
	 */
	var App = React.createClass({

		// LIFETIME HOOKS
		getInitialState: function() {
			return {
				slides: [
					{type: 'question', title: 'Nuclear power?', answer: 0},			
					{type: 'question', title: 'Auckland roads?', answer: 0},
					{type: 'question', title: 'Offshore drilling?', answer: 0},

					{type: 'results', title: 'Results', content: 'Lets see now...'}
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
			var me = this;

			return (
				<div className="App" style={me.state.style}>
					<Slides
						slides={me.state.slides}
						currentSlide={me.state.currentSlide}
						style={me.state.style}

						previousSlide={me.previousSlide}
						nextSlide={me.nextSlide}
						onAdd={me.onAdd}
						onSubtract={me.onSubtract}>
					</Slides>
				</div>
			);
		},

		// EVENTS
		onSubtract: function(slide) {
			var newState = $.extend({}, this.state),
				questionKey = slide.props.key,
				newAnswer = newState.slides[questionKey].answer - 1,
				answer = newAnswer < -2 ? -2 : newAnswer; // cap at -2

			newState.slides[questionKey].answer = answer;
			this.setState(newState, this.onAnswer(questionKey, answer));
		},

		onAdd: function(slide) {
			var newState = $.extend({}, this.state),
				questionKey = slide.props.key,
				newAnswer = newState.slides[questionKey].answer + 1,
				answer = newAnswer > 2 ? 2 : newAnswer; // cap at +2

			newState.slides[questionKey].answer = answer;
			this.setState(newState, this.onAnswer(questionKey, answer));					
		},

		onAnswer: function(question, answer) {
			console.log('http://localhost:8080/answer/' + question + '/' + answer)
		},

		// METHODS
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

	});










	/**
	 *
	 */
	var Slides = React.createClass({

		render: function() {
			var me = this,
				style,
				slideNodes;

			style = {
				left: -(me.props.currentSlide * me.props.style.width), // offset Slides to show current Slide
				width: me.props.style.width * me.props.slides.length,
				height: me.props.style.height
			}

			slideNodes = me.props.slides.map(function(slide, i) {
				return (
					<Slide
						key={i}
						slide={slide}
						style={me.props.style}

						previousSlide={me.props.previousSlide}
						nextSlide={me.props.nextSlide}
						onAdd={me.props.onAdd}
						onSubtract={me.props.onSubtract}
					></Slide>
				);
			});

			return (
				<div className="Slides" style={style}>
					{slideNodes}
				</div>
			);
		}

	});










	/**
	 *
	 */
	var Slide = React.createClass({

		getButtons: function() {
			var me = this,
				key = me.props.key,
				buttons = [];

			if (key > 0) {
				buttons.push(
					<div key="previous" className="previous" onClick={me.props.previousSlide.bind(null, me)} onTouchEnd={me.props.previousSlide.bind(null, me)}>previous</div>
				);
			}

			if (key < (me._owner.props.slides.length - 1)) {
				buttons.push(
					<div key="next" className="next" onClick={me.props.nextSlide.bind(null, me)} onTouchEnd={me.props.nextSlide.bind(null, me)}>next</div>
				);
			}

			return buttons;
		},

		render: function() {
			var me = this,
				slide = me.props.slide,
				contentNode,
				answerInputNode,
				buttons;

			if (typeof slide.answer !== 'undefined') {
				var answer = slide.answer,
					answerString;

				answerString = 'You are indifferent';
				if (answer == -2) {
					answerString = 'You strongly disagree';
				}
				else if (answer == -1) {
					answerString = 'You lean towards disagreeing';
				}
				else if (answer == 2) {
					answerString = 'You strongly agree';
				}
				else if (answer == 1) {
					answerString = 'You lean towards agreeing';
				}

				contentNode = <p>{answerString}</p>;
				answerInputNode = <AnswerInput question={slide} onAdd={me.props.onAdd.bind(null, me)} onSubtract={me.props.onSubtract.bind(null, me)} />;
			}
			else {
				var score,
					resultsNodes,
					verdict;

				score = 0;
				resultsNodes = me._owner.props.slides.map(function(slide, i) {
						if (slide.type === 'question') {
							score = score + slide.answer;
							return <li key={i}>{slide.title} <span className="results-answer">{slide.answer}</span></li>
						}
					});

				verdict = 'Congratulations. You don\'t give a shit';
				if (score < -4) {
					verdict = 'Some trees need huggin\'';
				}
				else if (score < 0) {
					verdict = 'Down with the man.';
				}
				else if (score > 4) {
					verdict = 'Yeah well... that\'s like, your opinion, man.';
				}
				else if (score > 0) {
					verdict = 'Cool story bro.';
				}

				contentNode = (
					<div>
						{slide.content}
						<ul>{resultsNodes}</ul>
						<p>You scored {score}. {verdict}</p>
					</div>
				);
			}

			buttons = me.getButtons();

			return (
				<div className="Slide" style={me.props.style}>
					<h2>{me.props.slide.title}</h2>
					{contentNode}
					{answerInputNode}
					{buttons}
				</div>
			);
		}

	});










	/**
	 *
	 */
	var AnswerInput = React.createClass({
		render: function() {
			var answer,
				subtractVisibility,
				addVisibility;

			answer = this.props.question.answer;
			subtractVisibility = answer > -2 ? 'visible' : 'hidden';
			addVisibility = answer < 2 ? 'visible' : 'hidden';

			return (
				<div className="AnswerInput">
					<a href="#" style={{visibility: subtractVisibility}} onClick={this.props.onSubtract}>-</a>
					<input value={this.props.question.answer} readOnly="true" />
					<a href="#" style={{visibility: addVisibility}} onClick={this.props.onAdd}>+</a>
				</div>
			);
		}
	});










	/**
	 *
	 */
	$(document).ready(function() {

		React.initializeTouchEvents(true);

		React.renderComponent(
			<App />,
			$('#viewport')[0]
		);
		
	});

})(jQuery, this, document);