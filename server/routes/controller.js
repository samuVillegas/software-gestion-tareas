const User = require('../schema/UserSchema.');

function encript(user, pass) {
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
    return hmac
}


module.exports = {
    registerUser: (req,res)=>{
        const {email,password} = req.body;
        const passEncript = encript(email,password);

        User.findOne({email:email}, function(err,user){
            if(err){
                res.status(500).json({state:0,message:err})
            }else{
                if(!user){
                    const newUser = new User({email:email,password:passEncript});
                    newUser.save();
                    res.status(201).json({state:1,message:newUser})
                }else{
                    res.status(401).json({state:2,message:"User exist"})
                }
            }
            
        })
    },

    getUserLogin: (req,res)=>{
        
        const {email, password} = req.body;
        const passEncript = encript(email,password);

        User.findOne({email:email},function (err,user){
            if(err){
                res.status(500).json({state:0,message:err})
            }else{
                if(user){
                    if(user.password === passEncript) res.status(201).json({state:1,message:"Success"})
                    else res.status(200).json({state:3,message:"Invalid Password"})
                }else{
                    res.status(200).json({state:2,message:"User Not-exist"})
                }
            }
        })
    }
}