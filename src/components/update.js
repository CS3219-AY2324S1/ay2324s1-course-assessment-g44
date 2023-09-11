import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";

export default function Update() {
  const [questionName, setQuestionName] = useState("");
  const [question, setQuestion] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [id, setID] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const updateAPIData = () => {
    if (questionName === "") {
      setErrorMessage("Please enter a question name!");
    } else if (question === "") {
      setErrorMessage("Please enter a question!");
    } else if (difficultyLevel === "") {
      setErrorMessage("Please select difficulty level!");
    } else {
      axios
        .put(`https://64fc0579605a026163ae2051.mockapi.io/fakeData/${id}`, {
          questionName,
          question,
          difficultyLevel,
        })
        .then(() => {
          window.location.reload(true);
        });
    }
  };

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setQuestionName(localStorage.getItem("Question Name"));
    setQuestion(localStorage.getItem("Question"));
    setDifficultyLevel(localStorage.getItem("Difficulty Level"));
  }, []);

  return (
    <div>
      <div className="error-message">
        {errorMessage && <p className="error"> {errorMessage} </p>}
      </div>
      <Form className="create-form">
        <Form.Field className="question-name-field">
          <label>Question Name</label>
          <input
            placeholder="Question Name"
            value={questionName}
            onChange={(e) => setQuestionName(e.target.value)}
          />
        </Form.Field>
        <Form.Field className="question-field">
          <label>Question</label>
          <input
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <select
            onChange={(e) => {
              setDifficultyLevel(e.target.value);
            }}
          >
            <option value="">Please select</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </Form.Field>
        <Button
          className="post-question-button"
          type="submit"
          onClick={updateAPIData}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
