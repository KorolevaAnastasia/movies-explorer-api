const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/user');
const { validateUpdateUserProfile } = require('../middlewares/validation');

router.get('/me', getUser);
router.patch('/me', validateUpdateUserProfile, updateUser);

module.exports = router;
