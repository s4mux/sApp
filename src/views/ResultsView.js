var $ = require('jquery');
var Backbone = require('backbone');
var template = require("../templates/Results.hbs");
var events = require('../events');
var Router = require('../router');
var _ = require('underscore');

var config = require('../models/configModelInstance');

function formatData(input){

  if(input){
    var out = {};
    out.res = [];
    out.head = [];
    out.foot = [];
    out.res[0] = [];
    out.res[1] = [];
    out.res[2] = [];
    out.res[3] = [];


    out.head[0] = "Passen"; //Titel left
    for(var i=0; i<10; i++){
      out.head[1+i] = i;
    }
    out.head[11] = "Total";
    var bigTotal = 0;

    for(var i=0; i<4; i++){
      var sum=0;
      out.res[i][0] = (i+1) + ". Passe";
      for(var j=0; j<10; j++){
        out.res[i][1+j] =  input[i][j] || "-";
        sum +=  input[i][j] || 0;
      }
      out.res[i][11] = sum;
      bigTotal += sum;
    }
    out.foot[0] = "Resultat";
    for(var i=1; i<11; i++){
      out.foot[i] = "";
    }
    out.foot[11] = bigTotal;
  }
  return out;
}


module.exports = Backbone.View.extend({
  render: function(){
    var result;
    if(config.attributes.championship){
      if(this.model.attributes.championships){
        result = this.model.attributes.championships[config.attributes.championship];
        if(result){
          result = formatData(result.results);
        }
      }
    }
    console.log(config);
    this.$el.html(template({result: result}));
  },

  initialize: function(){
    config.on("change", this.render, this);
    this.model.on("change", this.render, this);
    this.render();
  }
});
