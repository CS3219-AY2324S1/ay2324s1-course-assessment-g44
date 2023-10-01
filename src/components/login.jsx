import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { loginUserApi, getUserApi } from "../services/user_services";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkAuth = async () => {
    if (email === "") {
      setErrorMessage("Please enter a email!");
    } else if (password === "") {
      setErrorMessage("Please enter a password!");
    } else {
      const req = {email: email, password: password}
      const res = await loginUserApi(req);
      if (res.status == 201){
        setSessionData();
        navigate("/read");
      } else if (res === "error"){
        setErrorMessage("Incorrect email or password provided!");
      }
    }
  };

  const setSessionData = async () => {
    const req = {email: email}
    const res = await getUserApi(req);
    const userInfo = res.data.message.rows
    const username = userInfo[0].username
    localStorage.setItem("email", email)
    localStorage.setItem("username", username)
  }

  const signup = async () => {
    navigate("/signup");
  }

  return (
    <div id="main-page">
      <div className="error-message">
        {errorMessage && <p className="error"> {errorMessage} </p>}
      </div>
      <Button
          className="post-question-button"
          onClick={signup}
        >
          Sign up
        </Button>

      <Form className="create-form">
        <Form.Field className="question-name-field">
          <label>Email</label>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field className="question-name-field">
          <label>Password</label>
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button
          className="post-question-button"
          onClick={checkAuth}
          type="submit"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
