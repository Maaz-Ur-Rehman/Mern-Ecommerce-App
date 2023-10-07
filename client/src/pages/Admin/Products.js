import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/AdminMenu";
import { getProducts } from "../../api";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      console.log(res, "res");
      setProducts(res.allProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
          {products.map((product) => (
            <Link key={product._id} to={`/${product.slug}`}>
            <div className="card m-2"  style={{ width: "18rem" }}>
              <img
                src={`http://localhost:7000/uploads/${product.photo}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
