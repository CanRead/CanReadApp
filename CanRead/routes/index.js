var express = require('express');
var router = express.Router();
var fs = require('fs');
var sif_token; 
var apikey = "685e16af4b72e10a6cf15409ad0d979a";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/upload', function(req, res){
	res.render('upload_content');
});

router.get('/login_success', function(req, res){
	res.render('login_sucess');
})
router.get('/spritzer', function(req, res){
	res.render('lesson07');
})

router.post('/upload_manual', function(req, res){
	console.log(req.body);
	var content = req.body.contentbody; 
	console.log('content');
	console.log(content);
	fs.writeFile('tmp/upload.txt', content, function(err){
		if (err){
			console.log(err);
		}
		console.log('the file is saved!');
	});
})

router.post('/secret', function(req, res){
	sif_token = req.params.sif_token; 
	res.send(sif_token);
}); 

router.get('/secret', function(req, res){
	fs.readFile('tmp/upload.txt', 'utf8', function(err, datad){
		if (err){
			return console.log(err);
		}
		console.log(datad);
		$.ajax({
		  method: "POST",
		  url: "http://sandbox.api.hmhco.com/v1/documents",
		  data:{'file': datad},
		  beforeSend: function (request)
		            {
		                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		                request.setRequestHeader("Vnd-HMH-Api-Key", apikey);
		                request.setRequestHeader("Authorization", sif_token);
		            },
		  success: function(response) {
		  	console.log(response);
  }
});
	})
	
})


module.exports = router;
