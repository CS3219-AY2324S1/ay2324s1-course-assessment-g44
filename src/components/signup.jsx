import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { createUserApi } from "../services/user_services";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    if (email === "") {
      setErrorMessage("Please enter a email!");
    } else if (username === "") {
      setErrorMessage("Please enter a username!");
    } else if (password === "") {
      setErrorMessage("Please enter a password!");
    } else {
      const req = {email: email,  username: username, password: password };
      const res = await createUserApi(req);
      // console.log(res.status)
      if (res.status == 201){
        navigate("/read");
      } else if (res === "error"){
        console.log("reached")
        setErrorMessage("You have already registered this email!");
      }
    }
  };

  const login = async () => {
    navigate("/login");
  }

  return (
    <div id="main-page">
      <div className="error-message">
        {errorMessage && <p className="error"> {errorMessage} </p>}
      </div>
      <Button
          className="post-question-button"
          onClick={login}
        >
          Log in
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
          <label>Username</label>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
          onClick={postData}
          type="submit"
        >
          Sign up
        </Button>
      </Form>
    </div>
  );
}
