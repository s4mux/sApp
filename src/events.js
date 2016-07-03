'use strict';

var $                   = require('jquery');
var Backbone            = require('backbone');
var _                   = require('underscore');
Backbone.$ = $;





var _instance;
var SingletonEvent = function() {
    if (_instance === undefined) {
      var events = {};
      _.extend(events, Backbone.Events);


      events.on('logout', function(data){
        alert(data);
      });

      events.on('show:shooter', function(id){
        console.log("Event Triggered: show:shooter id:" + id);
      })

_instance = events;


    }
    return _instance;
};

module.exports = new SingletonEvent();
