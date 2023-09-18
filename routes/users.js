const router = require('express').Router();
const { validateEditUser } = require('../middlewares/validation');

const {
  getMeUser, editUser,
} = require('../controllers/users');

router.get('/me', getMeUser);

router.patch('/me', validateEditUser, editUser);

module.exports = router;
