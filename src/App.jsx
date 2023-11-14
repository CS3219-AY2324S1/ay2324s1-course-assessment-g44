import "./App.css";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import ViewQuestions from "./pages/ViewQuestions";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/home";
// import Login from "./pages/Login";
// import Profile from "./components/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Logout from "./pages/Logout";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

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
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout/>} />
          </Routes>
        </Router>
        <Notifications />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
