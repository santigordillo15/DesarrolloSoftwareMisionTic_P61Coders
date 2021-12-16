const mongoose = require('mongoose');
// const url= 'mongodb://localhost:27017/fruver'
const url= 'mongodb+srv://santi1596:1030669458@cluster0.c9vt3.mongodb.net/iservi?retryWrites=true&w=majority'
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.Promise = global.Promise;
mongoose.connect(url,options).then(
    (db)=>console.log('Conectado a mongo',db.connection.name)).catch(err => console.log(err));
module.exports = mongoose