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
      });

      events.on('edit:shooter', function(id){
        console.log("Event Triggered: edit:shooter " + id);
      });

      events.on('navigate:back', function(){
        console.log("Event Triggered: navigate:back");
      });

      events.on('delete:shooter', function(){
        console.log("Event Triggered: delete:shooter");
      });

      events.on('new:result', function(){
        console.log("Event Triggered: new:result");
      })

      events.on('save:shooter', function(id, attributes){
        console.log("Event triggered: save:shooter " + id + ". Attributes: " + JSON.stringify(attributes));
      });

      events.on('edit:result', function(){
        console.log("Event triggered: edit:result.");
      });

      events.on('exit:edit', function(){
        console.log("Event triggered: exit:edit");
      });

      _instance = events;


    }
    return _instance;
};

module.exports = new SingletonEvent();
