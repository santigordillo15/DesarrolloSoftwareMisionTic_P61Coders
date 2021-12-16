const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proveedoresSchema = new Schema({
    categoria: {type:Schema.ObjectId  ,  ref:'categorias', required:[true, 'categoria obligatorio']},
    cedula:{
        type: Number,
        required: [true, 'obligatorio'],
        minlength:5, maxlength:20,

    },
    foto: {
        type: String,
        required: [true, 'obligatorio'],
        unique: true
    },
    
    nombre:{
        type: String,
        required: [true, 'obligatorio'],
        minlength:10,
        maxlength: 30,
        unique: true, 
        uppercase: true,
        description: 'poner min un nombre y los dos apellidos'

    },
    profesion:{
        type: String,
        required: [true, 'obligatorio'],
        maxlength: 20,

    },
    descripcion:{
        type: String,
        required: [true, 'obligatorio, palabras claves'],
        maxlength: 40,
        description: 'coloque palabras claves'

    },

    calificacion:{
        type: mongoose.Decimal128,
        required: [true, 'obligatorio'],
        min:0, max:5,
        default: 5

    },
    precioxhora:{
        type: Number,
        min:10000,
        description: 'Si APLICA, precio x hora, en pesos colombianos'

    },
    celular:{
        type: Number,
        minlength:10 ,
        trim:true,
        unique:true,
        required:[true, 'obligatorio'],
    },
    correo:{
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
        lowercase:true,
        unique:true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']

    },

    password:{
        type:String,
        required:[true,'password obligatorio'], maxlength: 100, minlength:8
    },

    ciudad:{
        type:String,
        required:true,
        enum:["Bogota"],
        default:"Bogota"
    },
    experiencia:{
        type:Number,
        required:[true,"experiencia en años obligatoria"],
        min:0,
        max:20
        
    },

    rol:{
        type:String,
        required:true,
        enum:["proveedor", "otro"],
        default:"proveedor"
    },

    estado: {
        type: String,
        required: [true, 'obligatorio'],
        default: "Activo",
        enum:["Activo", "Inactivo"]  
    },
    
    createdAt:{
        type:Date,
        default: Date.now
    }


}
)

module.exports = mongoose.model('proveedores',proveedoresSchema)