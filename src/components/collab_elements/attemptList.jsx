import { Card, Title, Text, Paper, Button, Select, Code, Space, Drawer, Group } from "@mantine/core";
import { Carousel } from '@mantine/carousel'
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { format } from "morgan";


const AttemptList = ({attempts}) => {
    if (attempts.length === 0) {
        return <Text>No attempts yet!</Text>;
    }

    console.log(attempts);

    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState(1);
    const [attemptKeys, setAttemptKeys] = useState([]);

    useEffect(() => {
        let index = 0;
        setAttemptKeys(attempts.map(att => {
            index += 1
            return index;
            }))
    }, [attempts])

    
    const handleSelect = (newValue) => {
        if (newValue !== null) {
            setValue(newValue);
        } else {
            setValue(value);
        }
    }

    function formatDate(date) {
        return date.substring(0,10) + ' ' + date.substring(11,19);
    }
    
    console.log(value);
    return (
        <>
        <Select
        placeholder='choose attempt'
        data={attemptKeys}
        value = {value}
        onChange={handleSelect}
        searchable
        nothingFoundMessage="No such questions found..."
        ></Select>
        <Space h= 'md'/>
        <Button variant="light" color="pink" onClick={open}>View Attempt</Button>

        <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{backgroundOpacity: 0.3, blur: 0}}
        >
            <Card withBorder shadow="sm" radius="sm">
            <Title order={4}>Attempt {value}</Title>
            <Space h="md"/>
            <Group>
            <Text fw={600}>Date: </Text>
            <Text>{attempts[value - 1].date_attempted.substring(0,10)}</Text>
            </Group>
            <Group>
            <Text fw={600}>Time: </Text>
            <Text>{attempts[value - 1].date_attempted.substring(11,19)}</Text>
            </Group>
            <Group>
            <Text fw={600}>Language: </Text>
            <Text>{attempts[value - 1].language}</Text>
            </Group>
            <Space h="md"/>
            <Code>
                {attempts[value - 1].code}
            </Code>
            </Card>
        </Drawer>


        
    </>

    );
    
}

export default AttemptList