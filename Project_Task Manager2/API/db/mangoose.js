const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(()=>{console.log("connected to MangoDB successfully :)");

}).catch((e)=>{
console.log("Error while attempting to connect to MangoDB");
console.log(e);
});


mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify',false);


module.exports ={
    mongoose
};