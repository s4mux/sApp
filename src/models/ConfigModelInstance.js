'use strict'

var Backbone = require("Backbone");


var configModel = Backbone.Model.extend({
  urlRoot: '/config'
});

var instance;
module.exports = new function(){
  if(instance === undefined){
    instance = new configModel();
    instance.fetch();
  }
  return instance;
}
