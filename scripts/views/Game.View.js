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
		getPlayersBetters: function() {
			var that = this,
				betters = this.model.players.chain()
					.filter(function(player) {
						return player.get("type") === "better";
					}).groupBy(function(player) {
						return player.get("bet");
					}).value(),
				players = this.model.players.chain()
					.filter(function(player) {
						return player.get("type") === "player";
					}).value(),
				loser = _.find(players, function(player) {
					return player.get("lost");
				});

			console.log(betters, players);
			// set how many betters there are on a player
			_.each(betters, function(val, bet) {
				var player = _.find(players, function(player) {
						return player.get("name") === bet;
					});
				player.set("betters", val.length);
			});
			return {betters: betters, players: players, loser: loser};
		},
		renderPlayers: function() {
			var playersbetters = this.getPlayersBetters(),
				betters = playersbetters.betters,
				players = playersbetters.players,
				loser = playersbetters.loser,
				that = this;

			// _.each(_.flatten(betters), function(model, i) {
			// 	model.set("x", 0);
			// 	model.set("y", i * settings.height);
			// 	if (loser.get("name") !== model.get("name")) {
			// 		model.set("lost", true);
			// 	}
			// 	that.addPlayers(model);
			// });

			var height = 0;
			_.each(players, function(player, i) {
				player.set("x", 200);
				player.set("y", height);

				_.each(betters[player.get("name")], function(better, i) {
					better.set("x", 0);
					better.set("y", height + i * settings.height);

					if (loser.get("name") !== better.get("bet")) {
						better.set("lost", true);
					} else {
						better.set("lost", false);
					}
					that.addPlayers(better);
				});

				that.addPlayers(player);

				height += settings.height * (player.get("betters") === 0 ? 1 : player.get("betters"));
			});
		},
		addPlayers: function(model) {
			var view = new PlayerView({model: model});
			view.render(this.chart.players());

			this.views[model.cid] = view;
		},
		removePlayers: function(model) {
			var view = this.views[model.cid];
			view.remove();

			delete this.views[model.cid];
		},
		updatePlayers: function() {
			var playersbetters = this.getPlayersBetters(),
				betters = playersbetters.betters,
				players = playersbetters.players,
				loser = playersbetters.loser,
				that = this,
				height = 0;

			_.each(players, function(player, i) {
				player.set("x", 200);
				player.set("y", height);

				console.log(player.get("name"), betters[player.get("name")]);
				_.each(betters[player.get("name")], function(better, i) {
					better.set("x", 0);
					better.set("y", height + i * settings.height);

					if (loser.get("name") !== better.get("bet")) {
						better.set("lost", true);
					} else {
						better.set("lost", false);
					}
				});

				height += settings.height * (player.get("betters") === 0 ? 1 : player.get("betters"));
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