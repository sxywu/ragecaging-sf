define([
	"jquery",
	"underscore",
	"d3"
], function(
	$,
	_,
	d3
) {
	
	return function() {
		var player, data,
			name, circles;
		/*
		render a player.
		*/
		function my(selection) {

			player = d3.select(selection)
				.append("g").datum(data)
				.classed("player", true)
				.attr("transform", function(d) {
					return "translate(" + d.position.x + "," + d.position.y + ")";
				});

			name = player.append("text")
				.attr("text-anchor", "start")
				.text(function(d) {
					return d.name;
				});
			player.selectAll("circle")
				.data(function(d) {
					return d.circles;
				}).enter().append("circle")
				.attr("r", function(d) {return d.r; })
				.attr("cx", function(d) {return d.cx; })
				.attr("cy", function(d) {return d.cy; })
				.attr("fill", function(d) {return d.fill; });


		}

		/*
		remove this component
		*/
		my.remove = function() {
			player.remove();
		}

		/*
		getters and setters.
		*/
		my.data = function(value) {
			if (!arguments.length) return data;
			data = value;
			return my;
		}

		// my.player = function() {
		// 	return this.player[0][0];
		// }
		/*
		transition
		*/
		my.transition = function() {
			player.datum(data).transition()
				.duration(750)
				.attr("transform", function(d) {
					return "translate(" + d.position.x + "," + d.position.y + ")";
				});

			circles = player.selectAll("circle")
				.data(function(d) {
					return d.circles;
				});
			circles.enter().append("circle");
			circles.transition().duration(750)
				.attr("r", function(d) {return d.r; })
				.attr("cx", function(d) {return d.cx; })
				.attr("cy", function(d) {return d.cy; })
				.attr("fill", function(d) {return d.fill; });
			circles.exit().transition().duration(750).remove();

		}

		return my;
	}
});