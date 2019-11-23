var express = require('express');
var router = express.Router();
var becaController = require('../controllers/becaController');

/* GET home page. */
router.get('/:nombre', becaController.getForUpdate);

router.post('/:nombre', becaController.updateBeca);

router.post('/cancel', function(req,res,next){
    return res.redirect('becas');
})

module.exports = router;
