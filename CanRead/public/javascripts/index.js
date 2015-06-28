var apikey = "685e16af4b72e10a6cf15409ad0d979a";
var sif_token;

$("#login").on('click', function(e){
	e.preventDefault();
	// console.log("thats a login");	
	var username = $("#username").val();
	var password = $("#password").val();
	
	//create login request
	$.ajax({
    method: "POST",
    url: "http://sandbox.api.hmhco.com/v1/sample_token?client_id=f9bc92ff-5cae-48c9-a73b-96ebb0df0534.hmhco.com&grant_type=password&username=" + username + "&password=" + password,
    beforeSend: function (request)
              {
                  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                  request.setRequestHeader("Vnd-HMH-Api-Key", apikey);
              },
    success: function(response) {
    	// console.log("got an access token: " + response.access_token);
      sif_token = response.access_token;
      
      $("#loginPage").hide();
      $("#spritzPage").show();
      $('#upload').show();
      // for getting list of uploaded documents
  $.ajax({
      method: "GET",
      url: "http://sandbox.api.hmhco.com/v1/documents/",
      processData: false, 
      // data: {id: '4923ccbd-2a4c-454a-aa49-0d12c1b1d93b'},
      beforeSend: function (request)
                {
                    request.setRequestHeader("Vnd-HMH-Api-Key", apikey);
                    request.setRequestHeader("Authorization", sif_token);
                },
      success: function(response) {

        $('#documents').append("<h1>Your Current Documents</h1>");
        jQuery.each(response, function(){
           $('#documents').append("<a href='#' class='doc' value='"+this.file.url+"'><h3>"+this.original_filename+"</h3></a>");
        })
        }
  });

  }
});
})

$(document).ready(function(){
  var form = document.getElementById('file-form'); 
  var fileSelect = document.getElementById('file-select');
  var uploadButton = document.getElementById('upload-button');
  // var sif_token = $('#sif_token').attr('value');
  // console.log('sif_token', sif_token);

  //for uploading documents
  $('#upload-button').click(function(e){
    e.preventDefault();
    console.log('submmitting');
    uploadButton.innerHTML = 'Uploading...';

    var files = fileSelect.files[0];
    // console.log(files);
    // console.log('hi there');
    // console.log(fileSelect.files);
    var formData = new FormData();
    formData.append('file', files);
    // console.log(formData);
    $.ajax({
        method: "POST",
        url: "http://sandbox.api.hmhco.com/v1/documents",
        processData: false, 
        contentType: false,
        data: formData, 
        beforeSend: function (request)
                  {
                      request.setRequestHeader("Vnd-HMH-Api-Key", apikey);
                      request.setRequestHeader("Authorization", sif_token);
                  },
        success: function(response) {
          console.log(response);
          console.log('here in first response');
          console.log(response.secure_token);
          uploadButton.innerHTML = 'Upload';
          var tokenup = response.secure_token;
          

          }
    });
  });

});

$(document).on('click', '.doc', function(e){
  e.preventDefault();
  a = $(this);
  console.log($(this));
  console.log($(this).attr('value'));
  $.ajax
})

$(document).on('click', '#refresh', function(e){
  e.preventDefault();
  $('#documents').empty();
  $.ajax({
      method: "GET",
      url: "http://sandbox.api.hmhco.com/v1/documents/",
      processData: false, 
      // data: {id: '4923ccbd-2a4c-454a-aa49-0d12c1b1d93b'},
      beforeSend: function (request)
                {
                    request.setRequestHeader("Vnd-HMH-Api-Key", apikey);
                    request.setRequestHeader("Authorization", sif_token);
                },
      success: function(response) {

        $('#documents').append("<h1>Your Current Documents</h1>");
        jQuery.each(response, function(){
           $('#documents').append("<a href='#' class='doc' value='"+this.file.url+"'><h3>"+this.original_filename+"</h3></a>");
        })
        }
  });
})
