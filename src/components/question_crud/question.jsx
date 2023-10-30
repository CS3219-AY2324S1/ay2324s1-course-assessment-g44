import { Accordion, Badge, Button, Group, Space, Text, Title, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { userMarkQuestionAsCompletedApi, userMarkQuestionAsIncompleteApi } from '../../services/user_services';
import { useDispatch } from "react-redux";
import { login } from "../../backend/user_backend/features/auth";


export function mapQuestions(questionList, completedList) {
    if (completedList === null) {
        completedList = [];
    }
    return questionList.map(item => {
        const completed = Object.values(completedList).includes(item._id) ? true : false;
        const mappedQuestion = {
            id: item._id,
            title: item.title,
            description: item.description,
            category: item.category,
            difficulty: item.difficulty,
            completed: completed,
        }
        return mappedQuestion;
    });
}

export const difficultyBadge = (questionDifficulty) => {
    return (
      questionDifficulty === "easy" ? <Badge color="green" size="sm">Easy</Badge> :
      questionDifficulty === "medium" ? <Badge color="orange" size="sm">Medium</Badge> :
      <Badge color="red" size="sm">Hard</Badge>
    );
  }


export const completedBadge = (questionCompleted) => {
    const iconCheck = <IconCheck style={{ width: rem(12), height: rem(12) }} />;
    return (
      questionCompleted ? <Badge rightSection={iconCheck} color="grey" size="sm" variant="light">Completed</Badge> : null
    );
  }



export const setComplete = async (question, user) => {
    const req = {
        email: user.email,
        questionId: question.id
    }

    const res = await userMarkQuestionAsCompletedApi(req);
    // .then(response => {
    //     console.log(response);
    //     return response;
    // });

    const updatedQuestion = {
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        difficulty: question.difficulty,
        completed: true,
    };


    let updatedCompletedList = user.completedQuestions === null ? [] : [...Object.values(user.completedQuestions)];
    updatedCompletedList.push(question.id);
    console.log(updatedQuestion);

    //setUpdatedUser(user, updatedCompletedList);

    return [updatedQuestion, updatedCompletedList];

}



export const setIncomplete = async (question, user) => {

    const req = {
        email: user.email,
        questionId: question.id
    }

    const res = await userMarkQuestionAsIncompleteApi(req);
    // .then(response => {
    //     console.log(response.status);
    //     return response;
    // }
    // );

    const updatedQuestion = {
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        difficulty: question.difficulty,
        completed: false,
    };

    let updatedCompletedList = user.completedQuestions === null ? [] : [...Object.values(user.completedQuestions)];
    const index = updatedCompletedList.findIndex(x => {
        return x === question.id;
    })
    
    updatedCompletedList.splice(index, 1);
    console.log(typeof updatedCompletedList);

    return [updatedQuestion, updatedCompletedList];
}



const setUpdatedUser = async (user, completedList) => {
    const dispatch = useDispatch();

    dispatch(
        login({
            email: user.email,
            username: user.username,
            password: user.password,
            accessToken: user.accessToken,
            loggedIn: true,
            completedQuestions: completedList,
          })
    );
} 