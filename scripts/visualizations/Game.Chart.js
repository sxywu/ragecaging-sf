define([
	"jquery",
	"underscore",
	"d3",
	"app/visualizations/Player.Component"
], function(
	$,
	_,
	d3,
	PlayerComponent
) {
	var width = 500, 
		height = 500,
		data = {},
		chart, betters, players; // this chart instance
	return function() {
		/*
		initialize/render chart here.  note that this function is currently only meant to 
		take one selection to create the chart within.  not meant for multiple chart creation at the same time.
		this function is only for rendering, and will not manage data.  data management will be left to the Backbone views and models. 

		after creation of chart, creates better and players.  creates axis.
		*/
		function my(selection) {
			chart = d3.select(selection).datum(data)
				.append("svg").classed("chart", true)
				.attr("width", width).attr("height", height);

			betters = chart.append("g").classed("betters", true)
				.datum(function(d) {return d.betters})
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

			players = chart.append("g").classed("players", true)
				.datum(function(d) {return d.players})
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});
		}

		/*
		getter and setters.
		*/
		my.width = function(value) {
			if (!arguments.length) return width;
			width = value;
			return my;
		}

		my.height = function(value) {
			if (!arguments.length) return height;
			height = value;
			return my;
		}

		my.data = function(value) {
			if (!arguments.length) return data;
			data = value;
			return my;
		}

		/*
		getters for the DOM elements wrapped in d3.
		*/
		my.d3 = {};
		my.d3.betters = function() {
			return betters;
		}

		my.d3.players = function() {
			return players;
		}

		/*
		getters for the DOM elements.
		*/
		my.betters = function() {
			return betters[0][0];
		}

		my.players = function() {
			return players[0][0];
		}

		return my;
	}
});