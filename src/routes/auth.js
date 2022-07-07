const express = require('express');
const { register, login } = require('../controllers/auth');
const { validateRegisterRequest, isRequestValidated, validateLoginRequest } = require('../validators/auth');

const router = express.Router();

router.post('/register', validateRegisterRequest, isRequestValidated, register);

router.post('/login', validateLoginRequest, isRequestValidated, login);



module.exports = router;