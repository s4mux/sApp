var $                   = require('jquery'),
    Backbone            = require('backbone'),
    template            = require("../templates/ShooterEdit.hbs");
var events              = require("../events");
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
    'click .shooterGender': "gender",
    'click #cancel-button': function(event){
      event.preventDefault();
      events.trigger("navigate:back");
    },
    'click #delete-button': function(event){
      event.preventDefault();
      events.trigger('delete:shooter', this.model.id);
    },
    'click #save-button': function(event){
      event.preventDefault();
      var attributes = {};
      attributes.firstname = this.$el.find('#inputFirstName')[0].value;
      attributes.name = this.$el.find('#inputName')[0].value;
      attributes.club = this.$el.find('#inputClub')[0].value;
      attributes.year = this.$el.find('#inputYear')[0].valueAsNumber;
    //TODO gender  attributes.club = this.$el.find('inputClub');
      if(this.model.isNew()){
        events.trigger('save:shooter', 'new', attributes);
      }
      else{
        events.trigger('save:shooter', this.model.id, attributes);
      }
    }
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
