const express = require('express')
const router = express.Router();
const categoriaController = require('../controllers/categorias.controller');
const Auth = require('../helper/Auth')

//metodo add
router.post('/add',   categoriaController.crearCategorias); //no olvidar poner la verificacion de token, 'Auth.verificarToken,'

//listarxfiltro pero si no se le pasa parametros muestra todos los 'activos'
router.get('/listxfiltro',  categoriaController.listarxvalorbusqueda)

//listarActivos
router.get('/listActivos',  categoriaController.listActivos)

//listarTodo
router.get('/listTodo',  categoriaController.list)

//borrar
router.delete('/borrar',  categoriaController.borrar) 

//update
router.put('/actualizar', categoriaController.actualizar)
module.exports = router;