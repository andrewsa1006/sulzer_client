import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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

  return (
    <div className="App">
      <h2>Login</h2>
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

      <button
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      >
        Login
      </button>

      <div>
        {messages.map((message) => {
          return <p key={message.msg}>{message.msg}</p>;
        })}
      </div>
    </div>
  );
};

export default Login;
