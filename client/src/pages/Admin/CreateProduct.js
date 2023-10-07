import React, { useEffect, useState } from "react";

import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/AdminMenu";
import { getCategory ,createProduct} from "../../api";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate=useNavigate()

  const getAllCategory = async () => {
    try {
      const res = await getCategory();
      console.log("API Response:", res);
      if (res?.success) {
        console.log("Fetched Categories:", res.allCategory);
        setCategories(res?.allCategory);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  const handleCreate=async(e)=>{
    e.preventDefault()
    const productData=new FormData()
    productData.append('name',name)
    productData.append('description',description)
    productData.append('price',price)
    productData.append('quantity',quantity)
    productData.append('shipping',shipping)
    productData.append('category',category)
    productData.append('photo',photo)
    try{
      const res=await createProduct(productData)
      if(res?.data.success){
        navigate('/dashboard/admin/products')
        toast.success(`${res.data.product.name} is created`)
      }
      console.log(res,"res")
    }
    catch(err){
      toast.error(err.msg)
    }

  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Create Product</h3>
            <div className="m-1 w-75">
              <div className="card-body">
                <Select
                  placeholder="Select Category"
                  size="large"
                  className="form-select mb-3"
                  bordered={false}
                  showSearch
                  onChange={(data) => setCategory(data)}
                >
                  {categories.map((e) => (
                    <Option key={e._id} value={e._id}>
                      {e.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    placeholder="Write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />{" "}
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="write a Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                <Select
                  placeholder="Select Category"
                  size="large"
                  className="form-select mb-3"
                  bordered={false}
                  showSearch
                  onChange={(data) => setShipping(data)}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
                </div>
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleCreate} >Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
