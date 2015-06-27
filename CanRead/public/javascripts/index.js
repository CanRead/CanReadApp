var apikey = "685e16af4b72e10a6cf15409ad0d979a";
var sif_token;

$("#login").on('click', function(e){
	e.preventDefault();
	console.log("thats a login");	
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
  	console.log("got an access token: " + response.access_token);
    sif_token = response.access_token;

  }
});
})




