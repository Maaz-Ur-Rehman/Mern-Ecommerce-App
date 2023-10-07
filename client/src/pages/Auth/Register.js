import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import { signup, signupGoogle } from "../../api";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyle.css";
import { useGoogleLogin } from "@react-oauth/google";


const Register = () => {
  // const [name, setName] = useState("");
  const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [answer, setAnswer] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,phone,address)

    const data = {
      // name: name,
      firstName:firstName,
      lastName:lastName,
      email: email,
      password: password,

      // phone: phone,
      // address: address,
      // answer: answer,
    };
    try {
      const res = await signup(data);
      console.log(res.data.msg);
      if (res.data.status) {
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg.toString());
      }
    } catch (err) {
      // console.log(err.response, "err");
      // const errorMessage = err.data.msg || "An error occurred";
      toast.error(err.toString());
    }
  };
  const handleGoogleLoginSuccess=async(tokenResponse)=>{
    console.log(tokenResponse,"token")
    const googleAccessToken = tokenResponse.access_token;
    console.log(googleAccessToken)
    await signupGoogle({googleAccessToken})
    .then((res)=>{
      // alert("signup google successfull")
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })

  }
    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

    return (
      <>
        <Layout>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h1>Register Page</h1>
              {/* <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div> */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter Your Name"
                  value={firstName}
                  onChange={(e) => {
                    setfirstName(e.target.value);
                  }}
                />
              </div><div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setlastName(e.target.value);
                  }}
                />
              </div>
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
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAddress"
                  placeholder="Enter Your Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div> */}
              {/* <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPhone"
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div> */}
              {/* <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAnswer"
                  placeholder="What Is Your Favourite"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                />
              </div> */}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <br />
              <br />
              <button onClick={() => login()} className="btn btn-primary">
                Google Signup
              </button>
            </form>
          </div>
        </Layout>
      </>
    )

};
export default Register;
