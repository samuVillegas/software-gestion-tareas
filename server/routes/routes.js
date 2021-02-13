const {Router} = require('express')
const router = Router();
//const {} = require('./controller');

router.get('/',(req,res)=>{
    res.send('Hola mundo!')
});

module.exports = router;