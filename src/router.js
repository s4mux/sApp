'use strict';

var $                   = require('jquery');
var Backbone            = require('backbone');
var events              = require("./events");
Backbone.$ = $;

var Router = Backbone.Router.extend({
  routes: {
    "shooter/new": function(){
      events.trigger('edit:shooter', 'new');
    },

    "shooter/edit/:id": function(id){
      events.trigger('edit:shooter', id);
    },

    "shooter/:id/editResult": function(id){
      events.trigger("show:shooter", id);
      events.trigger("edit:result");

    },

    "shooter/:id": function(id){
      events.trigger("show:shooter", id);
    }
  }
});

var _instance;

var SingletonRouter = function() {
    if (_instance === undefined) {
        _instance = new Router();
    }
    return _instance;
};

module.exports = new SingletonRouter();
