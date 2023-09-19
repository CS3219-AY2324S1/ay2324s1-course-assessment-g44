import React, { useState } from "react";
import { Table, Button } from "semantic-ui-react";
import Create from "./create";
import Update from "./update";
import View from "./view";
import values from "../data/data";
import { create } from "@mui/material/styles/createTransitions";

export default function Read() {
  const [storageData, setStorageData] = useState(values);
  const [createState, setCreateState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [detailsState, setDetailsState] = useState(false);

  const getAllData = () => {
    const values = [];

    var keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      values.push(localStorage.getItem(keys[i]));
    }
    return values;
  };

  const setData = (data) => {
    let { id, questionName, question, difficultyLevel, category } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Question Name", questionName);
    localStorage.setItem("Question", question);
    localStorage.setItem("Difficulty Level", difficultyLevel);
    localStorage.setItem("Category", category);
    handleUpdate();
  };

  const showDetails = (data) => {
    let { id, questionName, question, difficultyLevel, category } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Question Name", questionName);
    localStorage.setItem("Question", question);
    localStorage.setItem("Difficulty Level", difficultyLevel);
    localStorage.setItem("Category", category);
    setDetailsState(!detailsState);
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
    const keyToRemove = id.toString();
    localStorage.removeItem(keyToRemove);
    setStorageData(getAllData());
  };

  // const onDelete = (id) => {
  //   axios
  //     .delete(`https://64fc0579605a026163ae2051.mockapi.io/fakeData/${id}`)
  //     .then(() => {
  //       getData();
  //     });
  // };

  // const getData = () => {
  //   axios
  //     .get(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`)
  //     .then((getData) => {
  //       setAPIData(getData.data);
  //     });
  // };

  // useEffect(() => {
  //   axios
  //     .get(`https://64fc0579605a026163ae2051.mockapi.io/fakeData`)
  //     .then((response) => {
  //       setAPIData(response.data);
  //     });
  // }, []);
  return (
    <div id="main-page">
      <div className="view-details">
        {detailsState ? <View onUpdateQuestion={setDetailsState} /> : null}
      </div>

      {!detailsState && !updateState && (
        <Button className="new-question" onClick={handleCreate}>
          {createState ? "Cancel" : "Add New Question"}
        </Button>
      )}

      <div className="create-form-new">
        {createState ? (
          <Create
            onUpdateStorage={setStorageData}
            onCreateQuestion={setCreateState}
          />
        ) : null}
      </div>
      <div className="update-form-new">
        {updateState ? (
          <Update
            onUpdateStorage={setStorageData}
            onUpdateQuestion={setUpdateState}
          />
        ) : null}
      </div>
      {!detailsState && !createState && !updateState && (
      <div className="question-table">
        <div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Question Details</Table.HeaderCell>
                <Table.HeaderCell>Question Name</Table.HeaderCell>
                <Table.HeaderCell>
                  Category
                </Table.HeaderCell>
                <Table.HeaderCell>Difficulty Level</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* {APIData.map((data) => { */}
              {console.log(storageData)}
              {storageData.map((data) => {
                data = JSON.parse(data);
                return (
                  <Table.Row>
                    <Table.Cell>
                      <Button onClick={() => showDetails(data)}>View</Button>
                    </Table.Cell>
                    <Table.Cell>{data.questionName}</Table.Cell>
                    <Table.Cell>{data.category}</Table.Cell>
                    <Table.Cell>{data.difficultyLevel}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => setData(data)}>Update</Button>
                    </Table.Cell>
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
     )}
    </div>
  );
}
