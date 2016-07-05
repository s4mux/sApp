var $ = require('jquery');
var Backbone = require('backbone');
var template = require("../templates/ResultsEdit.hbs");
var events = require('../events');
var Router = require('../router');

Backbone.$ = $;

module.exports = Backbone.View.extend({
    render: function() {
        var attributes = {};
        attributes.config = {};
        attributes.config = [{
            name: '1. Passe',
            shots: ["shot-1-1", "shot-1-2", "shot-1-3", "shot-1-4", "shot-1-5", "shot-1-6", "shot-1-7", "shot-1-8", "shot-1-9", "shot-1-10"],
            resultId: 'label-passe-1'
        }, {
            name: '2. Passe',
            shots: ["shot-2-1", "shot-2-2", "shot-2-3", "shot-2-4", "shot-2-5", "shot-2-6", "shot-2-7", "shot-2-8", "shot-2-9", "shot-2-10"],
            resultId: 'label-passe-2'
        }, {
            name: '3. Passe',
            shots: ["shot-3-1", "shot-3-2", "shot-3-3", "shot-3-4", "shot-3-5", "shot-3-6", "shot-3-7", "shot-3-8", "shot-3-9", "shot-3-10"],
            resultId: 'label-passe-3'
        }, {
            name: '4. Passe',
            shots: ["shot-4-1", "shot-4-2", "shot-4-3", "shot-4-4", "shot-4-5", "shot-4-6", "shot-4-7", "shot-4-8", "shot-4-9", "shot-4-10"],
            resultId: 'label-passe-4'
        }];

        this.$el.html(template(attributes));
    },
    initialize: function() {
        this.model.on("change", this.render, this);
        this.render();
    }

});
