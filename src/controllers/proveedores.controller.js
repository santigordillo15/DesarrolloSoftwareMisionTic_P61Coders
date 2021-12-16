const proveedoresController = {}
const proveedores = require('../models/proveedores.models')

//metodo crear proveedores
proveedoresController.crearProveedor = async(req, res, next) =>{
    try {
        //validacion de cedula, que no exista
        const checkCedula = await proveedores.findOne({cedula:req.body.cedula});
       
        if (!checkCedula ) {
            const registro = await proveedores.create(req.body);
            res.status(200).json(registro);
        }else res.status(400).send(
            {message:"proveedor ya existe"}) 
        
    } catch (error) {
        res.status(500).send({
            // error,
            message: "ocurrio un error interno" + ": " + error.message
        });
        next(error);
    }
};

//Metodo listar todo, para la tabla crud
proveedoresController.list= async (req,res,next)=>{
    try {
        const registros = await proveedores.find(
        ).sort({date: -1 }).populate('categoria' ,{nombre:1,estado:1,codigo:1});
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).send({
            message: "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }
};

//metodo listar proveedores con filtro, para usar en la zona de articulos
proveedoresController.listarxvalorbusqueda= async (req,res,next)=>{
    try {
        let valorBusqueda= req.headers.filtro; // se le puede poner '.filtro' o cualquier otra cosa(eso va en en 'filtro' = 'lo que se quiera buscar' en postman ),
        const registros = await proveedores.find({$and:[

            {$or:[
                {profesion:new RegExp(valorBusqueda,'i')},
                {descripcion:new RegExp(valorBusqueda,'i')}
                 //esta expresion regular encuentra por nombre o rol, y busca coincidencias 'i'=includes//si uno no le pasa valorBusqueda devuelve todo  
            ]},{estado:"Activo"}
        ]}
             ).sort({date: -1 }).populate('categoria' ,{nombre:1,estado:1,codigo:1});                   
        res.status(200).json(registros);

        
    } catch (error) {
        res.status(500).send({
            message:  "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }

};
//metodo borrar
proveedoresController.borrar= async (req,res,next)=>{
    try {
        
        const borrar = await proveedores.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(borrar);
    } catch (error) {
        res.status(500).send({
            message: "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }

};
//metodo update
proveedoresController.actualizar= async (req,res,next)=>{
    
        try {
            const check = await proveedores.findOne({celular:req.body.celular});
            if (!check ){
                const actualizar = await proveedores.updateOne({_id:req.body._id},{
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                estado: req.body.estado,
                celular: req.body.celular,
                calificacion: req.body.calificacion,
                precioxhora: req.body.precioxhora                      })
                res.status(200).json(actualizar)
            }else {
                const actualizar = await proveedores.updateOne({_id:req.body._id},{
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                estado: req.body.estado,
                calificacion: req.body.calificacion,
                precioxhora: req.body.precioxhora  })
                res.status(200).json(actualizar)
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
                
            });
            next(error);
        }
       
}




module.exports = proveedoresController