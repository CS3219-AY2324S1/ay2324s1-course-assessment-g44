/// <reference types="Cypress" />

const PORT = 8004;
const apiPath = `http://localhost:${PORT}/routes`;
const checkQuestionExistencePath = "checkQuestionExistence";
const addQuestionPath = "addQuestion";
const updateQuestionPath = "updateQuestion";
const deleteQuestionPath = "deleteQuestion";
var questionID = null;

const testQuestion = {
  title: "Test Question",
  description: "This is a test question",
  category: "testing",
  difficulty: "easy",
};

const updatedTestQuestion = {
  title: "Updated Test Question",
  description: "This is an updated test question",
  category: "testing",
  difficulty: "easy",
};

describe("Check that a question exists", () => {
  it("should exist in question database", () => {
    const body = { title: "Two Sum" };
    cy.request({
      method: "POST",
      url: `${apiPath}/${checkQuestionExistencePath}`,
      body: body,
    }).then((response) => {
      const status = response.status;
      expect(status).to.be.equal(201);
      const data = response.body;
      expect(data.exists).to.be.equal(true);
    });
  });
});

describe("Finding a question that does not exist will show that it does not exist", () => {
  it("should show that the question does not exist", () => {
    const body = { title: "This question is invalid and does not exist" };
    cy.request({
      method: "POST",
      url: `${apiPath}/${checkQuestionExistencePath}`,
      body: body,
    }).then((response) => {
      const status = response.status;
      expect(status).to.be.equal(201);
      const data = response.body;
      expect(data.exists).to.be.equal(false);
    });
  });
});

// test

describe("adding a test question", () => {
  it("should be able to add a test question", () => {
    cy.request({
      method: "POST",
      url: `${apiPath}/${addQuestionPath}`,
      body: testQuestion,
    }).then((response) => {
      const status = response.status;
      questionID = response.body._id;
      expect(status).to.be.equal(201);
    });
  });
});

describe("updating a test question", () => {
  it("should be able to update the test question", () => {
    const updatedTestQuestionId = {
      title: "Updated Test Question",
      description: "This is an updated test question",
      category: "testing",
      difficulty: "easy",
      _id: questionID,
    };
    cy.request({
      method: "PATCH",
      url: `${apiPath}/${updateQuestionPath}`,
      body: updatedTestQuestionId,
    }).then((response) => {
      const data = response.body;
      expect(data.title).to.be.equal(updatedTestQuestionId.title);
      expect(data.description).to.be.equal(updatedTestQuestionId.description);
    });
  });
});

describe("deleting a test question", () => {
  it("should be able to delete the test question", () => {
    cy.request({
      method: "DELETE",
      url: `${apiPath}/${deleteQuestionPath}`,
      body: updatedTestQuestion,
    }).then((response) => {
      const status = response.status;
      expect(status).to.be.equal(201);
    });
  });
});

describe("check if the test question is still there", () => {
  it("should not still be there", () => {
    cy.request({
      method: "POST",
      url: `${apiPath}/${checkQuestionExistencePath}`,
      body: updatedTestQuestion,
    }).then((response) => {
      const data = response.body;
      expect(data.exists).to.be.equal(false);
    });
  });
});
