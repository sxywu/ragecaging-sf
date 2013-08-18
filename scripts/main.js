require.config({
	baseUrl: "scripts/contrib/",
	paths: {
		"app": "..",
		"underscore": "underscore",
		"backbone": "backbone",
		"bootstrap": "bootstrap",
		"d3": "d3.v3"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"d3": {
			exports: "d3"
		}
	}
});

require([
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
	// there are people and games
	var people = [{name: "Chen"}, {name: "Mike"}, {name: "Sylvia"}, {name: "Jon"},
		{name: "Tony"}, {name: "Shirley"}, {name: "Lam"}, {name: "Clang"}, {name: "Bryce"},
		{name: "Yichen"}, {name: "Kenneth"}, {name: "Joanne"}];

	var games = [{
		players: [
			{name: "Chen", drinks: 4}, 
			{name: "Mike", drinks: 4}, 
			{name: "Sylvia", drinks: 3}, 
			{name: "Jon", drinks: 3}, 
			{name: "Tony", drinks: 8, lost: true}, 
			{name: "Shirley", drinks: 5}],
		betters: [
			{name: "Lam", bet: "Jon", drinks: 2},
			{name: "Clang", bet: "Sylvia", drinks: 2},
			{name: "Bryce", bet: "Shirley", drinks: 4},
			{name: "Yichen", bet: "Jon", drinks: 2},
			{name: "Kenneth", bet: "Jon", drinks: 2}
		]}, {
		players: [
			{name: "Mike", drinks: 0},
			{name: "Jon", drinks: 10},
			{name: "Shirley", drinks: 2},
			{name: "Tony", drinks: 2},
			{name: "Sylvia", drinks: 7},
			{name: "Chen", drinks: 4}],
		betters: [
			{name: "Clang", bet: "Jon", drinks: 1},
			{name: "Lam", bet: "Jon", drinks: 1},
			{name: "Joanne", bet: "Chen", drinks: 1},
			{name: "Kenneth", bet: "Shirley", drinks: 1},
			{name: "Yichen", bet: "Shirley", drinks: 1}]
		}, {
		players: [
			{name: "Clang", drinks: 6},
			{name: "Tony", drinks: 3},
			{name: "Chen", drinks: 1},
			{name: "Jon", drinks: 4},
			{name: "Shirley", drinks: 8},
			{name: "Sylvia", drinks: 4},
			{name: "Mike", drinks: 0}],
		betters: [
			{name: "Bryce", bet: "Clang", drinks: 4},
			{name: "Lam", bet: "Tony", drinks: 1},
			{name: "Joanne", bet: "Jon", drinks: 1},
			{name: "Kenneth", bet: "Tony", drinks: 1},
			{name: "Yichen", bet: "Tony", drinks: 1}]
		}, {
		players: [
			{name: "Clang", drinks: 6},
			{name: "Tony", drinks: 2},
			{name: "Sylvia", drinks: 1},
			{name: "Jon", drinks: 6},
			{name: "Chen", drinks: 3},
			{name: "Mike", drinks: 3},
			{name: "Shirley", drinks: 2}],
		betters: [
			{name: "Joanne", bet: "Tony", drinks: 1},
			{name: "Lam", bet: "Jon", drinks: 1},
			{name: "Kenneth", bet: "Clang", drinks: 2},
			{name: "Yichen", bet: "Clang", drinks: 1},
			{name: "Bryce", bet: "Clang", drinks: 4}]
		}];

	var gameModel = new GameModel(games[0]),
		gameView = new GameView({model: gameModel});
	$("body").append(gameView.render().el);
	window.gameView = gameView;
});