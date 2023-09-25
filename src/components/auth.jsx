import React, { useState } from "react";
import { Table, Button, Form } from "semantic-ui-react";
import { registerUser } from "../services/user_services";

export default function Auth() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postData = () => {
        if (username === "") {
          setErrorMessage("Please enter a username!");
        } else if (password === "") {
          setErrorMessage("Please enter a password!");
        } else if (email === "") {
            setErrorMessage("Please enter a email!");
        } else {
            const req = {username: username, email: email, password: password};
            registerUser(req);
        }
      };


  return (
    <div id="main-page">
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