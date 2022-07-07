const express = require('express');
const { requireLogin, requesterIsUser } = require('../middlewares/index');
const { getUser, deleteUser,updateUser } = require('../controllers/user');
const router = express.Router();

router.get('/:id', requireLogin, requesterIsUser, getUser);

router.delete('/:id', requireLogin, requesterIsUser, deleteUser);

router.put('/:id', requireLogin, requesterIsUser, updateUser);

module.exports = router;