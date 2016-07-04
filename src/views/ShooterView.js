var $                   = require('jquery');
var Backbone            = require('backbone');
var template            = require("../templates/Shooter.hbs");
var Router              = require("../router");

Backbone.$ = $;


module.exports = Backbone.View.extend({

  render: function(){
    this.$el.html(template(this.model.attributes));
  },

  initialize: function(){
    this.model.on("change", this.render, this);
    this.render();
  },

  events: {
    'click #cancel-button': function(event){
      Router.navigate("shooter/edit/" + this.model.attributes.id, {trigger: true});
    }

  }
});
