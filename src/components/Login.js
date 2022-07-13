import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./register.css";
import { Stack, TextField, Button } from "@mui/material";
import logo from "../assets/logo.png";
import { style } from "@mui/system";
import { createTheme } from "@mui/material/styles";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);

  const login = async () => {
    if (email.length > 0 && password.length > 0) {
      await axios
        .post("http://127.0.0.1:5000/api/user/login", {
          email,
          password,
        })
        .then((response) => {
          setMessages([...messages, { msg: "Success! Redirecting..." }]);
          let info = {
            user: response.data.user,
            token: response.data.token,
          };
          info = JSON.stringify(info);
          localStorage.setItem("info", info);
          setTimeout(() => {
            navigate("/form");
          }, 1500);
        })
        .catch((err) => {
          console.log(err.response.data);
          setMessages([...messages, err.response.data]);
          setTimeout(() => {
            setMessages([]);
          }, 3000);
        });
    } else {
      setMessages([
        ...messages,
        { msg: "Username and password cannot be blank" },
      ]);
      setTimeout(() => {
        setMessages([]);
      }, 3000);
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: "#004e83",
      },
    },
  });

  return (
    <div className="container">
      <div className="card">
        <div className="logoBox">
          <img className="image" src={logo} alt={"logo"} />
        </div>
        <Stack spacing={2}>
          <div className="loginTextInputs">
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              id="email"
              name="email"
              htmlFor="email"
              variant="standard"
              label="Email"
            />
          </div>

          <div className="loginTextInputs">
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              htmlFor="password"
              variant="standard"
              label="Password"
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Login
            </Button>
          </div>
        </Stack>
      </div>
      <div>
        {messages.map((message) => {
          return (
            <p className="notification" key={message.msg}>
              {message.msg}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Login;
