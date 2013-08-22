define([
	"jquery",
	"underscore",
	"backbone",
	"app/visualizations/Game.Chart",
	"app/views/Player.View"
], function(
	$,
	_,
	Backbone,
	GameChartVisualization,
	PlayerView
) {
	settings = {};
	settings.height = 25;
	/*
	the controller for the data (this.model) and the rendering (this.chart)
	this.model holds 
	*/
	return Backbone.View.extend({
		className: "gameView",
		initialize: function() {
			this.model = this.options.model;
			this.chart = new GameChartVisualization();
			this.views = {};

			this.model.players.on("update", _.bind(this.updatePlayers, this));
			this.model.players.on("add", _.bind(this.addPlayers, this));
			this.model.players.on("remove", _.bind(this.removePlayers, this));

		},
		render: function() {
			this.chart.data(this.processedData());
			this.chart(this.el); // render the chart within this element
			this.renderPlayers();

			return this;
		},
		renderBetters: function() {
			
		},
		renderPlayers: function() {
			var that = this,
				view;
			this.model.players.each(function(model, i) {
				model.set("x", 100);
				model.set("y", i * settings.height);
				that.addPlayers(model);
			});
		},
		addPlayers: function(model) {
			console.log("add");
			var view = new PlayerView({model: model});
			view.render(this.chart.players());

			this.views[model.cid] = view;
		},
		removePlayers: function(model) {
			console.log("remove");
			var view = this.views[model.cid];
			view.remove();

			delete this.views[model.cid];
		},
		updatePlayers: function() {
			console.log("update");
			var view,
				that = this;
			this.model.players.each(function(model, i) {
				model.set("x", 100);
				model.set("y", i * settings.height);
			});
		},
		processedData: function() {
			var data = {};
			data.players = {x: 0, y: 50};
			data.betters = {x: 0, y: 50};
			return data;
		}
	});
});