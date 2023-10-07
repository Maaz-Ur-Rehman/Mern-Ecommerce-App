import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`http://localhost:7000/admin-auth`)
      // const res = await axios.get(`http://localhost:7000/admin-auth`, {
      //   headers: {
      //     Authorization: auth?.token,
        
      //   },
      // });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
      console.log(res);
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
}
