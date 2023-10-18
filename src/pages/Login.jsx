import React, { useState } from "react";
import { loginUserApi, getUserApi } from "../services/user_services";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../backend/user_backend/features/auth";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  Group,
  Space,
  Text,
  TextInput,
  PasswordInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [visible, {toggle}] = useDisclosure(false);

  const newUser = {
    email: "",
    password: "",
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    newUser.email = values.email;
    newUser.password = values.password;
    // for testing purposes, to be removed!
    if (newUser.email === "TEST" && newUser.password === "TEST123") {
      dispatch(
        login({
          email: newUser.email,
          password: newUser.password,
          role: "admin",
        })
      );
      navigate("/viewQuestions");
      return;
    }
    const res = await loginUserApi(newUser);

    if (res === "This account has not been registered, please sign up first!" || res === "Incorrect email or password provided!") {
      setErrorMessage(res);
    } else {
      const userInfo = res;
      dispatch(
        login({
          username: userInfo.username,
          email: newUser.email,
          password: newUser.password,
          accessToken: userInfo.accessToken,
          role: userInfo.role,
          loggedIn: true,
        })
      )
      navigate("/viewQuestions");
    }
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <Group align="center" justify="center">
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Text fw={700} ta="center" size="xl">
          Peerprep
        </Text>

        <Space h="md" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            withAsterisk
            size="md"
            label="Email"
            placeholder="email"
            {...form.getInputProps("email")}
          />
          <Space h="md" />

          <PasswordInput
            required
            label="Password"
            placeholder="password"
            size="md"
            width="lg"
            visible={visible}
            onVisibilityChange={toggle}
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
              color="grape"
              type="submit"
              size="md"
            >
              Login
            </Button>
          </Group>

          <Space h="xl" />

          <Group>
            <Button 
            fullWidth
              variant="transparent"
              color="blue"
              type="reset"
              size="md"
              justify="right"
              onClick={signup}
            >
              <Text td="underline" ta="center">
                Sign up as a new user
              </Text>
            </Button>
          </Group>
        </form>
      </Card>
    </Group>
  );
}
