var express = require('express');
var router = express.Router();
var becaController = require('../controllers/becaController');

router.get('/:nombre', becaController.getBeca);

router.get('/', becaController.getAllBecas);

router.post('/', becaController.createBeca);

router.put('/:nombre', becaController.updateBeca);

router.delete('/:nombre', becaController.deleteBeca);

module.exports = router;