const User = require('../schema/UserSchema.');
const Task = require('../schema/TaskSchema');

function encript(user, pass) {
    var crypto = require('crypto')
    var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
    return hmac
}


module.exports = {
    registerUser: (req,res)=>{
        try{
            const {email,password} = req.body;
        const passEncript = encript(email,password);

        User.findOne({email:email}, async function (err,user){
            if(err){
                res.status(500).json({state:0,message:err})
            }else{
                if(!user){
                    const newUser = new User({email:email,password:passEncript});
                    await newUser.save();
                    res.status(201).json({state:1,message:newUser})
                }else{
                    res.status(200).json({state:2,message:"User exist"})
                }
            }
            
        })
        }catch(e){
            res.status(500).json({state:0,message:err})
        }
        
    },

    getUserLogin: (req,res)=>{

        try{
            const {email, password} = req.body;
        const passEncript = encript(email,password);

        User.findOne({email:email},function (err,user){
            if(err){
                res.status(500).json({state:0,message:err})
            }else{
                if(user){
                    if(user.password === passEncript) res.status(201).json({state:1,message:user})
                    else res.status(200).json({state:3,message:"Invalid Password"})
                }else{
                    res.status(200).json({state:2,message:"User Not-exist"})
                }
            }
        })
        }catch(e){
            res.status(500).json({state:0,message:err});
        }
        
    },
    registerTask: async(req,res)=>{
        try{
            const {UrlImg,TaskName,TaskPriority,ExpirationDate,User} = req.body;
            const newTask = new Task({UrlImg,TaskName,TaskPriority,ExpirationDate,User});
            await newTask.save();
            res.status(201).json({state:1,message:newTask})

        }catch(err){
            console.log(err);
            res.status(500).json({state:0,message:err});
        }
    },
    getTasks: async (req,res)=>{
        try{
            const {User} = req.params;
            const High = await Task.find({User,TaskPriority:'High'}).sort({ExpirationDate: +1});
            const Medium = await Task.find({User,TaskPriority:'Medium'}).sort({ExpirationDate: +1});
            const Low = await Task.find({User,TaskPriority:'Low'}).sort({ExpirationDate: +1});
            const result = [...High,...Medium,...Low];
            res.send(result);
        }catch(e){
            res.send(e);
        }
    },
    deleteTask: async (req,res)=>{
        try{
            const {_id} = req.params;
            await Task.deleteOne({_id:_id});
            res.status(201).json({state:1,message:'Delete Task'})
        }catch(err){
            res.status(500).json({state:0,message:err});
        }
    },
    editTast: async(req,res)=>{
        try{    
            console.log(req.body);
            console.log(req.params._id);
            await Task.findByIdAndUpdate(req.params._id,{$set:req.body});
            res.status(201).json({state:1,message:'Update Task'})
        }catch(err){
            console.log(err);
            res.status(500).json({state:0,message:err});
        }
    }
}