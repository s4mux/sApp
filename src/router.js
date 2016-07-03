'use strict';

var $                   = require('jquery');
var Backbone            = require('backbone');
var ShooterCollection   = require("./models/ShooterCollection")
var ShooterModel        = require("./models/ShooterModel");
var ShooterTableView    = require("./views/ShooterTableView");
var events              = require("./events");
Backbone.$ = $;

var Router = Backbone.Router.extend({
  routes: {
    "shooter/:id": function(id){
      //var model = ShooterCollection.getSingletonInstance.get(id);
      //var ioView = SingletonIoView();
      //ioView.model.clear({silent: true});
      //ioView.model.set(model.attributes);
      events.trigger("show:shooter", id);
    },
    "new": function(){
      alert("new");
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
