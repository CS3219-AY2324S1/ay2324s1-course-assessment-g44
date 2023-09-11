import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";

const DifficultyOptions = [
  { key: "easy", text: "Easy", value: "easy" },
  { key: "medium", text: "Medium", value: "medium" },
  { key: "hard", text: "Hard", value: "hard" },
];

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

  const handleDifficultyChange = (e, { value }) => {
    setDifficultyLevel(value);
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
          type="submit"
          onClick={updateAPIData}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
