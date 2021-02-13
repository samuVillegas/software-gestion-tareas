const {Schema,model} = require('mongoose');

const TaskSchema = Schema({
    UrlImg: {type:String,required:true},
    TaskName: {type:String,required:true},
    TaskPriority: {type:String,enum: ['High','Medium','Low'],default:'Low'},
    ExpirationDate: {type:Date,required:true}
});