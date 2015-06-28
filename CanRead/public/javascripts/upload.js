
// $("#file_form").on('submit', function(e){
// 	e.preventDefault();
// 	console.log('starting file write');
// 	// $.ajax({
// 	//   	method: "POST",
// 	//   	url: "",
// 	//   	beforeSend: function (request)
// 	//             {
// 	//                 request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 	//                 request.setRequestHeader("Vnd-HMH-Api-Key", apikey);
// 	//             },
// 	//   	success: function(response) {
// 	//   	console.log("got an access token: " + response.access_token);
// 	//     sif_token = response.access_token;

// 	//   })

var apikey = "685e16af4b72e10a6cf15409ad0d979a";
// });
$(document).ready(function(){
	var form = document.getElementById('file-form'); 
	var fileSelect = document.getElementById('file-select');
	var uploadButton = document.getElementById('upload-button');
	var sif_token = $('#sif_token').attr('value');
	console.log('sif_token', sif_token);
	// form.onsubmit = function(e){
	// 	e.preventDefault();
	// 	uploadButton.innerHTML = 'Uploading...';

	// 	var files = fileSelect.files;
	// 	var formData = new FormData();
	// 	formData.append('file', files);

	// }

	$('#upload-button').click(function(e){
		e.preventDefault();
		console.log('submmitting');
		uploadButton.innerHTML = 'Uploading...';

		var files = fileSelect.files[0];
		console.log(files);
		console.log('hi there');
		console.log(fileSelect.files);
		var formData = new FormData();
		formData.append('file', files);
		console.log(formData);
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
			  	console.log(response.secure_token);
			  	uploadButton.innerHTML = 'Upload';
		  		}
		});
	});

});
