const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:4AIW6bt43UDd8SS3@cluster0.gyjq7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology:true
}).then(db=>console.log(`BD conectada`))
.catch(err => console.error(error))

