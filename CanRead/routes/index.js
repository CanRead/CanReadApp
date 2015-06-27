var express = require('express');
var router = express.Router();

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

module.exports = router;
