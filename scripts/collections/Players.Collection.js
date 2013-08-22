define([
  "jquery",
  "underscore",
  "backbone",
  "app/models/Player.Model"
], function(
  $,
  _,
  Backbone,
  PlayerModel
) {
  return Backbone.Collection.extend({
    model: PlayerModel
  });
});