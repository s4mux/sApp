var $                   = require('jquery');
var _                   = require('underscore');
var Backbone            = require('backbone');
var template            = require("../templates/ResultsEdit.hbs");
var events              = require('../events');
var Router              = require('../router');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  render: function(){
    var attributes = undefined;
    this.$el.html(template(attributes));
  },
  initialize: function(){
    this.model.on("change", this.render, this);
    this.render();
  }

});
