import React from "react";
import Layout from "../../components/layout/layout";
import UserMenu from "../../components/UserMenu";

const Profile = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3>Profile </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
