var $                   = require('jquery');
var _                   = require('underscore');
var Backbone            = require('backbone');
var template            = require("../templates/ShooterTable.hbs");
var ShooterItemView     = require("./ShooterTableItemView");
var events              = require('../events');
var Router              = require('../router');

Backbone.$ = $;

var views = {};
var that;
var textFilter = "";

module.exports = Backbone.View.extend({
  //className: "list-group",
  initialize: function () {
    this.collection.on("change reset add remove", this.render, this);
    events.on('show:shooter', this.highlight);
    that = this;
  },
  events: {
    "click #addShooterButton" : "addSchooterClicked",
    "keyup #tableSearchField" : "filter"
  },
  addOneItem: function(model){
    views[model.id] = new ShooterItemView({model: model});
    this.$el.find('.shooter-items').append(views[model.id].render().el);
  },

  render: function () {
    this.$el.html(template({participants: "Schützen", name: "Name", club: "Verein", group: "Gruppe", search: textFilter, searchPlaceholder: "Suche..."}));
    _.forEach(this.collection.find(textFilter), this.addOneItem, this);
    return this;
  },

  updateList: function(filter){
    textFilter = filter;
    _.forEach(views, function(view){view.remove()});
    _.forEach(this.collection.find(textFilter), this.addOneItem, this);
  },


  highlight: function(id){
      that.$el.find("a").removeClass("active");
      views[id].$el.addClass("active");
  },

  filter: function(event){
    event.preventDefault();
    console.log(event.target.value);
    this.updateList(event.target.value);

  },

  addSchooterClicked: function(event){

    Router.navigate("shooter/new", {trigger: true});
  }
});
