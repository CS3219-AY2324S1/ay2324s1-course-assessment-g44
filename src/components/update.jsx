import { Badge, Button, Card, Group, Space, SegmentedControl, Text, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState, useEffect } from "react";
import View from '../components/view';
import Read from '../components/read';


// const DifficultyOptions = [
//   { key: "easy", text: "Easy", value: "Easy" },
//   { key: "medium", text: "Medium", value: "Medium" },
//   { key: "hard", text: "Hard", value: "Hard" },
// ];

export default function Update(props) {
  // const [questionName, setQuestionName] = useState("");
  // const [question, setQuestion] = useState("");
  // const [difficultyLevel, setDifficultyLevel] = useState("");
  // const [category, setCategory] = useState("");
  // const [id, setID] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");

  // const getAllData = () => {
  //   const values = [];

  //   var keys = Object.keys(localStorage);

  //   for (let i = 0; i < keys.length; i++) {
  //     values.push(localStorage.getItem(keys[i]));
  //   }
  //   return values;
  // }

  // const updateData = () => {
  //   if (questionName === "") {
  //     setErrorMessage("Please enter a question name!");
  //   } else if (question === "") {
  //     setErrorMessage("Please enter a question!");
  //   } else if (isDuplicateQuestionName()){
  //     setErrorMessage("You already have this question!");
  //   } else {
  //     // axios
  //     //   .put(`https://64fc0579605a026163ae2051.mockapi.io/fakeData/${id}`, {
  //     //     questionName,
  //     //     question,
  //     //     difficultyLevel,
  //     //   })
  //     //   .then(() => {
  //     //     window.location.reload(true);
  //     //   });
  //     const updatedQuestion = {
  //       id: id,
  //       questionName: questionName,
  //       question: question,
  //       difficultyLevel: difficultyLevel,
  //       category: category
  //     };
  //     localStorage.setItem(id.toString(), JSON.stringify(updatedQuestion));
  //     localStorage.removeItem("ID");
  //     localStorage.removeItem("Question Name");
  //     localStorage.removeItem("Question");
  //     localStorage.removeItem("Difficulty Level");
  //     localStorage.removeItem("Category")
  //     const questions = getAllData();
  //     props.onUpdateStorage(questions);
  //     props.onUpdateQuestion(false);
  //   }
  // };

  // const handleDifficultyChange = (e, { value }) => {
  //   setDifficultyLevel(value);
  // };

  // const isDuplicateQuestionName = () => {
  //   if (questionName === localStorage.getItem("Question Name")) {
  //     return false;
  //   }
  //   const allData = getAllData();
  //   console.log("all data: " + allData);
  //   for (const data of allData) {
  //     try {
  //       const json_data = JSON.parse(data);
  //       console.log("current_data: " + json_data);
  //       console.log("current name: " + json_data.questionName);
  //       if (json_data.questionName.toLowerCase() === questionName.toLowerCase()) {
  //         return true;
  //       }
  //     } catch (e) {
  //       continue;
  //     }
  //   }
  //   return false;
  // }

  // useEffect(() => {
  //   setID(localStorage.getItem("ID"));
  //   setQuestionName(localStorage.getItem("Question Name"));
  //   setQuestion(localStorage.getItem("Question"));
  //   setDifficultyLevel(localStorage.getItem("Difficulty Level"));
  //   setCategory(localStorage.getItem("Category"))
  // }, []);

  // return (
  //   <div>
  //     <div className="error-message">
  //       {errorMessage && <p className="error"> {errorMessage} </p>}
  //     </div>
  //     <Form className="create-form">
  //       <Form.Field className="question-name-field">
  //         <label>Question Name</label>
  //         <input
  //           placeholder="Question Name"
  //           value={questionName}
  //           onChange={(e) => setQuestionName(e.target.value)}
  //         />
  //       </Form.Field>
  //       <Form.Field className="question-field">
  //         <label>Question Description</label>
  //         <textarea
  //           className="question-field-input"
  //           placeholder="Question Description"
  //           value={question}
  //           onChange={(e) => setQuestion(e.target.value)}
  //         />
  //       </Form.Field>
  //       <Form.Field>
  //         <label>Category</label>
  //         <input
  //           placeholder="Category"
  //           value={category}
  //           onChange={(e) => setCategory(e.target.value)}
  //         />
  //       </Form.Field>

  //       <Form.Field>
  //         <label>Difficulty Level</label>
  //         <Dropdown
  //           placeholder="Select Difficulty Level"
  //           selection
  //           options={DifficultyOptions}
  //           onChange={handleDifficultyChange}
  //           value={difficultyLevel}
  //         />
  //       </Form.Field>
  //       <Button
  //         className="post-question-button"
  //         type="submit"
  //         onClick={updateData}
  //       >
  //         Update
  //       </Button>
  //     </Form>
  //   </div>
  // );


  const oldQuestion = props.question;

  const [updated, setUpdated] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const [updatedQuestion, setUpdatedQuestion] = useState({
    title: oldQuestion.title,
    description: oldQuestion.description,
    category: oldQuestion.category,
    difficulty: oldQuestion.difficulty,
    id: oldQuestion.id
  });


  // const updatedQuestion = {
  //   title: "",
  //   description: "",
  //   category: "",
  //   difficulty: "",
  //   id: 0
  // }

  const form = useForm({
    initialValues: {
      title: oldQuestion.title,
      description: oldQuestion.description,
      category: oldQuestion.category,
      difficulty: oldQuestion.difficulty
    },
  });

  const handleSubmit = (values) => {
    const q = {
      title: values.title,
      description: values.description,
      category: values.category,
      difficulty: values.difficulty,
      id: oldQuestion.id
    }
    //console.log(updatedQuestion);

    fetch('http://localhost:8000/questions/' + oldQuestion.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q)
    }).then(() => console.log("update success"));

    setUpdatedQuestion({
      title: values.title,
      description: values.description,
      category: values.category,
      difficulty: values.difficulty,
      id: oldQuestion.id
    });

    setUpdated(true);
    
  }


  return (
    updated ? <View question={updatedQuestion} /> :
    cancelled ? <View question={oldQuestion} /> :
    <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Title order={2}>Update Question</Title>
        <Space h="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
          <TextInput
            required
            withAsterisk
            size='md'
            label="Title"
            placeholder="your question title here.."
            {...form.getInputProps('title')}
          />
          <Space h="md" />

          <Textarea
            required
            label="Description"
            placeholder="what is the question about?"
            size='md'
            {...form.getInputProps('description')}
          />      
          <Space h="md" />

          <TextInput
            size='md'
            label="Category"
            placeholder="category here..."
            {...form.getInputProps('category')}
          />
          <Space h="lg" />

          <Group grow>
          <SegmentedControl
              required
              fullwidth
              size="sm"
              data={[
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' },
              ]}
              {...form.getInputProps('difficulty')}
            />
            </Group>
            <Space h="xl" />
  
          <Group mt="md">
            <Button variant="light" color="grape" type="submit" size="md">Update</Button>
            <Button variant="light" color="gray" type="reset" size="md">Reset</Button>
            <Button variant="default" size="md" onClick={() => setCancelled(true)}>Cancel</Button>
          </Group>
        </form>
      </Card>
  );
}