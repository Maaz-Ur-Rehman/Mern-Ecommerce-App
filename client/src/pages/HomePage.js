import React from 'react'
import Layout from '../components/layout/layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const {auth,setAuth}=useAuth()
  console.log(auth,"auth")
  return (
    <>
    <Layout>
    <div>HomePage</div>
    <pre>{JSON.stringify(auth,null,8)}</pre>
    <pre>{}</pre>
    </Layout>
    </>
  )
}

export default HomePage