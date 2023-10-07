import React from "react";

const UpdateCategoryForm = ({handleSubmit,value,setValue}) => {

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
            placeholder="Update Category"
            // value={editedValue || value}
            value={value}
            // onChange={(e) => (editedValue ? setEditedValue(e.target.value) : setValue(e.target.value))}
            onChange={(e)=>setValue(e.target.value)}


          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateCategoryForm;
