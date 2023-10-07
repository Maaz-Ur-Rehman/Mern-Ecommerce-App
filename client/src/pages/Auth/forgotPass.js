import React, { useState } from 'react'
import { forgot } from '../../api'
import { toast } from 'react-hot-toast'
import Layout from '../../components/layout/layout'
import { useNavigate } from 'react-router-dom'

const ForgotPass = () => {
    const [email,setEmail]=useState()
    const [newPassword,setNewPassword]=useState()
    const [answer,setAnswer]=useState()
    const navigate=useNavigate()

    const handleSubmit= async(e)=>{
        e.preventDefault()

       const data={
            email:email,
            answer:answer,
            newPassword:newPassword
        }
        console.log(data,"data")

        try{
        const res=await forgot(data)
        console.log(res,"res")
        if(res.data.success){
            toast.success(res.data.msg)
            navigate("/login")            

        }
        else{
            toast.error(res.data.msg)
        }
    }
    catch(err){
          toast.error("Something Went Wrong")  
    }
    }


    
    return (
        <>
          <Layout>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h1>Login Page</h1>
    
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your New Password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAnswer"
                    placeholder="Enter Your Answer"
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                    }}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </form>
            </div>
          </Layout>
        </>
      );
}

export default ForgotPass