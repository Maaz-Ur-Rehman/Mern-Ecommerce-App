import React from 'react'
import UserMenu from '../../components/UserMenu'
import Layout from '../../components/layout/layout'

const Order = () => {
  return (
    <Layout>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
            <UserMenu />
        </div>
        <div className="col-md-9">
            <h3>Orders </h3>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default Order