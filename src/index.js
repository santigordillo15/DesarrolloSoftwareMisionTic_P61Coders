//requerimos las dependencias necesarias
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
require('./database')


//configuracion del puerto
app.set('Port' , process.env.PORT || 4000);
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors({origin:'*'}))
app.listen(app.get('Port'),()=>{
    console.log("servidor done", app.get('Port'))
})

//llamando el router
app.use('/categoria',require('./routes/categoria.router'));
app.use('/proveedores',require('./routes/proveedores.router'));
app.use('/user',require('./routes/User.route'))