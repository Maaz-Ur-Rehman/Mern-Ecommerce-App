import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/AdminMenu";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../api";
import CategoryForm from "../../components/Form/CategoryForm";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import UpdateCategoryForm from "../../components/Form/updateCategoryForm";

const CreateCategory = () => {
  const [category, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState("");
  // Move getAllCategory function definition above handelSubmit
  const getAllCategory = async () => {
    try {
      setLoading(true); // Show loading spinner while fetching categories
      const res = await getCategory();
      console.log("API Response:", res);
      if (res.success) {
        console.log("Fetched Categories:", res.allCategory);
        setCategories(res.allCategory);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false); // Hide loading spinner after fetching categories
    }
  };
  const handelDelete = async (id) => {
    // console.log(id);
    const res = await deleteCategory(id);
    if (res.data.success) {
      toast.success(`category is deleted`);
      getAllCategory();
      setName('')
      setEditName('')
    } else {
      toast.error(res.data.msg);
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true); // Show loading spinner
      const res = await createCategory({ name: name });
      console.log("Component rendering", res); // Add this line
      if (res.data.success) {
        toast.success(`${res.data.category.name} is created`);
        // Fetch updated categories after creating a new category
        getAllCategory();
        setName(""); // Clear input field after successful submission
      } else {
        toast.error(res.data.msg);
        // console.log(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };
  const handleEdit = async (e) => {
    setEditId(e._id);
    setEditName(e.name);
  };
  const handleUpdate = async (e) => {
    console.log(e,"e")
    e.preventDefault()
    try {
      setLoading(true); // Show loading spinner
      const res = await updateCategory({ name: editName,id:editId });
      console.log("Component rendering", res); // Add this line
      if (res.data.success) {
        toast.success(`${res.data.updatedCategory.name} is updated`);
        // Fetch updated categories after creating a new category
        getAllCategory();
        setEditName(""); // Clear input field after successful submission
      } else {
        toast.error(res.data.msg);
        // console.log(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  useEffect(() => {
    console.log("useEffect is running");
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Create Category </h3>
            <div>
              {editName ? (
                <UpdateCategoryForm
                handleSubmit={handleUpdate}
                  value={editName}
                  setValue={setEditName}
                />
              ) : (
                <CategoryForm
                  handleSubmit={handelSubmit}
                  value={name}
                  setValue={setName}
                />
              )}
            </div>
            <div className="w-75">
              {loading ? (
                <CircularProgress />
              ) : (
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((e, i) => (
                      <tr>
                        <>
                          <td key={e._id}>{e.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => handleEdit(e)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                handelDelete(e._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
