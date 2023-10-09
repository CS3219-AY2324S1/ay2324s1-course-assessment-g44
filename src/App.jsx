import "./App.css";
import Login from "./components/login"
import Signup from "./components/signup";
import Read from "./components/read";
import Update from "./components/update";
import ViewQuestions from "./pages/ViewQuestions";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
// import Login from "./pages/Login";
import Profile from "./components/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider /*theme={theme} for colour scheme*/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update" element={<Update />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewQuestions" element={<ViewQuestions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
