import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import values  from "../data/data";
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const DifficultyOptions = [
  { key: "easy", text: "Easy", value: "Easy" },
  { key: "medium", text: "Medium", value: "Medium" },
  { key: "hard", text: "Hard", value: "Hard" },
];

export default function Create(props) {
  const [questionName, setQuestionName] = useState("");
  const [question, setQuestion] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getAllData = async () => {
    const values = axios.get('http://localhost:3000/api/getAll').then((response) => {
      console.log(response.data);
    }).catch((error) => console.log(error)).data;
     // const values = [];

    // var keys = Object.keys(localStorage);

    // for (let i = 0; i < keys.length; i++) {
    //   values.push(localStorage.getItem(keys[i]));
    // }
    // return values;
    return values;
  }

  const postData = () => {
    if (questionName === "") {
      setErrorMessage("Please enter a question name!");
    } else if (question === "") {
      setErrorMessage("Please enter a question!");
    } else if (difficultyLevel === "") {
      setErrorMessage("Please select difficulty level!");
    } else if (isDuplicateQuestionName()) {
      setErrorMessage("You already have this question!");
    } else {
      axios
        .post(`http://localhost:3000/api/post`, {
          questionId: length(values) + 1,
          title: questionName,
          description: question,
          category: category,
          difficulty: difficultyLevel,
        });
        // .then(() => {
        //   window.location.reload(true);
        // });
      // const newQuestionID = uuid();
      // const newQuestion = {
      //   id: newQuestionID,
      //   questionName: questionName,
      //   question: question,
      //   difficultyLevel: difficultyLevel,
      //   category: category
      // };
      // localStorage.setItem(newQuestionID.toString(), JSON.stringify(newQuestion));
      // const questions = getAllData();
      // props.onUpdateStorage(questions);
      // props.onCreateQuestion(false);
      // console.log("values: " + values);
    }
  };

  const handleDifficultyChange = (e, { value }) => {
    setDifficultyLevel(value);
  };

  const isDuplicateQuestionName = async () => {
    const questionNameList = await getAllData().map(qn => {
      return JSON.parse(qn).title;
    });
    console.log(questionName);
    for (const title of questionNameList) {
      if (questionName.toLowerCase() === title.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

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
            onChange={(e) => setQuestionName(e.target.value)}
          />
        </Form.Field>
        <div className="question-field">
        <Form.Field>
          <label>Question Description</label>
          <input
            placeholder="Question Description"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Field>
        </div>
        <Form.Field>
          <label>Category</label>
          <input
            placeholder="Category"
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
          onClick={postData}
          type="submit"
        >
          Add Question
        </Button>
      </Form>
    </div>
  );
}