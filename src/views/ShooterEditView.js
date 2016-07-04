var $                   = require('jquery'),
    Backbone            = require('backbone'),
    template            = require("../templates/ShooterEdit.hbs");

Backbone.$ = $;

module.exports = Backbone.View.extend({

  render: function(){
    var attributes = this.model.attributes;
    attributes.isNew = this.model.isNew();
    this.$el.html(template(attributes));
  },

  initialize: function(){
    this.model.on("change", this.render, this);
    this.render();
  },

  events: {
    "click .shooterGender": "gender"
  },

  gender: function(e){
    var t=e.target.innerText;
    if(t==='M'){
      this.model.set({'gender': "Male"})
    }
    else if(t==='W'){
      this.model.set({'gender': "Female"})
    }
    else{
      alert("there is a Problem with the ShooterEditView gender handler")
    }
  }


});
