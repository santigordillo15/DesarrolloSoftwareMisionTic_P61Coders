const categoriasController = {}
const categorias = require('../models/categorias.models')

//metodo crear categorias
categoriasController.crearCategorias = async(req, res, next) =>{
    try {
        //validacion de nombre categoria, que no exista
        const checkNombre = await categorias.findOne({nombre:req.body.nombre});
        
       
        if (!checkNombre ) {
            const registro = await categorias.create(req.body);
            res.status(200).json(registro);
        }else res.status(400).send(
            {message:"categoria ya existe"}) 
        
    } catch (error) {
        res.status(500).send({
            // error,
            message: "ocurrio un error interno" + ": " + error.message
        });
        next(error);
    }
};
//Metodo listar todo, para la tabla crud
categoriasController.list= async (req,res,next)=>{
    try {
        const registros = await categorias.find(
        ).sort({date: -1 });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).send({
            message: "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }

};

//metodo listar categorias con filtro, para usar en la zona de articulos
categoriasController.listarxvalorbusqueda= async (req,res,next)=>{
    try {
        let valorBusqueda= req.headers.filtro; // se le puede poner '.filtro' o cualquier otra cosa(eso va en en 'filtro' = 'lo que se quiera buscar' en postman ),
        const registros = await categorias.find({$and:[

            {$or:[
                {nombre:new RegExp(valorBusqueda,'i')},
                {descripcion:new RegExp(valorBusqueda,'i')}
                 //esta expresion regular encuentra por nombre o rol, y busca coincidencias 'i'=includes//si uno no le pasa valorBusqueda devuelve todo  
            ]},{estado:"Activo"}
        ]}
             ).sort({date: -1 });                   
        res.status(200).json(registros);

        
    } catch (error) {
        res.status(500).send({
            message:  "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }

};

//metodo select solo categorias activas, para usar en la zona de articulos
categoriasController.listActivos= async (req,res,next)=>{
    try {
        const registros = await categorias.find({estado:"Activo"}
        ).sort({date: -1 });
        res.status(200).json(registros);
    } catch (error) {
        res.status(500).send({
            message: "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }

};

//metodo borrar
categoriasController.borrar= async (req,res,next)=>{
    try {
        
        const borrar = await categorias.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(borrar);
    } catch (error) {
        res.status(500).send({
            message: "ocurrio un error interno" + ": " + error.message
            
        });
        next(error);
    }

};
//metodo update
categoriasController.actualizar= async (req,res,next)=>{
    
        try {
            const checkNombre = await categorias.findOne({nombre:req.body.nombre});
            if (!checkNombre ){
                const actualizar = await categorias.updateOne({_id:req.body._id},{
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                estado: req.body.estado                      })
                res.status(200).json(actualizar)
            }else {
                const actualizar = await categorias.updateOne({_id:req.body._id},{
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                estado: req.body.estado})
                res.status(200).json(actualizar)
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
                
            });
            next(error);
        }
       
}




module.exports = categoriasController
