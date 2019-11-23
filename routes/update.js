var express = require('express');
var router = express.Router();
var becaController = require('../controllers/becaController');

/* GET home page. */
router.get('/:nombre', becaController.getForUpdate);

router.post('/', becaController.updateBeca);

module.exports = router;
