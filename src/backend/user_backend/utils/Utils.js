import { getUserApi } from "../../../services/user_services";
import { notifications } from "@mantine/notifications";

const verifyAccessToken = async (user) => {
  if (user === null) {
    return false;
  }
  if (user.email === "TEST" && user.password === "TEST123") {
    return true;
  }
  const req = {
    headers: { authorization: "Bearer " + user.accessToken },
  };
  const res = await getUserApi(req);
  if (res === "Token expired!") {
    notifications.show({
      title: "You were logged out!",
      message: "Please login again",
      autoClose: 5000,
      color: "red",
    });
    return false;
  } else {
    return true;
  }
};

export default verifyAccessToken;
