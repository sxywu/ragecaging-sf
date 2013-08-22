define([
	"jquery",
	"underscore",
	"backbone",
	"app/models/Game.Model"
], function(
	$,
	_,
	Backbone,
	GameModel
) {
	return Backbone.Collection.extend({
		model: GameModel
	});
});