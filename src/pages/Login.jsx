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
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Checkbox,
  Grid,
  Image,
  rem,
  Center,
  Container,
  BackgroundImage,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import classes from "../css/Authentication.module.css";
import Logo from "../images/logo2.png";
import student from "../images/student_coding_peerprep.jpeg";
import LightModeAndDarkModeButton from "../components/buttons/lightModeAndDarkModeButton";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [visible, { toggle }] = useDisclosure(false);

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

    if (res === "This account has not been registered, please sign up first!") {
      form.setErrors({ email: res });
    } else if (res === "Incorrect email or password provided!") {
      form.setErrors({ password: res });
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
          completedQuestions: userInfo.completedQuestions,
        })
      );
      navigate("/viewQuestions");
    }
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <BackgroundImage src={student} radius="sm" h={850}>
      <Container size={420}>
        <Paper
          className={classes.form}
          radius={0}
          p={30}
          shadow="md"
        >
          <Image src={Logo} radius="sm" />
          <Space h="md" />
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Welcome to PeerPrep!
          </Title>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email address"
              placeholder="Your email"
              size="md"
              required
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              required
              withAsterisk
              {...form.getInputProps("password")}
            />
            <Group>
              <Checkbox label="Keep me logged in" mt="xl" size="md" />
              {/* <Space w="xl" />
              <Space w={30} />
              <Box mt="xl">
                <LightModeAndDarkModeButton />
              </Box> */}
            </Group>
            <Button fullWidth mt="xl" size="md" type="submit">
              Login
            </Button>
          </form>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor href="#" fw={700} onClick={signup}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </BackgroundImage>
  );
}
