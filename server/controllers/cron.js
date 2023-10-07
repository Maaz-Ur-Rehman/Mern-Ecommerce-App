// const admin = require("firebase-admin");
// const serviceAccount = require("../fcmnotification.json"); // Replace with the actual path to your service account key file
// const tokenModel = require("../models/tokenModel");
// const cron = require("node-cron");

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   messagingSenderId: "314005293340",
// });

// const sendPushNotification = async () => {
//   try {
//     // const tokens = await tokenModel.find();
//     // console.log(tokens,"token")
//     const message = {
//       notification: {
//         title: "Your Title",
//         body: "Your Message",
//       },
//       data: {
//         orderId: "353463",
//         orderDate: "54236456",
//       },
//     };


//     // const validTokens = tokens.filter((token) => token.fcm_Token && token.fcm_Token.trim() !== "");
//     // if (validTokens.length === 0) {
//     //   console.log("No valid FCM tokens found. Skipping push notification.");
//     //   return;
//     // }

//     const promises = validTokens.map((token) => {
//       console.log(token.fcm_Token,"token");
//       return admin.messaging().sendToDevice("dnILco7bS-2Z3XJFM_Aprw:APA91bFBfzllqPEuwClsjctzIPM_uhD3PRgn398fEAqB95eLtObCBhxgYTFjgGs0onY5_dfMZfqnPOCI9UGIj4ageoAT7BSbLF6WYarSEjEtIBmcSZwki0JLJuRPY1qbyV52SOCIaokm", message);
//     });

//     await Promise.all(promises);
//     console.log("Notifications sent successfully.");
//   } catch (err) {
//     console.error("Error sending notifications:", err.message);
//   }
// };

// const startPushNotificationsCron = () => {
//   // Schedule the cron job to run every day at 9 AM (UTC)
//   cron.schedule("*/10 * * * * * ", () => {
//     // sendPushNotification();
//   });

//   console.log("Cron job for sending push notifications started.");
// };

// module.exports = { startPushNotificationsCron };
