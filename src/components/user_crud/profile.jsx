import { useSelector } from "react-redux";
import { selectUser } from "../../backend/user_backend/features/auth";
import Update from "./update.jsx";
import {
  Button,
  Flex,
  ThemeIcon,
  Card,
  Badge,
  Group,
  Space,
  Text,
  Stack,
} from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verifyAccessToken from "../../backend/user_backend/utils/Utils";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    verifyAccessToken(user).then((isVerified) => {
      if (!isVerified) {
        navigate("/login");
      }
    });
  });


  return (
    updateState ?
    <Update />
    :
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
            <Button
              variant="light"
              size="sm"
              color="green"
              onClick={() => setUpdateState(true)}
            >
              Edit profile
            </Button>
          </Flex>

          <Space v="xl" />
          <Stack>
            <Group>
              <Text ta="left" fw={500}>
                {user.username}{" "}
              </Text>
              <Badge color="pink" variant="light">
                Beginner
              </Badge>
            </Group>
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
  );
}
