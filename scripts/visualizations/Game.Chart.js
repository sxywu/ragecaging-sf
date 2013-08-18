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
		chart, betters, players; // this chart instance
	function Chart() {
		/*
		initialize/render chart here.  note that this function is currently only meant to 
		take one selection to create the chart within.  not meant for multiple chart creation at the same time. 

		after creation of chart, creates better and players.
		*/
		function my(selection, data) {
			chart = d3.select(selection)
				.append("svg").classed("chart", true)
				.attr("width", width).attr("height", height);

			betters = chart.append("g")
				.datum(function(d) {
					return d.betters;
				}).classed("betters", true);

				// .enter().call(PlayerComponent)

			players = chart.append("g")
				.datum(function(d) {
					return d.players
				}).classed("players", true);

			console.log(players.selectAll("g.player"));
			// players.selectAll("g.player")
			// 	.enter().call(PlayerComponent);
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

		/*
		getter.
		*/
		my.betters = function() {
			return betters;
		}


		return my;
	}

	return Chart;
});