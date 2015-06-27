var fs = require('fs');


$(document).on('click', '#upload', function(e){
	e.preventDefault();
	console.log('starting file write');
	var content = $('#content').val(); 
	fs.writeFile('../tmp/upload.txt', content);
	console.log('im done');

});