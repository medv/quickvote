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

		getInitialState: function() {
			return {
				pages: [
					{title: 'Privacy', text: 'This is aaaaaaalll about privacy'},
					{title: 'About', text: 'Some about text'}
				],
				questions: [
					'Q1. Cake or Death?',
					'Q2. Sorry, we\'re fresh out of that, could I interest you in some Death?',
					'Q3. Just some other question...'
				],
				currentSlide: 2,
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
					<Slides style={this.state.style} pages={this.state.pages} questions={this.state.questions} currentSlide={this.state.currentSlide} previousSlide={this.previousSlide} nextSlide={this.nextSlide} />
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
				width: me.props.style.width * (me.props.pages.length + me.props.questions.length),
				height: me.props.style.height
			}

			var pagesNodes = me.props.pages.map(function(page, i) {
				return <Slide key={key++} page={page} previousSlide={me.props.previousSlide} nextSlide={me.props.nextSlide} style={me.props.style} />
			});

			var questionsNodes = me.props.questions.map(function(question, i) {
				return <Slide key={key++} question={question} previousSlide={me.props.previousSlide} nextSlide={me.props.nextSlide} style={me.props.style} />
			});

			return (
				<div className="Slides" style={style}>
					{pagesNodes}
					{questionsNodes}
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
					<div key="previous" className="previous" onClick={this.props.previousSlide.bind(null, this)} onTouchEnd={this.props.previousSlide.bind(null, this)}>previous</div>
				);
			}

			if (key < (this._owner.props.pages.length) + (this._owner.props.questions.length) - 1) {
				buttons.push(
					<div key="next" className="next" onClick={this.props.nextSlide.bind(null, this)} onTouchEnd={this.props.nextSlide.bind(null, this)}>next</div>
				);
			}

			return (
				<div className="Slide" style={this.props.style}>
					{this.props.question}{this.props.page}
					<Draglet />
					{buttons}
				</div>
			);
		}
	});

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
					<div className="handle" style={{left: this.state.pos.x}} onMouseDown={this.dragStart} onMouseUp={this.dragEnd} onMouseMove={dragHandler}></div>
				</div>
			);
		},

		dragStart: function(e) {
			if (e.button !== 0) return; // only left mouse button
			var pos = $(this.getDOMNode()).offset();
			this.setState({
				dragging: true,
				rel: {
					x: e.pageX - pos.left
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
			//console.log($.extend(true, {}, e));

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

	$(document).ready(function() {

		React.initializeTouchEvents(true);

		React.renderComponent(
			<App />,
			document.getElementById('viewport')
		);
		
	});

})(jQuery, this, document);