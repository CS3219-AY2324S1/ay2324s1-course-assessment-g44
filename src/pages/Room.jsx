import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
// import { classnames } from "../components/collab_elements/general";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../components/hooks/useKeyPress";
import {
  AppShell,
  Text,
  Card,
  Space,
  Badge,
  Group,
  ActionIcon,
  ScrollArea,
  Select,
} from "@mantine/core";
import {
  IconQuestionMark,
  IconThumbUpFilled,
  IconThumbDownFilled,
  IconHeartFilled,
  IconHeart,
} from "@tabler/icons-react";
import RoomMainArea from "../components/collab_elements/roomMainArea";
import { useLocation } from "react-router-dom";
import { selectUser } from "../backend/user_backend/features/auth";
import { useSelector } from "react-redux";
import axios from "axios";

const Room = () => {
  const [opened, { toggle }] = useDisclosure();
  const [processing, setProcessing] = useState(null);
  const location = useLocation();
  const { username, question, roomID} = location.state;
  const user = useSelector(selectUser);

  const [filteredQns, setFilteredQns] = useState();
  const [filteredTitles, setFilteredTitles] = useState();
  const [value, setValue] = useState('');

  const [qnTitle, setQnTitle] = useState();
  const [qnDiff, setQnDiff] = useState();
  const [qnCat, setQnCat] = useState();
  const [qnDesc, setQnDesc] = useState();


  const questionJSON = JSON.parse(JSON.stringify(question));

  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [favourited, setFavourited] = useState(false);

  const getQuestions = async () => {
    const res = await axios.get("http://localhost:3001/routes/getQuestions");
    const questions = res.data;
    const filtered = questions.filter(
      (question) => question.difficulty === questionJSON.difficulty.toLowerCase()
    );

    for (let i = 0; i < filtered.length; i++) {
      filtered[i] = JSON.stringify(filtered[i]);
    }
    setFilteredQns(filtered);
  };

  const getTitles = async () => {
    const res = await axios.get("http://localhost:3001/routes/getQuestions");
    const questions = res.data;
    const filtered = questions.filter(
      (question) => question.difficulty === questionJSON.difficulty.toLowerCase()
    );

    for (let i = 0; i < filtered.length; i++) {
      filtered[i] = filtered[i].title;
    }
    setFilteredTitles(filtered);
  };

  const handleThumbsUp = () => {
    setThumbsUp(!thumbsUp);
    setThumbsDown(false);
  };

  const handleThumbsDown = () => {
    setThumbsDown(!thumbsDown);
    setThumbsUp(false);
  };

  const handleFavourited = () => {
    setFavourited(!favourited);
  };

  const onSelectQuestion = () => {
    getQuestions();
    const filtered = filteredQns
    for (let i = 0; i < filtered.length; i++) {
      filtered[i] = JSON.parse(filtered[i]);
    }
    for (let i = 0; i < filtered.length; i++) {
      const f = filtered[i];
      if (f.title == value) {
        setQnTitle(f.title);
        setQnCat(f.category);
        setQnDiff(f.difficulty);
        setQnDesc(f.description);
      }
    }
  }

  useEffect(() => {

  });

  return (
    <AppShell
      navbar={{ width: 400, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Text ta="center">
          Dear{" "}
          <Text span c="blue" fw={500} inherit>
            {user.username}
          </Text>
          , you are matched with{" "}
          <Text span c="blue" fw={500} inherit>
            {username}
          </Text>
          !
        </Text>
        <Space h="md" />
        <Text size="xs" c="dimmed">
          Feel free to use the chatbox to communicate with each other, or use
          the collaborative code editor to start coding immediately!
        </Text>

        <Space h="lg" />
        <ScrollArea>
        <Select
              placeholder={qnTitle ? qnTitle : questionJSON.title}
              data={filteredTitles}
              value = {value}
              onChange={setValue}
              onSelect={onSelectQuestion}
              onClick={getTitles}
              searchable
              nothingFoundMessage="No such questions found..."

            ></Select>
            <Space h="sm"/>
          <Card shadow="sm" padding="sm" radius="sm" withBorder>

            <Group>
              <Text size="xl" span fw={600}>
                {qnTitle ? qnTitle : questionJSON.title}
              </Text>
            </Group>
            <Space h="md" />
            <Group>
              <Badge variant="light" color="green">
                {qnDiff ? qnDiff : questionJSON.difficulty}
              </Badge>
              <ActionIcon
                radius="lg"
                variant={thumbsUp ? "filled" : "default"}
                color="black"
                onClick={handleThumbsUp}
              >
                <IconThumbUpFilled style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
              <ActionIcon
                radius="lg"
                variant={thumbsDown ? "filled" : "default"}
                color="black"
                onClick={handleThumbsDown}
              >
                <IconThumbDownFilled style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
              <ActionIcon
                radius="lg"
                variant={favourited ? "filled" : "default"}
                aria-label="thumbs-up"
                color="red"
                onClick={handleFavourited}
              >
                <IconHeart style={{ width: "70%", height: "70%" }} />
              </ActionIcon>
            </Group>
            <Space h="lg" />
            <Text>
              <Text span fw={600}>
                {" "}
                Category:
              </Text>{" "}
              {qnCat ? qnCat : questionJSON.category}
            </Text>
            <Space h="lg" />
            <Text span fw={600}>
              Description:
            </Text>
            <Text> {qnDesc ? qnDesc : questionJSON.description}</Text>
          </Card>
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <RoomMainArea roomID={roomID} />
      </AppShell.Main>
    </AppShell>
  );
};

export default Room;
