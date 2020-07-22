const express = require('express');
const router = express.Router();


router.post('/upload', require('./controller').uploadHouse);
router.delete('/remove/:title', require('./controller').deleteHouse);
router.get('/', require('./controller').getHouse);
router.put('/update/:id', require('./controller').updateHouse);
router.get('/detail', require('./controller').filterHouse);
router.get('/detail/:id', require('./controller').findHouseById);

module.exports = router;