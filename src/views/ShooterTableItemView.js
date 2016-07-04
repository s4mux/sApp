var $                 = require('jquery'),
    Backbone          = require('backbone'),
    template          = require("../templates/ShooterTableItem.hbs"),
    Router            = require("../router");

Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'a',
  className: "list-group-item",
  attributes: {'href': '#'},
  render: function(){
    this.$el.html(template(this.model.attributes));
    return this;
  },
  events: {
    'click': function(event){
      event.preventDefault();
      Router.navigate("shooter/" + this.model.attributes.id, {trigger: true});
    }
  }
});
