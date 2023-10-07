import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import { login, signInGoogle } from "../../api";
import { toast } from "react-hot-toast";
import "../../styles/AuthStyle.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const location=useLocation()
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    

    const res = await login(data)
      .then((res) => {
        console.log(res.data.success, "data");
        if (res && res.data.success) {
          toast.success(res.data.msg);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));

          navigate(location.state || "/");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error(`something went wrong${err}`);
      });
  };
  const handleGoogleLoginSuccess=async(tokenResponse)=>{
    console.log(tokenResponse,"token")
    const googleAccessToken = tokenResponse.access_token;
    console.log(googleAccessToken)
    await signInGoogle({googleAccessToken})
    .then((res)=>{
      console.log(res,"res")
      if (res && res.data.success) {
        toast.success(res.data.msg);
        setAuth({
          ...auth,
          user: res.data.existUser,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.msg);
      }
    })
    .catch((err)=>{
      console.log(err)
    })

  }
    const loginGoogle = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });


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
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
            <button onClick={()=>{navigate('/forgotpass')}} className="btn btn-primary">
              Forgot Password
            </button>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <br />
              <br />
              <button onClick={() => loginGoogle()} className="btn btn-primary">
                Log In With Google
              </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
