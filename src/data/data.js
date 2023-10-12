import { v4 as uuid } from "uuid";

const uuid1 = uuid();
const uuid2 = uuid();
const uuid3 = uuid();

var exampleQuestion1 = {
  id: uuid1,
  questionName: "Reverse a String",
  question:
    "Write a function that reverses a string. The input string is given as an array of characters s.",
  difficultyLevel: "Medium",
  category: "Strings, Algorithms",
};

var exampleQuestion2 = {
  id: uuid2,
  questionName: "Valid Parenthesis",
  question:
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if input string is valid.",
  difficultyLevel: "Easy",
  category: "Data Structures",
};

var exampleQuestion3 = {
  id: uuid3,
  questionName: "Two Sum",
  question:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  difficultyLevel: "Easy",
  category: "Algorithms",
};

localStorage.clear();
localStorage.setItem(uuid1.toString(), JSON.stringify(exampleQuestion1));
localStorage.setItem(uuid2.toString(), JSON.stringify(exampleQuestion2));
localStorage.setItem(uuid3.toString(), JSON.stringify(exampleQuestion3));

var values = [];

const getAllData = () => {
  var keys = Object.keys(localStorage);

  for (let i = 0; i < keys.length; i++) {
    values.push(localStorage.getItem(keys[i]));
  }
};

getAllData();

export default values;