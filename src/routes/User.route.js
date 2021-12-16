const {Router}= require('express')
const router = Router()
const UserCtrl = require('../controllers/User.Controller')


router.post('/crear',UserCtrl.crear)
router.post('/login',UserCtrl.login)
module.exports = router
