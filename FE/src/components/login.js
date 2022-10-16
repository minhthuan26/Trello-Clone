import React from "react";

const Login = () => {
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
      };
  return <div>
  <h2>Login Form</h2>
  <form onSubmit={handleSubmit}>
    <label>Tên đăng nhập</label>
    <input type={"text"} placeholder="Tên đăng nhập"></input>
    <label>Password</label>
    <input type={"password"} placeholder="Password"></input>
    <button>Đăng nhập</button>
  </form>
  </div>
};

export default Login;
