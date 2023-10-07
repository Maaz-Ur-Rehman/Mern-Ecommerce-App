import React from "react";

const CategoryForm = ({handleSubmit,value,setValue,editedValue,setEditedValue}) => {

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (editedValue) {
  //     handleSubmit(editedValue);
  //   } else if (value) {
  //     handleSubmit(value);
  //   }
  //   // Clear the form fields
  //   setValue("");
  //   setEditedValue("");
  // };

  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          
          <input
            type="text"
            className="form-control"
            placeholder="Enter new Category"
            // value={editedValue || value}
            value={value}
            // onChange={(e) => (editedValue ? setEditedValue(e.target.value) : setValue(e.target.value))}
            onChange={(e)=>setValue(e.target.value)}


          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
