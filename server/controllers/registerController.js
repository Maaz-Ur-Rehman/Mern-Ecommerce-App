const authHelpers = require("../helpers/authHelpers");
const userModel = require("../models/userModel");
const JWT = require("jsonwebtoken");
const admin = require("firebase-admin");
const serviceAccount = require("../fcmnotification.json");
const tokenModel = require("../models/tokenModel");
const cron = require("node-cron");
const { default: axios } = require("axios");
const registerController = {
  register: async (req, res) => {
    // console.log(req.body.googleAccessToken,"token")
    if (req.body.googleAccessToken) {
      const { googleAccessToken } = req.body;

      axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        })
        .then(async (response) => {
          const data = {
            firstName: response.data.given_name,
            lastName: response.data.family_name,
            email: response.data.email,
            profilePicture: response.data.picture,
          };

          // console.log(data, "data");

          const existingUser = await userModel.findOne({ email: data.email });

          if (existingUser) {
            return res.status(409).json({
              msg: "User Already Exists",
              success: false,
            });
          }

          const user = await userModel.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            profilePicture: data.profilePicture,
          });

          return res.status(200).json({
            msg: "User successfully signed up",
            success: true,
            user,
          });
        })
        .catch((err) => {
          res.status(500).json({
            msg: err.message,
            message: "Invalid token",
            success: false,
          });
        });
    } 
    else {
      try {
        // const { name, email, password, phone, address, role, answer } =req.body;
        const { firstName, lastName, email, password } = req.body;
        // console.log(req.body);

        // if (!name || !email || !password || !phone || !address || !answer) {
        //   res.status(409).json({
        //     msg: "all fields are required",
        //   });
        // }

        const existinguser = await userModel.findOne({ email: email });
        if (existinguser) {
          res.status(409).json({
            msg: "email already exists plz login",
            status: false,
          });
        } else {
          const hashedPassword = await authHelpers.hashPassword(password);

          const user = await new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            // phone: phone,
            // address: address,
            // answer: answer,
          }).save();

          res.status(200).json({
            msg: "User Successfull register",
            user,
            status: true,
          });
        }
      } catch (err) {
        res.status(500).json({
          msg: "Error in registration",
          err,
          status: false,
        });
      }
    }
  },
  login: async (req, res) => {
    if (req.body.googleAccessToken) {
      const { googleAccessToken } = req.body;

      axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
        })
        .then(async (response) => {
          const data = {
            email: response.data.email,
          };
          const existUser = await userModel.findOne({ email: data.email });

          if (!existUser) {
            return userNotFoundResponse(res); // Handle user not found scenario
          }

          const token = JWT.sign(
            { _id: existUser._id, email: existUser.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "3h",
            }
          );

          return sendSuccessResponse(
            res,
            "User successfully login",
            existUser,
            token,
            
            
          );
        })
        .catch((err) => {
          return res.status(500).json({
            msg: err.message,
            message: "Invalid token",
            success:false
          });
        });

      // Define separate functions to handle responses
      function userNotFoundResponse(res) {
        return res.status(409).json({
          msg: "Email does not exist",
          success:false
        });
      }

      function sendSuccessResponse(res, msg, existUser, token) {
        return res.status(200).json({
          msg,
          existUser,
          token,
          success:true
        });
      }
    } else {
      const { email, password } = req.body;
      try {
        if (!email || !password) {
          res.status(404).json({
            status: false,
            msg: "fields are required",
          });
        } else {
          const user = await userModel.findOne({ email: email });
          if (!user) {
            res.status(404).json({
              success: false,

              msg: "Email is not exist",
            });
          } else {
            const match = await authHelpers.comparePassword(
              password,
              user.password
            );
            // console.log(match, "match");
            if (!match) {
              res.status(404).json({
                success: false,

                msg: "invalid password",
              });
            } else {
              const token = JWT.sign(
                { _id: user._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: "3h",
                }
              );

              res.status(200).json({
                msg: "user Successfull Login",
                user,
                success: true,
                token,
              });
            }
          }
        }
      } catch (err) {
        res.status(500).json({
          msg: "error in login",
          err: err.messege,
        });
      }
    }
  },

  // testapi:async(req,res)=>{

  //   res.send("valid token")

  // },




  UserAuthenticate: async (req, res) => {
    try {
      res.status(200).json({
        ok: true,
        msg: "Authenticate User",
      });
    } catch (err) {
      console.log(err);
    }
  },

  AdminAuthenticate: async (req, res) => {
    try {
      res.status(200).json({
        ok: true,
        msg: "Authenticate Admin",
      });
    } catch (err) {
      console.log(err);
    }
  },
  forgotPassword: async (req, res) => {
    const { email, answer, newPassword } = req.body;

    // console.log(req.body);
    try {
      if (!email || !answer || !newPassword) {
        res.status(400).json({
          success: false,
          msg: "All Fields are required",
        });
      }

      const user = await userModel.findOne({ email, answer });

      if (!user) {
        return res.status(404).json({
          msg: "wrong email",
          success: false,
        });
      } else {
        const hashpass = await authHelpers.hashPassword(newPassword);

        const updatePass = await userModel.findByIdAndUpdate(user._id, {
          password: hashpass,
        });

        res.status(200).json({
          msg: "Reset Password Successful",
          success: true,
          updatePass,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: "some thing wrong in this api",
      });
    }
  },
  saveNotification: async (req, res) => {
    try {
      const { fcm_Token } = req.body;
      const token = await tokenModel.create({ token: fcm_Token });
      token.save();
      res.status(200).json({
        msg: "Fcm Token Save Successfull",
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },
  pushNotification: async (req, res) => {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        messagingSenderId: "314005293340",
      });

      let message = {
        notification: {
          title: req.body.title,
          body: req.body.body,
        },

        token: req.body.fcm_Token,
        data: {
          orderId: "353463",
          orderDate: "54236456",
        },
      };

      res.status(200).json({
        msg: "Notification Send Successful",
      });
      admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log("Notification sent successfully:", response);
        })
        .catch((error) => {
          console.error("Error sending notification:", error.message);
        });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
      });
    }
  },
};

module.exports = registerController;
