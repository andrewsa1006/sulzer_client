import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./register.css";
import { Stack, TextField, Button } from "@mui/material";
import logo from "../assets/logo.png";
import { createTheme } from "@mui/material/styles";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [messages, setMessages] = useState([]);

  const submitDataToServer = async () => {
    const totalErrors = [];
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      totalErrors.push({ msg: "Invalid Email" });
    }

    if (firstName.length < 2) {
      totalErrors.push({ msg: "Please enter a valid first name" });
    }

    if (company.length < 2) {
      totalErrors.push({ msg: "Please enter a valid company name" });
    }

    if (password.length < 6) {
      totalErrors.push({
        msg: "Password length must be at least six characters",
      });
    }

    if (password !== password2) {
      totalErrors.push({ msg: "Passwords do not match" });
    }

    if (totalErrors.length > 0) {
      setMessages(totalErrors);
      setTimeout(() => {
        setMessages([]);
      }, 3000);
    } else {
      await axios
        .post("http://127.0.0.1:5000/api/user/register", {
          email,
          firstName,
          lastName: "Test", // REMOVE IN PROD
          company,
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
          setMessages(...messages, err.response.data);
          setTimeout(() => {
            setMessages([]);
          }, 1500);
        });
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
                setFirstName(e.target.value);
              }}
              type="text"
              id="firstName"
              name="firstName"
              variant="standard"
              label="First Name"
              htmlFor="firstName"
            />
          </div>

          <div className="loginTextInputs">
            <TextField
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              type="text"
              id="company"
              name="company"
              htmlFor="company"
              label="Company"
              variant="standard"
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
              htmlFor="fpassword"
              label="Password"
              variant="standard"
            />
          </div>

          <div className="loginTextInputs">
            <TextField
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
              type="password"
              id="password2"
              name="password2"
              htmlFor="password2"
              label="Confirm Password"
              variant="standard"
            />
          </div>
          <div>
            <Button
              onClick={() => {
                submitDataToServer();
              }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Stack>

        <span>
          {messages.map((message) => {
            return (
              <p class="notification" key={message.msg}>
                {message.msg}
              </p>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default Register;
