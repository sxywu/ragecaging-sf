define([
	"jquery",
	"underscore",
	"backbone"
], function(
	$,
	_,
	Backbone
) {
	return Backbone.Model.extend({
		initialize: function() {
			this.id = this.get("name");
		}
	});
});