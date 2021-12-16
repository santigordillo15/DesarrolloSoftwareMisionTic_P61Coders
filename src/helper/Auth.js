const Auth= {} //crear un objeto
const jwt = require('jsonwebtoken')

Auth.verificarToken = (req,res, next )=>{
    if(!req.headers.autorizacion){ //se puede usar cualquier palabra en ves de ".autorizacion, eso va en el postman"
        return res.status(400).json({
            mensaje: "no estas autorizado"
        })
    }else if(req.headers.autorizacion===null){
        return res.status(400).json({
            mensaje: "no estas autorizado"
        })

    }else if(req.headers.autorizacion){
        jwt.verify(req.headers.autorizacion, 'frasesecreta', (error, resultado)=>{
            if(error){
                return res.status(400).json({
                    mensaje: "no estas autorizado"
                })
            } next();
       
        })
    }


}

module.exports = Auth
