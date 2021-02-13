const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/remember-tasks',{
    useUnifiedTopology:true
}).then(db=>console.log(`BD conectada`))
.catch(err => console.error(error))

