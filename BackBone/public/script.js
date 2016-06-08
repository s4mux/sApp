Handlebars.registerHelper('getGenderText', function(gender) {
  if( gender==="Male"){
    return "Mänlich"
  }
  else if( gender==="Female"){
    return "Weiblich"
  }
  else{
    return "Bitte Wählen"
  }
});







  var ShooterModel = Backbone.Model.extend({});



  var ShooterCollection = Backbone.Collection.extend({
    model: ShooterModel,
    url: '/shooters'
  });


  var ShooterItemView = Backbone.View.extend({
    tagName: 'tr',
    template: Handlebars.compile('<td>{{this.name}} {{this.firstname}}</td><td>{{this.club}}</td> <td>{{this.group}}</td>'),
    initialize: function(){},
    render: function(){
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    events: {
      'click': function(event){
        /*
          sApp.Views.sIoView.model.clear({silent: true});
          sApp.Views.sIoView.model.set(this.model.attributes);*/
        sApp.Router.navigate("shooter/" + this.model.attributes.id, {trigger: true});
      }
    }
  });

  var ShooterTableView = Backbone.View.extend({
    className: "table table-hover",
    template: Handlebars.compile( $("#shooterTableTemplate").html() ),
    initialize: function () {
      this.collection.on("change reset add remove", this.render, this);
    },
    events: {
      "click tbody>tr" : "highlight",
      "click addShooterButton" : "addSchooterClicked"
    },
    addOneItem: function(model){
      var view = new ShooterItemView({model: model});
      this.$("tbody").append(view.render().el);
    },

    render: function () {
      this.$el.html(this.template({participants: "Schützen", name: "Name", club: "Verein", group: "Gruppe", searchPlaceholder: "Suche..."}));
      _.forEach(this.collection.models, this.addOneItem, this);
      return this;
    },

    highlight: function(event){
        this.$el.find("tr").removeClass("info");
        console.log(event);
        $(event.currentTarget).addClass("info");

    },

    addSchooterClicked: function(event){

    }
  });


  var ShooterIoView = Backbone.View.extend({
    template: Handlebars.compile($("#shooterTemplate").html()),

    render: function(){
      this.$el.html(this.template(this.model.attributes));
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
        alert("there is a Problem with the ShooterIoView gender handler")
      }
    }


  });



  var sApp = new(Backbone.View.extend({
    Models: {},
    Views: {},
    Collections: {},
    Router: new (Backbone.Router.extend({
      routes: {
        "shooter/:id": function(id){
          var model = this.app.Collections.shooters.get(id);
          this.app.Views.sIoView.model.clear({silent: true});
          this.app.Views.sIoView.model.set(model.attributes);
        }
      }
    })),

    start: function(){
      this.Collections.shooters = new ShooterCollection();
      this.Collections.shooters.fetch({success: function(collection, response, options){
       sApp.Router.navigate("shooter/" + collection.at(0).attributes.id, {trigger: true});

      }})
      this.Views.sTableView = new ShooterTableView({
        collection: this.Collections.shooters,
        el: "#shooters-tabe"
      });
      this.Views.sIoView = new ShooterIoView({
        model: new ShooterModel,
        el: "#shooter-io"
      })
      this.Router.app = this;
      Backbone.history.start({pushState: true});
    }
  }

))({el: document.boy});

$(function(){
  sApp.start();
});
