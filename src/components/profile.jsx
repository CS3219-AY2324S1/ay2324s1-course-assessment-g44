import { useSelector } from "react-redux";
import { selectUser } from "../backend/user_backend/features/auth";
import {
  Button,
  Flex,
  ThemeIcon,
  Card,
  Badge,
  Group,
  Space,
  Text,
  Notification,
  TextInput,
  Textarea,
  SegmentedControl,
  CardSection,
  Stack,
} from "@mantine/core";
import { IconHeart, IconUser } from "@tabler/icons-react";
import { useEffect } from "react";
import { getUserApi } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import verifyAccessToken from "../backend/user_backend/utils/Utils";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    verifyAccessToken(user).then(isVerified => {
      if (!isVerified && user) {
        navigate("/login", { state: {isTimeOut: true} });
      } else if (!isVerified && !user) {
        navigate("/login");
      }
    })
  });

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
        <Card.Section>
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
              <ThemeIcon variant="filled" size="xl" color="grey">
                <IconUser />
              </ThemeIcon>
              <Badge color="pink" variant="light">
                Beginner
              </Badge>
            </Flex>

            <Space v="xl" />
            <Stack>
              <Text ta="left" fw={500}>
                {user.username}{" "}
              </Text>
              <Text ta="left" fw={400}>
                Email: {user.email}{" "}
              </Text>
            </Stack>
          </Group>
        </Card.Section>

        <Card.Section>
          <Space v="md" />
        </Card.Section>
      </Card>
    </div>
  );
}
