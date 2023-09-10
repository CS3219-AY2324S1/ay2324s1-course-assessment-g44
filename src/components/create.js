import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function Create() {
  const [questionName, setQuestionName] = useState("");
  const [question, setQuestion] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const navigate = useNavigate();

  const postData = () => {
    axios
      .post(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`, {
        questionName,
        question,
        difficultyLevel,
      })
      .then(() => {
        window.location.reload(true);
      });
  };
  return (
    <div>
      <Form className="create-form">
        <Form.Field className="question-name-field">
          <label>Question Name</label>
          <input
            placeholder="Question Name"
            onChange={(e) => setQuestionName(e.target.value)}
          />
        </Form.Field>
        <Form.Field className="question-field">
          <label>Question</label>
          <input
            placeholder="Question"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Difficulty Level</label>
          <input
            placeholder="Difficulty Level"
            onChange={(e) => setDifficultyLevel(e.target.value)}
          />
        </Form.Field>
        <Button
          className="post-question-button"
          onClick={postData}
          type="submit"
        >
          Add Question
        </Button>
      </Form>
    </div>
  );
}
