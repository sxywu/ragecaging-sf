define([
	"jquery",
	"underscore",
	"d3"
], function(
	$,
	_,
	d3
) {
	var player;
	function Player() {
		function my(selection, data) {
			player = d3.select(selection)
				.append("g").datum(function(d) {
					console.log(d);
				})
				.classed("player", true);

			player.selectAll("circle")
				.enter().append("circle");
		}
	}

	return Player;
});