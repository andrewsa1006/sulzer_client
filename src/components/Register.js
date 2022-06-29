import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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

  return (
    <div className="App">
      <h2>Register</h2>
      <label htmlFor="email">Email:</label>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        id="email"
        name="email"
        placeholder="Email"
      ></input>

      <label htmlFor="firstName">First Name:</label>
      <input
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        type="text"
        id="firstName"
        name="firstName"
        placeholder="First Name"
      ></input>

      <label htmlFor="company">Company:</label>
      <input
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        type="text"
        id="company"
        name="company"
        placeholder="Company "
      ></input>

      <label htmlFor="password">Password:</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      ></input>

      <label htmlFor="password2">Confirm Password:</label>
      <input
        onChange={(e) => {
          setPassword2(e.target.value);
        }}
        type="password"
        id="password2"
        name="password2"
        placeholder="Confirm Password"
      ></input>

      <button
        onClick={() => {
          submitDataToServer();
        }}
        type="submit"
      >
        Submit
      </button>

      <div>
        {messages.map((message) => {
          return <p key={message.msg}>{message.msg}</p>;
        })}
      </div>
    </div>
  );
};

export default Register;
