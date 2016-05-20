
$(document).ready(function(){



    hideEditMenu();
    actualizeShootersList();
   // $('#status').slideUp();
    //  $('#status').slideDown();

//----- Save Button ----------------------------
  $("#save-button").on("click", function(event){
    event.preventDefault()
    console.log($( this ).text() );

    var schuetze = {
      "club": $("#inputClub").val(),
      "firstname": $("#inputFirstName").val(),
      "name": $("#inputName").val(),
      "year": $("#inputYear").val(),
      "cat": $("#inputCat").val(),
      "gender": $("#inputGenderFemale").prop('checked') ? "female" : "male",
      "chees": $("#inputChees").prop('checked')
    };
    console.log("Json: " + JSON.stringify(schuetze));

    $.ajax({
    type: "PUT",
    url: "/shooter",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(schuetze),
    success: function(result){
      $('#status').slideDown(200, function(){
        $('#status').slideUp(200);
      });
    }
});


    //Lastly we toggle the Menu
    hideEditMenu();
    

  });


//----- Edit Button ----------------------------
  $("#edit-button").on("click", function(event){
    event.preventDefault()
    showEditMenu();

  });

//----- Refresh Button ----------------------------
$("#refresh-button").on("click", function(event){
  event.preventDefault()
actualizeShootersList();
});

//----- New Button --------------------------
$("#new-button").on("click", function(event){
  event.preventDefault();
  showEditMenu();
  $("#inputClub").val("");
$("#inputFirstName").val("");
$("#inputName").val("");
$("#inputYear").val("");
$("#inputCat").val("");
$("#inputGenderFemale").prop('checked', false); 
$("#inputGenderFemale").removeClass("active");
$("#inputGenderMale").addClass("active");
$("#inputChees").prop('checked', false); 

});


//----- Cancel Button --------------------------
$("#cancel-button").on('click', function(event){
  event.preventDefault();
  hideEditMenu();
  //Todo get value back and show it..

});

//----- Delete Button --------------------------
$("#delete-button").on('click', function(event){
  event.preventDefault();
  hideEditMenu();
  //Todo remove Data

});



//------ Helper Functions----------------------------
function showEditMenu(){
  //$("#new-button").addClass("hidden");
  $("#edit-button").addClass("hidden");
  $("#save-button").removeClass("hidden");
  $("#cancel-button").removeClass("hidden");
  $("#delete-button").removeClass("hidden");


  $("#inputClub").prop("disabled", false);
$("#inputFirstName").prop("disabled", false);
$("#inputName").prop("disabled", false);
$("#inputYear").prop("disabled", false);
$("#inputCat").prop("disabled", false);
$("#inputGenderFemale").prop("disabled", false);
$("#inputChees").prop("disabled", false);


}

function hideEditMenu(){
  //$("#new-button").removeClass("hidden");
  $("#edit-button").removeClass("hidden");
  $("#save-button").addClass("hidden");
  $("#cancel-button").addClass("hidden");
  $("#delete-button").addClass("hidden");

  $("#inputClub").prop("disabled", true);
$("#inputFirstName").prop("disabled", true);
$("#inputName").prop("disabled", true);
$("#inputYear").prop("disabled", true);
$("#inputCat").prop("disabled", true);
$("#inputGenderFemale").prop("disabled", true);
$("#inputChees").prop("disabled", true);

}


function actualizeShootersList(){
  $.ajax({
    dataType: "json",
    url: "/shooters",
    data: "",
    success: function(result){
      $( "#shooters-tabe tr").remove();
      $("#shooters-tabe").append("<tr><th>Name</th><th>Verein</th><th>Gruppe</th></tr>");
      $('#shooters-tabe tr:last').after("<tr id='"+result.id+"' class='shooters-tabe-row'><td>"+result.firstname +" "+result.name+"</td><td>"+result.club+"</td> <td>Test</td></tr>");
    },
    error: function(resutl){
      alert("Fail");
    }
  });
}

$("#shooters-tabe").on("click", "tr", function(e) {
  $("#shooters-tabe tr").removeClass("info");
  $("#"+this.id).addClass("info");
});


});