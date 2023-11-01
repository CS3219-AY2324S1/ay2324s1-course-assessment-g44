import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
// import { classnames } from "../components/collab_elements/general";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../components/hooks/useKeyPress";
import {
  AppShell,
  Text,
  Title,
  Card,
  CardSection,
  Space,
  Badge,
  Group,
  Paper,
  ThemeIcon,
  ActionIcon,
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

// const javascriptDefault = `/**
// * Problem: Binary Search: Search a sorted array for a target value.
// */

// // Time: O(log n)
// const binarySearch = (arr, target) => {
//  return binarySearchHelper(arr, target, 0, arr.length - 1);
// };

// const binarySearchHelper = (arr, target, start, end) => {
//  if (start > end) {
//    return false;
//  }
//  let mid = Math.floor((start + end) / 2);
//  if (arr[mid] === target) {
//    return mid;
//  }
//  if (arr[mid] < target) {
//    return binarySearchHelper(arr, target, mid + 1, end);
//  }
//  if (arr[mid] > target) {
//    return binarySearchHelper(arr, target, start, mid - 1);
//  }
// };

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const target = 5;
// console.log(binarySearch(arr, target));
// `;

const Room = () => {
  const [opened, { toggle }] = useDisclosure();
  const [processing, setProcessing] = useState(null);
  const location = useLocation();
  const { username, question, roomID } = location.state;
  const user = useSelector(selectUser);
  const questionJSON = JSON.parse(JSON.stringify(question));
  const [thumbsUp, setThumbsUp] = useState(false);
  const [thumbsDown, setThumbsDown] = useState(false);
  const [favourited, setFavourited] = useState(false);

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

  return (
    <AppShell
      navbar={{ width: 750, breakpoint: "sm", collapsed: { mobile: !opened } }}
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

        <Card shadow="sm" padding="sm" radius="sm" withBorder>
          <Group>
            <Text size="xl" span fw={600}>
              {questionJSON.title}
            </Text>
          </Group>
          <Space h="md" />
          <Group>
            <Badge variant="light" color="green">
              {questionJSON.difficulty}
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
            {questionJSON.category}
          </Text>
          <Space h="lg" />
          <Text span fw={600}>
            Description:
          </Text>
          <Text> {questionJSON.description}</Text>
        </Card>
      </AppShell.Navbar>

      <AppShell.Main>
        <RoomMainArea roomID={roomID} />
      </AppShell.Main>
    </AppShell>
  );
};

export default Room;
