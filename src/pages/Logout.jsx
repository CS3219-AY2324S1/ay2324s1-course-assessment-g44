import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../backend/user_backend/features/auth";
import { useDispatch } from "react-redux";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // clears the local storage of the access token
    dispatch(login({}));
    navigate('/login');
  });

  return (
    <></>
  );
}

export default Logout;
