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
	settings.width = 200;

	return Backbone.View.extend({
		initialize: function() {
			this.model = this.options.model;
			this.component = new PlayerComponentVisualization();

			this.model.on("change", _.bind(this.update, this));
		},
		render: function(selection) {
			if (this.model.get("type") === "player") {
				this.component.data(this.processPlayerData());
			} else {
				this.component.data(this.processBetterData());
			}
			this.component(selection);

			// return this.component;
		},
		update: function() {
			if (this.model.get("type") === "player") {
				this.component.data(this.processPlayerData());
			} else {
				this.component.data(this.processBetterData());
			}
			this.component.transition();
		},
		remove: function() {
			this.component.remove();
		},
		/*
		format the data in a way Player.Component can easily digest
		*/
		processPlayerData: function() {
			var json = this.model.toJSON(),
				data = {},
				n = 0;

			data.name = {};
			data.name.name = json.name;
			data.name.x = 0;
			data.name.anchor = "start";

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
			var json = this.model.toJSON(),
				data = {},
				n = 0,
				width = (settings.circleR * 2 + settings.circlePadding) * json.drinks + settings.circleX;

			data.name = {};
			data.name.name = json.name;
			data.name.x = width;
			data.name.anchor = "end";

			data.position = {x: settings.width - width, y: json.y};
			data.circles = [];

			while (n < json.drinks) {
				var circle = {};
				circle.r = settings.circleR;
				circle.cx = (settings.circleR * 2 + settings.circlePadding) * n;
				circle.cy = -1 * settings.circleR;
				circle.fill = json.lost ? settings.colors.lost : settings.colors.others;

				data.circles.push(circle);

				n += 1;
			}

			return data;
		}
	});
});