const express=require('express')
const registerController = require('../controllers/registerController')

const authMiddleWare=require('../middlewares/authMiddleware')
const router=express.Router()

// <======================SignUp========================>
router.post('/register',registerController.register)
// <======================LogIn========================>
router.post('/login',registerController.login)
// <=================TestApi===========================>
// router.post('/test',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,registerController.testapi)

// <==================Authenticate User================>

router.get('/user-auth',authMiddleWare.requireSignIn,registerController.UserAuthenticate)
router.post('/savenotification',registerController.saveNotification)

router.post('/pushnotification',registerController.pushNotification)
// <==================Authenticate Admin================>

router.get('/admin-auth',authMiddleWare.requireSignIn,authMiddleWare.isAdmin,registerController.AdminAuthenticate)



// <======================ForgotPassword========================>

router.post('/forgot-pass',registerController.forgotPassword)



module.exports=router