import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure } from '@mantine/hooks';
// import { classnames } from "../components/collab_elements/general";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../components/hooks/useKeyPress";
import { AppShell, Burger, Button, Container, Group } from "@mantine/core";
import RoomMainArea from "../components/collab_elements/roomMainArea";

// const javascriptDefault = `/**
// * Problem: Binary Search: Search a sorted array for a target value.
// */

// // Time: O(log n)
// const binarySearch = (arr, target) => {
//  return binarySearchHelper(arr, target, 0, arr.length - 1);
// };

// const binarySearchHelper = (arr, target, start, end) => {
//  if (start > end) {
//    return false;
//  }
//  let mid = Math.floor((start + end) / 2);
//  if (arr[mid] === target) {
//    return mid;
//  }
//  if (arr[mid] < target) {
//    return binarySearchHelper(arr, target, mid + 1, end);
//  }
//  if (arr[mid] > target) {
//    return binarySearchHelper(arr, target, start, mid - 1);
//  }
// };

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const target = 5;
// console.log(binarySearch(arr, target));
// `;

const Room = () => {
  const [opened, { toggle }] = useDisclosure();
  const [processing, setProcessing] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  
  //   const handleCompile = () => {
  //     setProcessing(true);
  //     const formData = {
  //       language_id: language.id,
  //       // encode source code in base64
  //       source_code: btoa(code),
  //       stdin: btoa(customInput),
  //     };
  //     const options = {
  //       method: "POST",
  //       url: process.env.REACT_APP_RAPID_API_URL,
  //       params: { base64_encoded: "true", fields: "*" },
  //       headers: {
  //         "content-type": "application/json",
  //         "Content-Type": "application/json",
  //         "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
  //         "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  //       },
  //       data: formData,
  //     };

  //     axios
  //       .request(options)
  //       .then(function (response) {
  //         console.log("res.data", response.data);
  //         const token = response.data.token;
  //         checkStatus(token);
  //       })
  //       .catch((err) => {
  //         let error = err.response ? err.response.data : err;
  //         // get error status
  //         let status = err.response.status;
  //         console.log("status", status);
  //         if (status === 429) {
  //           console.log("too many requests", status);

  //           showErrorToast(
  //             `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
  //             10000
  //           );
  //         }
  //         setProcessing(false);
  //         console.log("catch block...", error);
  //       });
  //   };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <AppShell
      navbar={{ width: 750, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">Question goes here</AppShell.Navbar>

      <AppShell.Main>
        <RoomMainArea />
      </AppShell.Main>
    </AppShell>
  );
};

export default Room;
