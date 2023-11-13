import "./App.css";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import ViewQuestions from "./pages/ViewQuestions";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Home from './pages/home';
import MatchFound from "./components/matching_elements/matchFound"
import Room from "./pages/Room"
import ChatboxPage from "./pages/ChatboxPage";

// import Login from "./pages/Login";
// import Profile from "./components/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Logout from "./pages/Logout";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import TagQuestions from "./pages/TagQuestions";
import QuestionNavbar from "./components/question_crud/questionNavbar";

function App() {
  
  return (
    <MantineProvider /*theme={theme} for colour scheme*/>
      <ModalsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/viewQuestions" element={<ViewQuestions />} />
            <Route path="tagQuestions" element={<TagQuestions/>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/room/:roomID" element={<Room/>}/>
            <Route path="/logout" element={<Logout/>} />
            <Route path="/chatbox" element={<ChatboxPage/>} />
          </Routes>
        </Router>
        <Notifications/>
      </ModalsProvider>
    </MantineProvider>
  );
}

// test commit

export default App;
