const express=require('express')
const categoryController = require('../controllers/categoryController')

const authMiddleWare=require('../middlewares/authMiddleware')
const router=express.Router()

router.post('/create-category',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,categoryController.createCategory)
router.put('/update-category/:id',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,categoryController.upadateCategory)
router.get('/get-all-category',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,categoryController.getAllCategory)
router.get('/get-single-category/:slug',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,categoryController.getSingleCategory)
router.delete('/delete-single-category/:id',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,categoryController.DeleteCategory)

module.exports=router
