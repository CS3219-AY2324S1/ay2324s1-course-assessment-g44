import React, { useState } from "react";
import { createUserApi } from "../services/user_services";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Group,
  Space,
  Text,
  TextInput,
  PasswordInput,
  rem
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../backend/user_backend/features/auth";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
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
      confirmPassword: "",
    },
    validate: {
      password: (values) => (values.length < 5 ? "Password should be at least 6 characters!" : null),
    }
  });

  const postData = async (values) => {
    if (values.password !== values.confirmPassword) {
      form.setErrors({ confirmPassword: "Password and confirm password should be the same!" });
      return;
    }
    newUser.email = values.email;
    newUser.username = values.username;
    newUser.password = values.password;
    const res = await createUserApi(newUser);
    if (res === "User created!") {
      await setData(newUser);
      notifications.show({
        title: "Successful sign up!",
        message: "Enjoy using PeerPrep!",
        color: "green",
        autoClose: 5000,
        icon: <IconCheck />
      })
      navigate("/login");
    } else {
      form.setErrors({ email: res });
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

          <PasswordInput
            required
            label="Password"
            placeholder="password"
            size="md"
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("password")}
          />
          <Space h="md" />

          <PasswordInput
            required
            label="Confirm password"
            placeholder="Confirm password"
            size="md"
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("confirmPassword")}
          />
          <Space h="md" />

          {/* <Text size="md" c="red" fw={500}>
            {errorMessage && <p className="error"> {errorMessage} </p>}
          </Text> */}

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
