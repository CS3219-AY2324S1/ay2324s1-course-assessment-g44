import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react';


const DifficultyOptions = [
  { key: 'easy', text: 'Easy', value: 'easy' },
  { key: 'medium', text: 'Medium', value: 'medium' },
  { key: 'hard', text: 'Hard', value: 'hard' },
];


export default function Create() {
  const [questionName, setQuestionName] = useState("");
  const [question, setQuestion] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const postData = () => {
    if (questionName === "") {
      setErrorMessage("Please enter a question name!");
    } else if (question === "") {
      setErrorMessage("Please enter a question!");
    } else if (difficultyLevel === "") {
      setErrorMessage("Please select difficulty level!");
    } else {
      axios
        .post(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`, {
          questionName,
          question,
          difficultyLevel,
        })
        .then(() => {
          window.location.reload(true);
        });
    }
  };

  const handleDifficultyChange = (e, { value }) => {
    setDifficultyLevel(value);
  };

  return (
    <div>
      <div className="error-message">{errorMessage && <p className="error"> {errorMessage} </p>}</div>
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
          <Dropdown
            placeholder="Select Difficulty Level"
            selection
            options={DifficultyOptions}
            onChange={handleDifficultyChange}
            value={difficultyLevel}
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
