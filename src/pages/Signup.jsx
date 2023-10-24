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
  rem,
  Title,
  Grid,
  Anchor
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../backend/user_backend/features/auth";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import SignUpInfo from "../components/sign_up/signUpInfo";

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
      password: (values) =>
        values.length < 5 ? "Password should be at least 6 characters!" : null,
    },
  });

  const postData = async (values) => {
    if (values.password !== values.confirmPassword) {
      form.setErrors({
        confirmPassword: "Password and confirm password should be the same!",
      });
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
        icon: <IconCheck />,
      });
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
    <Grid gutter={0}>
      <Grid.Col offset={2} span={4}>
        <SignUpInfo />
      </Grid.Col>
      <Grid.Col span={4}>
        <Card shadow="sm" radius="md" withBorde padding="xl">
          <Title fw={700} ta="center" order={3}>
            Sign up with PeerPrep
          </Title>

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

            <Group mt="md">
              <Button fullWidth mt="xl" size="md" type="submit">
                Register
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
                <Anchor td="underline" c="grape">Log in with an existing account</Anchor>
              </Button>
            </Group>
            {/* <Anchor fw={700} onClick={login} td="underline" c="grape" >
              Log in with an existing account
            </Anchor> */}
          </form>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
