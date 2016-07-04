var $                   = require('jquery');
var Backbone            = require('backbone');
var ShooterView         = require("./views/ShooterView");
var ShooterTableView    = require("./views/ShooterTableView");
var ShooterEditView     = require("./views/ShooterEditView");
var ShooterCollection = require("./models/ShooterCollection");
var ShooterModel = require("./models/ShooterModel")
var Router = require("./router");
var events = require('./events')
Backbone.$ = $;

var HandlebarsR = require("hbsfy/runtime");
HandlebarsR.registerHelper('getGenderText', function(gender) {
  if( gender==="Male"){
    return "Männlich"
  }
  else if( gender==="Female"){
    return "Weiblich"
  }
  else{
    return "Bitte Wählen"
  }
});


var ioView;
var sCollection;
var sTableView;
var editView;


var lastModelIdBeforeEdit=0;
events.on('show:shooter', function(id){
  var model = sCollection.get(id);

  ioView.model.clear({silent: true});
  ioView.model.set(model.attributes);

});

events.on('edit:shooter', function(id){
  lastModelIdBeforeEdit = ioView.model.attributes.id;
  if(id === 'new'){
    editView = new ShooterEditView({
      model: new ShooterModel(),
      el: '#shooter-edit'
    });
  }
  else{
    editView = new ShooterEditView({
      model: sCollection.get(id),
      el: '#shooter-edit'
    });
  }
});

events.on('navigate:back', function(){
  Router.navigate("shooter/"+lastModelIdBeforeEdit, {trigger: true});
});


$(function(){
  sCollection = new ShooterCollection();
  sCollection.fetch({success: function(collection, response, options){
   /*sApp.Router.navigate("shooter/" + collection.at(0).attributes.id, {trigger: true});*/

 }});

 sTableView = new ShooterTableView({
   collection: sCollection,
   el: "#shooters-tabe"
 });

  ioView = new ShooterView({
    model: new ShooterModel(),
    el: "#shooter-io"
  });

  Backbone.history.start(/*{pushState: true}*/);
  //Router.navigate("shooter/1", {trigger: true});
});
