const Login = () => {
  return (
    <div className="App">
      <h2>Login</h2>
      <label for="email">Email:</label>
      <input type="text" id="email" name="email" placeholder="Email"></input>

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      ></input>
    </div>
  );
};

export default Login;
