const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Userschema = new Schema({
nombre:{type:String,required:[true,'Nombre obligatorio']},
apellidos:{type:String,required:[true,'Apellido obligatorio']},
correo:{type:String,required:[true,'correo obligatorio']},
constrasena:{type:String,required:[true,'constraseña obligatoria']},
telefono:{type:String,required:[true,'telefono obligatorio']},



})
module.exports = mongoose.model('user',Userschema)
