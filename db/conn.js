const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>console.log('connection succesful'))
.catch(err=>console.log('fail to conncts', err));
    