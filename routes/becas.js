var express = require('express');
var router = express.Router();
var becaController = require('../controllers/becaController');

router.get('/:nombre', becaController.getBeca);

router.get('/', becaController.getAllBecas);

router.post('/', becaController.createBeca);

router.post('/put', function(req,res,next) {
    var urlstring = req.body.nombre.toString().split(' ').join('%20');
//    res.render("updating", {title: 'BecaViewer'});
    res.redirect(`/put/${urlstring}`);
});

router.post('/delete', becaController.deleteBeca);

/*router.post('/delete', function(req,res,next){
    var urlstring = req.body.nombre.toString().split(' ').join('%20');
    console.log("Deleting");
//    res.redirect(`/del/${urlstring}`);
});*/

router.put('/:nombre', becaController.updateBeca);

router.delete('/:nombre', becaController.deleteBeca);

module.exports = router;