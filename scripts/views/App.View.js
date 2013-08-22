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
		},
		events: {
			"click .forward": "forward",
			"click .back": "backward"
		},
		forward: function() {
			i += 1;
			i = i % this.collection.models.length;
			var json = this.collection.models[i].toJSON();
			this.gameView.model.set(json);

			this.$(".number").text(i + 1);
		},
		backward: function() {
			if (i > 0) {
				i -= 1;
				i = i % this.collection.models.length;
				var json = this.collection.models[i].toJSON();
				this.gameView.model.set(json);

				this.$(".number").text(i + 1);
			}
		}
	});
});