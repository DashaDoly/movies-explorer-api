const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateSignup } = require('../middlewares/validation');

router.post('/', validateSignup, createUser);

module.exports = router;
