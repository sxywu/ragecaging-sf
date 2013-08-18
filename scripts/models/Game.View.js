define([
	"jquery",
	"underscore",
	"backbone",
	"app/visualizations/Game.Chart"
], function(
	$,
	_,
	Backbone,
	GameChartVisualization
) {
	return Backbone.View.extend({
		initialize: function() {
			this.chart = GameChartVisualization();
		},
		render: function() {

		}
	});
});