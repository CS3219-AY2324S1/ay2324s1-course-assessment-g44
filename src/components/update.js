import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown, TextArea } from "semantic-ui-react";

const DifficultyOptions = [
  { key: "easy", text: "Easy", value: "Easy" },
  { key: "medium", text: "Medium", value: "Medium" },
  { key: "hard", text: "Hard", value: "Hard" },
];

export default function Update(props) {
  const [questionName, setQuestionName] = useState("");
  const [question, setQuestion] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [category, setCategory] = useState("");
  const [id, setID] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const getAllData = () => {
    const values = [];

    var keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      values.push(localStorage.getItem(keys[i]));
    }
    return values;
  }

  const updateData = () => {
    if (questionName === "") {
      setErrorMessage("Please enter a question name!");
    } else if (question === "") {
      setErrorMessage("Please enter a question!");
    } else if (isDuplicateQuestionName()){
      setErrorMessage("You already have this question!");
    } else {
      // axios
      //   .put(`https://64fc0579605a026163ae2051.mockapi.io/fakeData/${id}`, {
      //     questionName,
      //     question,
      //     difficultyLevel,
      //   })
      //   .then(() => {
      //     window.location.reload(true);
      //   });
      const updatedQuestion = {
        id: id,
        questionName: questionName,
        question: question,
        difficultyLevel: difficultyLevel,
        category: category
      };
      localStorage.setItem(id.toString(), JSON.stringify(updatedQuestion));
      localStorage.removeItem("ID");
      localStorage.removeItem("Question Name");
      localStorage.removeItem("Question");
      localStorage.removeItem("Difficulty Level");
      localStorage.removeItem("Category")
      const questions = getAllData();
      props.onUpdateStorage(questions);
      props.onUpdateQuestion(false);
    }
  };

  const handleDifficultyChange = (e, { value }) => {
    setDifficultyLevel(value);
  };

  const isDuplicateQuestionName = () => {
    if (questionName === localStorage.getItem("Question Name")) {
      return false;
    }
    const allData = getAllData();
    console.log("all data: " + allData);
    for (const data of allData) {
      try {
        const json_data = JSON.parse(data);
        console.log("current_data: " + json_data);
        console.log("current name: " + json_data.questionName);
        if (json_data.questionName.toLowerCase() === questionName.toLowerCase()) {
          return true;
        }
      } catch (e) {
        continue;
      }
    }
    return false;
  }

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setQuestionName(localStorage.getItem("Question Name"));
    setQuestion(localStorage.getItem("Question"));
    setDifficultyLevel(localStorage.getItem("Difficulty Level"));
    setCategory(localStorage.getItem("Category"))
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
          <label>Question Description</label>
          <textarea
            className="question-field-input"
            placeholder="Question Description"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          onClick={updateData}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}
