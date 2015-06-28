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
	res.render('upload_content', {sif_token_data: sif_token});
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
	res.redirect('/');
})

router.post('/secret', function(req, res){
	sif_token = req.body.sif_token; 
	console.log('hi there');
	console.log(req.body.sif_token);
	console.log(req.params.sif_token);
	res.send(sif_token);
}); 

router.get('/secret', function(req, res){
	fs.readFile('tmp/upload.txt', 'utf8', function(err, datad){
		if (err){
			return console.log(err);
		}
		console.log(datad);
		
	})
	
})

router.get('/test', function(req, res){
	res.send(sif_token);
})
module.exports = router;
