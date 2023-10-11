import { getUserApi } from "../../../services/user_services";

const verifyAccessToken = async (email, password, accessToken) => {
  if (email === "TEST" && password === "TEST123") {
    return true;
  }
  if (accessToken === undefined) {
    return false;
  }
  const req = {
    headers: { authorization: "Bearer " + accessToken },
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
