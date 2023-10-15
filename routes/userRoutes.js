const express=require('express')
const router=express.Router()
const {registerUser,AuthUser,accUser,delUser,addApiKey} = require('../controllers/useraccountsController')
//import route protection middleware
const protect = require('../middleware/authMiddleware')

router.post('/',registerUser)
router.post('/login',AuthUser)
router.get('/myaccount',protect ,accUser)
router.patch('/api-key/:id',protect ,addApiKey)
router.delete('/:id',protect ,delUser)

module.exports=router