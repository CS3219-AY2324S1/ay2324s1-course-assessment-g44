import { Accordion, Badge, Button, Group, Space, Text, Title, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { userMarkQuestionAsCompletedApi, userMarkQuestionAsIncompleteApi } from '../../services/user_services';


export function mapQuestions(questionList, completedList) {
    return questionList.map(item => {
        const completed = completedList.includes(item._id) ? true : false;
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



export const setComplete = (question, user) => {

    const req = {
        email: user.email,
        questionId: question.id
    }

    const res = userMarkQuestionAsCompletedApi(req).then(response => {
        console.log(response.status);
        return response;
    });

    const updatedQuestion = {
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        difficulty: question.difficulty,
        completed: true,
    };

    return updatedQuestion;

}



export const setIncomplete = (question, user) => {

    const req = {
        email: user.email,
        questionId: question.id
    }

    const res = userMarkQuestionAsIncompleteApi(req).then(response => {
        console.log(response.status);
        return response;
    });

    const updatedQuestion = {
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        difficulty: question.difficulty,
        completed: false,
    };

    return updatedQuestion;
}