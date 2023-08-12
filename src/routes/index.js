const router = require('express').Router();
const talkerRoute = require('./talker');
const loginRoute = require('./login');

router.use('/talker', talkerRoute);
router.use('/login', loginRoute);

module.exports = router;