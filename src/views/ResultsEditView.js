var $ = require('jquery');
var Backbone = require('backbone');
var template = require("../templates/ResultsEdit.hbs");
var events = require('../events');
var Router = require('../router');
var _ = require('underscore');

Backbone.$ = $;


var attributes = {};
attributes.result = [
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 11, 13],
    [9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
];


function make10(shotArray, key) {
    var ret = {};
    for (var i = 0; i < 10; i++) {
        ret[key + (i + 1)] = shotArray[i];
    }
    return ret;
}

function sum10(shotArray) {
    var ret = 0;
    for (var i = 0; i < 10; i++) {
        ret += shotArray[i] | 0;
    }
    return ret;
}

function sumAll(results){ //Todo: use reduce or something!!
  var sum = 0;
  for(var i=0; i<4; i++){
    for(var j=0; j<10; j++){
      sum+=results[i][j] | 0;
    }
  }
  return sum;
}

module.exports = Backbone.View.extend({
    render: function() {
        this.$el.html("");
        for (var i = 0; i < 4; i++) {
            var temp = make10(attributes.result[i], "shot" + (i + 1) + "-");
            var total = sum10(attributes.result[i]);
            this.$el.append(template({
                "name": "Passe " + (i + 1),
                "result": temp,
                "total": total,
                "sumId": "sumId" + (i + 1)
            }));
        }
        this.$bigTotal = $('<span>'+sumAll(attributes.result)+'</span>');
        this.$el.append(this.$bigTotal);
    },

    initialize: function() {
        this.model.on("change", this.render, this);
        this.render();
    },

    events: {
        'keyup .shots': 'update',
        'input .shots': 'update',
    },

    renderSum: function(col) {

        var el = this.$el.find("#sumId" + (col + 1));
        el.html(sum10(attributes.result[col]));
    },

    update: function(event) {
        var id = event.currentTarget.id;
        console.log(event.currentTarget.id + " has value:" + event.currentTarget.valueAsNumber);
        var a = _.map(id.substring(4, id.length).split('-'), function(element) {
            return Number(element) - 1;
        });
        attributes.result[a[0]][a[1]] = event.currentTarget.valueAsNumber;
        this.renderSum(a[0]);
        this.$bigTotal.html('<span>'+sumAll(attributes.result)+'</span>');
    }

});
