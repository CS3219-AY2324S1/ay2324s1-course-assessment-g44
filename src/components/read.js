import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import Create from "./create";
import Update from "./update";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [createState, setCreateState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const setData = (data) => {
    let { id, questionName, question, difficultyLevel } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Question Name", questionName);
    localStorage.setItem("Question", question);
    localStorage.setItem("Difficulty Level", difficultyLevel);
    handleUpdate();
  };

  const handleCreate = () => {
    setCreateState(!createState);
    setUpdateState(false);
  };

  const handleUpdate = () => {
    setUpdateState(!updateState);
    setCreateState(false);
  };

  const onDelete = (id) => {
    axios
      .delete(`https://64fc0579605a026163ae2051.mockapi.io/fakeData/${id}`)
      .then(() => {
        getData();
      });
  };

  const getData = () => {
    axios
      .get(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  useEffect(() => {
    axios
      .get(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  return (
    <div id="main-page">
      <Button className="new-question" onClick={handleCreate}>
        {createState ? "Cancel" : "Add New Question"}
      </Button>

      <div className="create-form-new">{createState ? <Create /> : null}</div>
      <div className="update-form-new">{updateState ? <Update /> : null}</div>
      <div className="question-table">
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Question Name</Table.HeaderCell>
              <Table.HeaderCell className="question-header">
                Question
              </Table.HeaderCell>
              <Table.HeaderCell>Difficulty Level</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {APIData.map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.questionName}</Table.Cell>
                  <Table.Cell>{data.question}</Table.Cell>
                  <Table.Cell>{data.difficultyLevel}</Table.Cell>
                  {/* <Link to="/update"> */}
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                  {/* </Link> */}
                  <Table.Cell>
                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
