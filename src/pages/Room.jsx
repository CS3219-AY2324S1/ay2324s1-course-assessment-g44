import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDisclosure } from '@mantine/hooks';
// import { classnames } from "../components/collab_elements/general";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "../components/hooks/useKeyPress";
import { AppShell, Burger, Button, Container, Group } from "@mantine/core";
import RoomMainArea from "../components/collab_elements/roomMainArea";
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const { username, question, roomID } = location.state;

  return (
    <AppShell
      navbar={{ width: 750, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="md">Question: {question}</AppShell.Navbar>

      <AppShell.Main>
        <RoomMainArea roomID={roomID}/>
      </AppShell.Main>
    </AppShell>
  );
};

export default Room;
