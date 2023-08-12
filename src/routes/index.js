const router = require('express').Router();
const talkerRoute = require('./talker');

router.use('/talker', talkerRoute);

module.exports = router;