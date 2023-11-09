import { Card, Title, Text, Paper, Button, Select, Code, Space, Drawer, Group, HoverCard, HoverCardDropdown } from "@mantine/core";
import { CodeHighlight } from '@mantine/code-highlight';
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IconClock, IconCalendarEvent, IconPencil } from "@tabler/icons-react";
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
        required
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
            <HoverCard>
                <HoverCard.Target>
                    <IconCalendarEvent size={18}/>
                </HoverCard.Target>
                <HoverCard.Target>
                    <Text>{attempts[value - 1].date_attempted.substring(0,10)}</Text> 
                </HoverCard.Target>
                <HoverCard.Dropdown><Text size="xs">Date attempted</Text></HoverCard.Dropdown>
            </HoverCard>
            <Space w="lg"/>
            <HoverCard>
                <HoverCard.Target>
                    <IconClock size={18}/>
                </HoverCard.Target>
                <HoverCard.Target>
                    <Text>{attempts[value - 1].date_attempted.substring(11,19)}</Text>
                </HoverCard.Target>
                <HoverCard.Dropdown><Text size="xs">Time attempted</Text></HoverCard.Dropdown>
            </HoverCard>
            </Group>
            <Space h="xl"/>
            <Group>
                <IconPencil size={18}/>
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