const multer=require('multer')
const path=require('path')
// let storage=multer.diskStorage({
//     destination:function(req,file,cb){
//       cb(null,"./uploads")

//     },
//     filename:function(req,file,cb){
//       let ext=path.extname(file.originalname)
//       cb(null,file.fieldname+ `-` + Date.now()+ext)
//     }
//   })
//   let upload=multer({
//     storage:storage,
//     fileFilter:function(req,file,cb){
//       if(file.mimetype=="image/png" || file.mimetype=="image/jpeg"){
//         cb(null ,true)
//       }
//       else{
//         cb(null,false)
//         res.status(404).json({
//           msg:"image must be in jpeg and png",
//           success:false
//         })
//       }
//     }
//   })
const imageconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + `-` + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: imageconfig,
});

module.exports=upload