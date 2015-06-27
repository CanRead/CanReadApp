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
	var content = req.params.content; 
	fs.writeFile('../tmp/upload.txt', content);


})

router.post('/secret', function(req, res){
	sif_token = req.params.sif_token; 
	res.send(sif_token);
}); 

router.get('/secret', function(req, res){
	res.send(sif_token);
})

module.exports = router;
