const express = require('express');
const passport = require('passport');

const router = express.Router();

const controller = require('../Controllers/Admincontroller');

router.post('/register',controller.register);
router.post('/login',controller.login);
router.get('/logout',passport.authenticate('jwt',{session : false}),controller.logout);
router.get('/view',controller.view);
router.delete('/delete',controller.delete);
router.put('/put',controller.put);

module.exports = router;