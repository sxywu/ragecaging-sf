define([
	"jquery",
	"underscore",
	"backbone",
	"app/visualizations/Player.Component"
], function(
	$,
	_,
	Backbone,
	PlayerComponentVisualization
) {

	var settings = {};
	settings.circleX = 100;
	settings.circleR = 5;
	settings.circlePadding = 5;
	settings.colors = {};
	settings.colors.lost = "#dc322f";
	settings.colors.others = "#859900";

	return Backbone.View.extend({
		initialize: function() {
			this.model = this.options.model;
			this.component = new PlayerComponentVisualization();

			this.model.on("change", _.bind(this.update, this));
		},
		render: function(selection) {
			this.component.data(this.processData());
			this.component(selection);

			// return this.component;
		},
		update: function() {
			this.component.data(this.processData());
			this.component.transition();
		},
		remove: function() {
			this.component.remove();
		},
		/*
		format the data in a way Player.Component can easily digest
		*/
		processData: function() {
			var json = this.model.toJSON(),
				data = {},
				n = 0;

			data.name = json.name;
			data.position = {x: json.x, y: json.y};
			data.circles = [];

			while (n < json.drinks) {
				var circle = {};
				circle.r = settings.circleR;
				circle.cx = (settings.circleR * 2 + settings.circlePadding) * n + settings.circleX;
				circle.cy = -1 * settings.circleR;
				circle.fill = json.lost ? settings.colors.lost : settings.colors.others;

				data.circles.push(circle);

				n += 1;
			}

			return data;
		},
		processBetterData: function() {

		}
	});
});