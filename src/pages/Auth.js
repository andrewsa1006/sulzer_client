import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [register, setRegister] = useState(true);

  return (
    <div className="App">
      <p>Please login or register</p>
      {register ? <Register /> : <Login />}

      <button
        onClick={() => {
          setRegister(!register);
        }}
      >
        {register ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default Auth;
