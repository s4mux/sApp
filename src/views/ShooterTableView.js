var $                   = require('jquery');
var _                   = require('underscore');
var Backbone            = require('backbone');
var template            = require("../templates/ShooterTable.hbs");
var ShooterItemView     = require("./ShooterTableItemView");
var events              = require('../events');
var Router              = require('../router');

Backbone.$ = $;


module.exports = Backbone.View.extend({
  //className: "list-group",
  initialize: function () {
    this.collection.on("change reset add remove", this.render, this);
  },
  events: {
    "click a" : "highlight",
    "click #addShooterButton" : "addSchooterClicked"
  },
  addOneItem: function(model){
    var view = new ShooterItemView({model: model});
    this.$el.find('.shooter-items').append(view.render().el);
  },

  render: function () {
    this.$el.html(template({participants: "Schützen", name: "Name", club: "Verein", group: "Gruppe", searchPlaceholder: "Suche..."}));
    _.forEach(this.collection.models, this.addOneItem, this);
    return this;
  },

  highlight: function(event){
      this.$el.find("a").removeClass("active");
      $(event.currentTarget).addClass("active");
  },

  addSchooterClicked: function(event){

    Router.navigate("shooter/new", {trigger: true});
  }
});
