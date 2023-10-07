import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/AdminMenu";

const AllUsers = () => {
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h3>All Users</h3>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AllUsers;
