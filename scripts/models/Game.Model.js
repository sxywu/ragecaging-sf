define([
	"jquery",
	"underscore",
	"backbone",
	"app/collections/Players.Collection"
], function(
	$,
	_,
	Backbone,
	PlayersCollection
) {
	return Backbone.Model.extend({
		initialize: function() {
			this.attributes.players = this.attributes.players || [];

			this.setPlayers();

			this.on("change:players", _.bind(this.setPlayers, this));
		},
		setPlayers: function() {
			if (!this.players) {
				this.players = new PlayersCollection();
			}
			this.players.set(this.get("players"));
			this.players.trigger("update");
		}
	});
});