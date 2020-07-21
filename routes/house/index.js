const express = require('express');
const router = express.Router();


router.post('/upload', require('./controller').uploadHouse);
router.delete('/remove/:title', require('./controller').deleteHouse);
router.get('/', require('./controller').getHouse);
router.put('/update/:id', require('./controller').updateHouse);

module.exports = router;