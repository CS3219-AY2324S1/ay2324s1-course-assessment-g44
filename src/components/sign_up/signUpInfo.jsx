import {
  Container,
  Paper,
  Title,
  Text,
  Space,
  List,
  ThemeIcon,
} from "@mantine/core";
import classes from "../../css/Authentication.module.css";
import { IconCircleCheck, IconFlame, IconTrophy, IconUsers } from "@tabler/icons-react";

function SignUpInfo() {
  return (
    <Container size={700}>
      <Paper className={classes.form} radius={0} p={30} shadow="md">
        <Title ff="Verdana" fs={22} order={4}>
          {" "}
          Do you find yourself afraid of technical interviews?{" "}
        </Title>
        <Space h={30} />
        <Text lh="xs">
          Join us now! We are the world's leading platform in technical interview practice.
        </Text>
        <Space h={36} />
        <List
          spacing="lg"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <IconCircleCheck size="1rem" />
            </ThemeIcon>
          }
        >
          <List.Item>
            Practice commonly-tested questions in technical interviews
          </List.Item>
          <List.Item icon={
            <ThemeIcon color="pink" size={24} radius="xl">
                <IconUsers size="1rem" />
            </ThemeIcon>
          }
          >
            Connect with like-minded peers to discuss ideas
          </List.Item>
          <List.Item>Keep track of the questions you have completed</List.Item>
          <List.Item
            icon={
              <ThemeIcon color="red" size={24} radius="xl">
                <IconFlame size="1rem" />
              </ThemeIcon>
            }
          >
            More than 20 programming languages to choose from
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="yellow" size={24} radius="xl">
                <IconTrophy size="1rem" />
              </ThemeIcon>
            }
          >
            Succeed in your technical interviews!
          </List.Item>
        </List>
      </Paper>
    </Container>
  );
}

export default SignUpInfo;
