const {Router} = require('express')
const router = Router();
const {
    getUserLogin,
    registerUser
} = require('./controller');
const {sendEmail} = require('./sendCode')

router.post('/login', getUserLogin);
router.post('/registerUser',registerUser);
router.post('/sendCode',sendEmail);

module.exports = router;