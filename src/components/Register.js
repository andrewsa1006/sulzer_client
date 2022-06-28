import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const submitDataToServer = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/register",
        {
          email,
          firstName,
          lastName: "Test",
          company,
          password,
        }
      );
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="App">
      <h2>Register</h2>
      <label for="email">Email:</label>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        id="email"
        name="email"
        placeholder="Email"
      ></input>

      <label for="firstName">First Name:</label>
      <input
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        type="text"
        id="firstName"
        name="firstName"
        placeholder="First Name"
      ></input>

      <label for="company">Company:</label>
      <input
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        type="text"
        id="company"
        name="company"
        placeholder="Company "
      ></input>

      <label for="password">Password:</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      ></input>

      <label for="password2">Confirm Password:</label>
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
        <p>{error}</p>
      </div>
    </div>
  );
};

export default Register;
