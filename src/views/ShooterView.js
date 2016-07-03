var $                   = require('jquery'),
    Backbone            = require('backbone'),
    template            = require("../templates/Shooter.hbs");

Backbone.$ = $;


module.exports = Backbone.View.extend({

  render: function(){
    this.$el.html(template(this.model.attributes));
  },

  initialize: function(){
    this.model.on("change", this.render, this);
    this.render();
  },
});
