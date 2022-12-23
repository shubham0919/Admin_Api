const express = require('express');
const passport = require('passport');

const router = express.Router();

router.use('/admin',require('./admin'))

module.exports = router;