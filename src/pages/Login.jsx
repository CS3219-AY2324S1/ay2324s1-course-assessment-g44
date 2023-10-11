import React, { useState } from "react";
import { Form } from "semantic-ui-react";
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
  Notification,
  TextInput,
  Textarea,
  SegmentedControl,
  CardSection,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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
        })
      );
      navigate("/viewQuestions");
      return;
    }
    const res = await loginUserApi(newUser);

    if (res.status == 201) {
      const userInfo = res.data;
      dispatch(
        login({
          username: userInfo.username,
          email: userInfo.email,
          accessToken: userInfo.accessToken,
          loggedIn: true,
        })
      )
      // await setData(newUser);
      navigate("/viewQuestions");
    } else if (res === "error") {
      setErrorMessage("Incorrect email or password provided!");
    }
  };

  // const setData = async (newUser) => {
  //   const req = { email: newUser.email };
  //   const res = await getUserApi(req);
  //   const userInfo = res.data.message.rows;
  //   const username = userInfo[0].username;
  //   dispatch(
  //     login({
  //       username: username,
  //       email: newUser.email,
  //       password: newUser.password,
  //       loggedIn: true,
  //     })
  //   );
  // };

  const signup = () => {
    navigate("/signup");
  };

  const isTimeOut = () => {
    const isTimeOut = location.state.isTimeOut;
    console.log('isTimeOut:', isTimeOut);
    if (isTimeOut) {
      window.history.replaceState({});
      return true;
    } else {
      return false;
    }
  }

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

          <TextInput
            required
            label="Password"
            placeholder="password"
            size="md"
            width="lg"
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
