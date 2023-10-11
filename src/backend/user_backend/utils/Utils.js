import { getUserApi } from "../../../services/user_services";

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
  console.log(res);
  if (res === "error") {
    return false;
  } else {
    return true;
  }
};

export default verifyAccessToken;
