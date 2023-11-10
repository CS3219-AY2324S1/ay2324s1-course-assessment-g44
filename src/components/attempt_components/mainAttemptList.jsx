import { Card, Title, Text, Paper, Button, Select, Code, Table } from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconClock, IconCalendarEvent, IconPencil } from "@tabler/icons-react";
import { format } from "morgan";
import { getAttemptsApi } from "../../services/user_services";
import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";
import axios from "axios";


const MainAttemptList = ({questionId}) => {

    const [question, setQuestion] = useState({});
    const [attempts, setAttempts] = useState([]); 
    const user = useSelector(selectUser);

    useEffect(() => {
        axios.get("http://localhost:3001/routes/getQuestions").then(response => {
            const allQuestions = response.data;
            const q = allQuestions.filter(ques => ques._id === questionId)[0];
            setQuestion(q); 
        }).catch(error => console.error(error));
    }, []);
   
    useEffect(() => {
        getAttemptsApi({email: user.email}).then(res => {
            const allAttempts = res.data.message.rows; 
            const questionAttempts = allAttempts.filter(att =>  att.question_id === question._id);
            setAttempts(questionAttempts);
        });
    }, [question]);


    let attNo = attempts.length + 1;
    const rows = attempts.reverse().map(att => {
        attNo -= 1;
        return (
        <Table.Tr key={att.id}>
            <Table.Td>{attNo}</Table.Td>
            <Table.Td>{formatDate(att.date_attempted)}</Table.Td>
            <Table.Td>{att.language_label}</Table.Td>
            <Table.Td><Button variant='subtle' size='xs' onClick={() => handleNavigate(q.id)}>View</Button></Table.Td>
        </Table.Tr> 
)});

      console.log(rows);

    function formatDate(date) {
        return date.substring(0,10);
    }

    function formatTime(date) {
        return date.substring(11,19);
    }
  

    
    return (
        <>
        <Table striped>
            <Table.Thead> 
              <Table.Tr>
                <Table.Th>Attempt</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Language</Table.Th>
                <Table.Th></Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </>

    );
    
}

export default MainAttemptList;