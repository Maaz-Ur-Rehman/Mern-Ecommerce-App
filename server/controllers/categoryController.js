const { default: slugify } = require("slugify")
const categoryModel = require("../models/categoryModel")
const { findByIdAndDelete } = require("../models/userModel")

const categoryController={

    // CREATE CATEGORY
    createCategory:async(req,res)=>{
        try{
            const {name}=req.body
            if(!name){
                res.status(404).json({
                    msg:"Name are required",
                    success:false
                })
            }
            const existCtategory=await categoryModel.findOne({name:name})
            if(existCtategory){
                res.status(404).json({
                    msg:"This Category all ready exist",
                    success:false
                })


            }
            const category=await new categoryModel({
                name,
                slug:slugify(name)
            }).save()

            res.status(200).json({
                msg:"category created successful",
                success:true,
                category
            })

        }
        catch(err){
            res.status(500).json({
                success:false,
                msg:"Error in Category",
                err
            })
        }
    },

    // UPDATE CATEGORY

    upadateCategory:async(req,res)=>{
        try {
            const { name } = req.body;
            const { id } = req.params;
        
            if (!name) {
              return res.status(400).json({
                success: false,
                msg: 'Category name is required',
              });
            }
        
            // Update the category in the database
            const updatedCategory = await categoryModel.findByIdAndUpdate(
              id,
              { name, slug: slugify(name) },
              { new: true }
            ).exec();
        
            if (!updatedCategory) {
              return res.status(404).json({
                success: false,
                msg: 'Category not found',
              });
            }
        
            res.status(200).json({
              success: true,
              msg: 'Category updated successfully',
              updatedCategory,
            });
          } catch (err) {
            res.status(500).json({
              success: false,
              msg: 'Error in updating category',
              error: err.message,
            });
          }
    },

    getAllCategory:async(req,res)=>{
        try{

            const allCategory=await categoryModel.find({})
            res.status(200).json({
                allCategoryLength:allCategory.length,
                msg:"All Category",
                success:true,
                allCategory

            })

        }
        catch(err){
            res.status(500).json({
                success:false,
                msg:"Error in Category",
                err
            })
        }
    },
    getSingleCategory:async(req,res)=>{
        try{

            const {slug}=req.params
            const singleCategory=await categoryModel.findOne({slug:slug})
            res.status(200).json({
                success:true,
                msg:"Get Single Category Successful",
                singleCategory
            })

        }
        catch(err){
            res.status(500).json({
                success:false,
                msg:"Error in Single Category",
                err
            })
        }
    },
    DeleteCategory:async(req,res)=>{

        try{
            const {id}=req.params
            const deleteCategory=await categoryModel.findByIdAndDelete({_id:id})

            res.status(200).json({
                success:true,
                msg:"Delete Category Succesfully",
            })

        }
        catch(err){
            res.status(500).json({
                success:false,
                msg:"Error in Delete Category",
                err
            })
        }
    }

    





}

module.exports=categoryController