var express = require('express');
var router = express.Router();
var fs = require('fs');
var sif_token; 

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
	res.send('{success:true}');
}); 

router.get('/secret', function(req, res){
	fs.writeFile('tmp/upload.txt', "hi", function(err){
		if (err){
			console.log(err);
		}
		console.log('the file is saved!');
	});
}); 

module.exports = router;
