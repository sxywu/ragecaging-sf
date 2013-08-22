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
	"app/views/App.View",
	"app/collections/Games.Collection"
], function(
	$,
	_,
	Backbone,
	AppView,
	GamesCollection
) {
	// there are people and games
	var people = [{name: "Chen"}, {name: "Mike"}, {name: "Sylvia"}, {name: "Jon"},
		{name: "Tony"}, {name: "Shirley"}, {name: "Lam"}, {name: "Clang"}, {name: "Bryce"},
		{name: "Yichen"}, {name: "Kenneth"}, {name: "Joanne"}];

	var games = [{
		players: [
			{name: "Chen", drinks: 4, type: "player", lost: false}, 
			{name: "Mike", drinks: 4, type: "player", lost: false}, 
			{name: "Sylvia", drinks: 3, type: "player", lost: false}, 
			{name: "Jon", drinks: 3, lost: false, type: "player"}, 
			{name: "Tony", drinks: 8, lost: true, type: "player"}, 
			{name: "Shirley", drinks: 5, type: "player", lost: false},
		// betters: [
			{name: "Lam", bet: "Jon", drinks: 2, type: "better", lost: false},
			{name: "Clang", bet: "Sylvia", drinks: 2, type: "better", lost: false},
			{name: "Bryce", bet: "Shirley", drinks: 4, type: "better", lost: false},
			{name: "Yichen", bet: "Jon", drinks: 2, type: "better", lost: false},
			{name: "Kenneth", bet: "Jon", drinks: 2, type: "better", lost: false}
		]}, {
		players: [
			{name: "Mike", drinks: 0, type: "player", lost: false},
			{name: "Jon", drinks: 10, type: "player", lost: false},
			{name: "Shirley", drinks: 2, type: "player", lost: false},
			{name: "Tony", drinks: 2, type: "player", lost: false},
			{name: "Sylvia", drinks: 7, type: "player", lost: false},
			{name: "Chen", drinks: 4, lost: true, type: "player"},
		// betters: [
			{name: "Clang", bet: "Jon", drinks: 1, type: "better", lost: false},
			{name: "Lam", bet: "Jon", drinks: 1, type: "better", lost: false},
			{name: "Joanne", bet: "Chen", drinks: 1, type: "better", lost: false},
			{name: "Kenneth", bet: "Shirley", drinks: 1, type: "better", lost: false},
			{name: "Yichen", bet: "Shirley", drinks: 1, type: "better", lost: false}]
		}, {
		players: [
			{name: "Clang", drinks: 6, type: "player", lost: false},
			{name: "Tony", drinks: 3, type: "player", lost: false},
			{name: "Chen", drinks: 1, type: "player", lost: false},
			{name: "Jon", drinks: 4, type: "player", lost: false},
			{name: "Shirley", drinks: 8, lost: true, type: "player"},
			{name: "Sylvia", drinks: 4, type: "player", lost: false},
			{name: "Mike", drinks: 0, type: "player", lost: false},
		// betters: [
			{name: "Bryce", bet: "Clang", drinks: 4, type: "better", lost: false},
			{name: "Lam", bet: "Tony", drinks: 1, type: "better", lost: false},
			{name: "Joanne", bet: "Jon", drinks: 1, type: "better", lost: false},
			{name: "Kenneth", bet: "Tony", drinks: 1, type: "better", lost: false},
			{name: "Yichen", bet: "Tony", drinks: 1, type: "better", lost: false}]
		}, {
		players: [
			{name: "Clang", drinks: 6, type: "player", lost: false},
			{name: "Tony", drinks: 2, type: "player", lost: false},
			{name: "Sylvia", drinks: 1, type: "player", lost: false},
			{name: "Jon", drinks: 6, type: "player", lost: false},
			{name: "Chen", drinks: 3, type: "player", lost: false},
			{name: "Mike", drinks: 3, lost: true, type: "player"},
			{name: "Shirley", drinks: 2, type: "player", lost: false},
		// betters: [
			{name: "Joanne", bet: "Tony", drinks: 1, type: "better", lost: false},
			{name: "Lam", bet: "Jon", drinks: 1, type: "better", lost: false},
			{name: "Kenneth", bet: "Clang", drinks: 2, type: "better", lost: false},
			{name: "Yichen", bet: "Clang", drinks: 1, type: "better", lost: false},
			{name: "Bryce", bet: "Clang", drinks: 4, type: "better", lost: false}]
		}];
	var appView = new AppView({collection: new GamesCollection(games)});
	appView.render();
});