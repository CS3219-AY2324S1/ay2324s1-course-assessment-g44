import { Accordion, Badge, Button, Group, Space, Text, Title, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';


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





