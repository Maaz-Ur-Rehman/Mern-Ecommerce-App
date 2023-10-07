const express=require('express')
const productController = require('../controllers/productController')

const authMiddleWare=require('../middlewares/authMiddleware')
const upload = require('../middlewares/upload')
const router=express.Router()


router.post("/create-product",authMiddleWare.requireSignIn,authMiddleWare.isAdmin,upload.single( "photo"),productController.createProduct)


router.get("/get-products",authMiddleWare.requireSignIn,authMiddleWare.isAdmin,productController.getAllProduct)


router.get("/get-single-product/:slug",authMiddleWare.requireSignIn,authMiddleWare.isAdmin,productController.getSingleProduct)


// router.get("/get-photo/:id",authMiddleWare.requireSignIn,authMiddleWare.isAdmin,productController.getPhoto)

router.delete("/delete-product/:id",authMiddleWare.requireSignIn,authMiddleWare.isAdmin,productController.DeleteSingleProduct)

router.put("/update-product/:id",authMiddleWare.requireSignIn,authMiddleWare.isAdmin,upload.single('photo'),productController.UpdateSingleProduct)

module.exports=router