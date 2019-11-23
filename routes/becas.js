var express = require('express');
var router = express.Router();
var becaController = require('../controllers/becaController');

router.get('/:nombre', becaController.getBeca);

router.get('/', becaController.getAllBecas);

router.post('/', becaController.createBeca);

router.post('/search', function(req,res,next){
    var urlstring = req.body.nombre.toString().split(' ').join('%20');
    res.redirect(`/search/${urlstring}`);
});

router.post('/put', function(req,res,next) {
    var urlstring = req.body.nombre.toString().split(' ').join('%20');
    res.redirect(`/put/${urlstring}`);
});

router.post('/reload', becaController.getAllBecas);

router.post('/delete', becaController.deleteBeca);

router.put('/:nombre', becaController.updateBeca);

router.delete('/:nombre', becaController.deleteBeca);

module.exports = router;