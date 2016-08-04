var $ = require('jquery');
var Backbone = require('backbone');
var template = require("../templates/Results.hbs");
var events = require('../events');
var Router = require('../router');
var _ = require('underscore');


module.exports = Backbone.View.extend({
  render: function(){
    this.$el.html(template({result: "hä"}));
  },

  initialize: function(){
    this.render();
  }
});
