import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="/login"}) => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => --prevCount);
    }, 1000);

    count === 0 && navigate(`/${path}`, { state: location.pathname });

    return () => clearInterval(interval);
  }, [count, navigate,location,path]);

  return (
    <div
      class="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1>Redirecting to you {count} Second</h1>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
