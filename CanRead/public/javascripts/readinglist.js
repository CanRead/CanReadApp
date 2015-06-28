var apikey = "685e16af4b72e10a6cf15409ad0d979a";
// });
$(document).ready(function(){
	var sif_token = $('#sif_token').attr('value');
	console.log('sif_token', sif_token);
	// var d = new FormData();
	// d.append('id', '4923ccbd-2a4c-454a-aa49-0d12c1b1d93b');

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
		  	console.log(response);
	  		}
	});
});
