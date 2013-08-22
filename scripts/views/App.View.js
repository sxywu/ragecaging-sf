define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/Game.Model",
	"app/views/Game.View"
], function(
	$,
	_,
	Backbone,
	GameModel,
	GameView
) {
	var i = 0;
	return Backbone.View.extend({
		el: "body",
		initialize: function() {
			this.collection = this.options.collection;
		},
		render: function() {
			console.log(this.collection.models[i]);
			var json = this.collection.models[i].toJSON(),
				model = new GameModel(json);
			this.gameView = new GameView({model: model});
			this.$el.append(this.gameView.render().el);

			i += 1;
		},
		events: {
			"click .forward": "forward"
		},
		forward: function() {
			i = i % this.collection.models.length;
			var json = this.collection.models[i].toJSON();
			this.gameView.model.set(json);

			i += 1;
		}
	});
});