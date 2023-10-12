import { useSelector } from "react-redux";
import { selectUser } from "../backend/user_backend/features/auth";
import {Button, Flex, ThemeIcon, Card, Badge, Group, Space, Text, Notification, TextInput, Textarea, SegmentedControl, CardSection, Stack } from '@mantine/core';
import { IconHeart, IconUser } from '@tabler/icons-react';

export default function Profile() {
  const user = useSelector(selectUser);
  // console.log("user: " + user);
  const email = user.email;
  const username = user.username;
  // const email = localStorage.getItem("email");
  // const username = localStorage.getItem("username");

  return (
    <div>
      {/* <h3>User Profile</h3>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Username</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{username}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table> */}
        <Space h="xl" />

      <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section >

      <Group justify="left" mt="md" mb="xs">
      <Space v="xl" />
      <Space v="xl" />
      
      <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <ThemeIcon
          variant="filled"
          size="xl"
          color="grey"
        >
        <IconUser/>
      </ThemeIcon>
      <Badge color="pink" variant="light">
          Beginner
        </Badge>
        </Flex>

      <Space v="xl" />
      <Stack>
        <Text ta="left" fw={500}>{username} </Text>
        <Text ta="left" fw={400}>Email: {email} </Text>
        </Stack>
      </Group>
      </Card.Section>

      <Card.Section >
      
      <Space v="md" />




      </Card.Section>
      </Card>
    </div>
  );
}
