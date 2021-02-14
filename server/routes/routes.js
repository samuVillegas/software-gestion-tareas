const {Router} = require('express')
const router = Router();
const {
    getUserLogin,
    registerUser,
    registerTask,
    getTasks,
    deleteTask,
    editTast
} = require('./controller');
const {sendEmail} = require('./sendCode')
const {sendImg} = require('./images');

router.post('/login', getUserLogin);
router.post('/registerUser',registerUser);
router.post('/sendCode',sendEmail);
router.post('/sendImg',sendImg);
router.post('/registerTask',registerTask);
router.get('/getTasks/:User',getTasks);
router.delete('/deleteTask/:_id',deleteTask);
router.put('/editTask',editTast);
module.exports = router;