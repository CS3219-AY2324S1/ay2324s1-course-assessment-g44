import React, { useState } from "react";
import { createUserApi } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Group,
  Space,
  Text,
  Notification,
  TextInput,
  Textarea,
  SegmentedControl,
  CardSection,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../backend/user_backend/features/auth";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const newUser = {
    email: "",
    username: "",
    password: "",
  };

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const postData = async (values) => {
    newUser.email = values.email;
    newUser.username = values.username;
    newUser.password = values.password;
    const res = await createUserApi(newUser);
    if (res.status == 201) {
      await setData(newUser);
      navigate("/viewQuestions");
    } else if (res === "error") {
      setErrorMessage(
        "An account with this email exists! Please log in instead."
      );
    }
  };

  const setData = async (newUser) => {
    dispatch(
      login({
        email: newUser.email,
        username: newUser.username,
        password: newUser.password,
        loggedIn: true,
      })
    );
  };

  const loginpage = () => {
    navigate("/login");
  };

  return (
    <Group align="center" justify="center">
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Text fw={700} ta="center" size="xl">
          Peerprep
        </Text>

        <Space h="md" />

        <form onSubmit={form.onSubmit(postData)}>
          <TextInput
            required
            withAsterisk
            size="md"
            label="Email"
            placeholder="email"
            {...form.getInputProps("email")}
          />
          <Space h="md" />

          <TextInput
            required
            withAsterisk
            size="md"
            label="Username"
            placeholder="username"
            {...form.getInputProps("username")}
          />
          <Space h="md" />

          <TextInput
            required
            label="Password"
            placeholder="password"
            size="md"
            {...form.getInputProps("password")}
          />
          <Space h="md" />

          <Text size="md" c="red" fw={500}>
            {errorMessage && <p className="error"> {errorMessage} </p>}
          </Text>

          <Space h="md" />

          <Group mt="md">
            <Button
              fullWidth
              variant="light"
              color="blue"
              type="submit"
              size="md"
            >
              Sign up
            </Button>
          </Group>

          <Space h="xl" />
          <Group>
            <Button
            fullWidth
              variant="transparent"
              color="grape"
              size="md"
              onClick={loginpage}
            >
                <Text td="underline">Log in with an existing account</Text>

            </Button>
          </Group>
        </form>
      </Card>
    </Group>
  );
}
