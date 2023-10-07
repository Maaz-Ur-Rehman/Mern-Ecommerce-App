const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleWare = {
  requireSignIn: async (req, res, next) => {
    try {
      const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decode;
    //   console.log(req.user, "user");
      next();
    } catch (err) {
      res.status(409).json({
        msg: "invalid Token",
        err,
      });
    }
},

  isAdmin: async (req, res, next) => {
    try {
      const user =await userModel.findById({_id:req.user._id});
      // console.log(user, "user");
      if (user.role == !1) {
        res.status(401).json({
          msg: "unAuthorized access",
          success: false,
    
        });
        console.log(true,"true chala")
      } else {
        next();
        console.log(false,"false chala")

      }
    } catch (err) {
      res.status(500).json({
        msg: "error in Admin middleware",
        success: false,
      });
    }
},
  


}

module.exports = authMiddleWare;
