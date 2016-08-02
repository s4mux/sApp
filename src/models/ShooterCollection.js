var Backbone = require("Backbone");
var ShooterModel = require("./ShooterModel");

module.exports = Backbone.Collection.extend({
    model: ShooterModel,
    url: '/shooters',
    comparator: 'firstname'
});
