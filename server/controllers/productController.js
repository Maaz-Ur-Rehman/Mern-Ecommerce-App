const { default: slugify } = require("slugify");
const ProductModel = require("../models/productModel");

const productController = {
  createProduct: async (req, res) => {
    const { name, description, price, category, quantity, shipping} = req.body;
    const photos = req.file
    try {
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
        
      ) {
        return res.status(404).json({
          msg: "All fields are required",
          success: false,
        });
      }
      
      const product = new ProductModel({
        name,
        description,
        price,
        category,
        quantity,
        shipping,
        slug: slugify(name),
        photos
      });
      // const photos =
      // req.files && req.files["photo"]
      //   ? req.files["photo"][0].filename
      //   : undefined;
      if (photos) {
        product.photo = photos.filename
      }
        console.log(photos,"path")
      await product.save();

      return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        product,
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Error in Create Product API",
        success: false,
        err,
      });
    }
  },


  // <===============Get All Product====================>
  getAllProduct:async(req,res)=>{
    try{

      const allProduct=await ProductModel.find({}).populate("category").limit(12).sort({createdAt:"-1"})

      res.status(200).json({
        countTotal:allProduct.length,
        msg:"Get All Products Successfull",
        success:true,
        allProduct
      })

    }
    catch(err){
      res.status(500).json({
        msg:"Error in Get Product Api",
        success:false
      })
    }
  },
  // <===============Get Single Product====================>


  getSingleProduct:async(req,res)=>{
    try{
      const {slug}=req.params
      const singleProduct=await ProductModel.findOne({slug:slug}).select("-photo").populate("category")
      res.status(200).json({
        msg:"Get Single Product Successfull",
        success:true,
        singleProduct
      })
    }
    catch(err){
      res.status(500).json({
        msg:"Error in Single Product Api",
        success:false
      })
    }
  },
  // <===============Get Photo=============>


  // getPhoto:async(req,res)=>{
  //   const {id}=req.params
  //   console.log(id,"id")
  //   try{


  //     const getPhoto = await ProductModel.findById({_id:id}).select("photo")


      

  //     res.status(200).json({
  //       msg:"Get Photo Successfull",
  //       success:true,
  //       getPhoto
        
  //     })

  //   }
  //   catch(err){
  //     res.status(500).json({
  //       msg:"Error in Get Photo Api"
  //     })
  //   }
  // },

    // <===============Delete Single Product=============>
  DeleteSingleProduct:async(req,res)=>{
    try{
      const {id}=req.params

      const deleteProduct=await ProductModel.findByIdAndDelete({_id:id}).select("-photo")
      res.status(200).json({
        msg:"Delete Product Successfull",
        success:true,
        deleteProduct
      })
    }
    catch(err){

      res.status(500).json({
        msg:"Error in Delete Product Api",
        success:false,
        err
      })
    }
  },

    // <===============Update Single Product=============>

  UpdateSingleProduct:async(req,res)=>{
    try{
      const {name,description,price,category,quantity,shipping}=req.body
      const photos=req.file
// console.log(req.body,photos)    

      const {id}=req.params
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
        
      ) {
        return res.status(404).json({
          msg: "All fields are required",
          success: false,
        });
      }
      
    
      const product=await ProductModel.findByIdAndUpdate({_id:id},{...req.body,slug:slugify(name)},{new:true})
      console.log(product)
      if(photos){
        product.photo=photos.path
      }

      await product.save()

      res.status(200).json({
        msg:"Product Update Successfull",
        success:true,
        product
      })

    }
    catch(err){
      res.status(500).json({
        msg:"Error in Update Api",
        success:false,
        message:err.message
      })
    }
  }



};

module.exports = productController;
