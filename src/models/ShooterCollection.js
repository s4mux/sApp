var Backbone = require("Backbone");
var ShooterModel = require("./ShooterModel");

module.exports = Backbone.Collection.extend({
    model: ShooterModel,
    url: '/shooters',
    comparator: 'firstname',

    find: function(str){
      str = str.toLowerCase();
      return this.filter(function(item){
        var props = ["name", "firstname", "club"]; //TODO: add "group"
        if(str=="") return true; //When no filter is active we want to return the whole array
        for(var i=0; i<props.length; i++){
          var value = item.get(props[i]);
          if(value){
            if(value.toLowerCase().indexOf(str) > -1){
              return true;
            }
          }
        }
        return false;
      });
    },

    setComparator: function(str){
      if(str == "name"){
        this.comparator = "name"
      }
      else if(str == "firstname"){
        this.comparator = "firstname"
      }
      else if(str == "club"){
        this.comparator = "club"
      }
      /*else if(str == "group"){
        this.comparator = "group"
      }*/// TODO group
      else{
        console.log("ShooterCollection:setComparator undefined field!");
      }
      this.sort();

    }
});
