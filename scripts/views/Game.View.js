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
		className: "gameView",
		initialize: function() {
			this.model = this.options.model;
			this.chart = GameChartVisualization();

		},
		render: function() {
			this.chart(this.el, this.model.toJSON());

			return this;
		}
	});
});