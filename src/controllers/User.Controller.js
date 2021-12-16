const UserCtrl={}
const User = require('../models/User.models')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

UserCtrl.crear= async(req,res)=>{
    const {nombre,apellidos,correo,constrasena,telefono}=req.body
    const NewUser = new User({
        nombre,
        apellidos,
        correo,
        constrasena,
        telefono
    })
    const correoUser = await User.findOne({correo:correo})
    if(correoUser)
    {
        res.json({
            mensaje: "el correo ya existe"
        })
    }else{
        NewUser.constrasena = await bcrypt.hash(constrasena,10)
        const token = jwt.sign({_id:NewUser._id},"secreto")
        await NewUser.save()

        res.json({
            mensaje: 'Bienvenido',
            id:NewUser._id,
            nombre: NewUser.nombre,
            token
        })
    } 
}

UserCtrl.login = async(req,res) =>{
    const {correo,constrasena}=req.body
    const user =await User.findOne({correo:correo})
    if(!user){
        return res.json({
            mensaje: 'correo incorrecto'
        })
    }

    const match = await bcrypt.compare(constrasena,user.constrasena)
    if(match){
        const token = jwt.sign({_id: user._id},'secreta')
        res.json({
            mensaje:'Bienvenido',
            id:user._id,
            nombre:user.nombre,
            token
        })
       

    }
    else{
        res.json({
            mensaje:'contraseña incorrecta'
        })
    }
}
module.exports = UserCtrl
