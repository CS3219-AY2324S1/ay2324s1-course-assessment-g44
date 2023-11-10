import { Card, Title, Text, Paper, Button, Select, Code, Space, Group } from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconClock, IconCalendarEvent, IconChessRook, IconCalendar, IconArrowLeft } from "@tabler/icons-react";
import { format } from "morgan";
import { getAttemptsApi } from "../../services/user_services";
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";
import axios from "axios";
import MainAttemptList from "./mainAttemptList";


const Attempt = ({attempt, questionId, attNo}) => {

    const [backState, setBackState] = useState(false);


    function formatDate(date) {
        return date.substring(0,10);
    }

    function formatTime(date) {
        return date.substring(11,19);
    }

    function handleBack() {
        setBackState(true);
    }
  

    
    return (
        backState ? <MainAttemptList questionId={questionId}/> :
        <>
        <Space h="md"/>
        <Card withBorder radius='sm'>
            <Group>
            <Text fw={500} size="lg">Attempt {attNo}</Text>
            <Space w="md"/>
            </Group>
            <Space h="xs"/>
            <Group>
            <IconCalendar size={12}/>
            <Text size="xs"> {formatDate(attempt.date_attempted)}</Text>
            <Space w="md"/>
            <IconClock size={12}/>
            <Text size="xs"> {formatTime(attempt.date_attempted)}</Text>
            </Group>
            <Space h="md"/>
            <Space h="xl"/>
            <Text size="sm"> {attempt.language_label}</Text>
            <CodeHighlight code={attempt.code} language={attempt.language_id}/>
            <Space h="xl"/>
            <Button variant="subtle" onClick={handleBack} leftSection={<IconChessRook size={16}/>}>Choose a different attempt?</Button>
        </Card>
        </>

    );
    
}

export default Attempt;