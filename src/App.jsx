import "./App.css";
import Login from "./components/login"
import Signup from "./components/signup";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import ViewQuestions from "./pages/ViewQuestions";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
        </Routes>
        <Routes>
          <Route path="/create" element={<Create />} />
        </Routes>
          <Routes>
            <Route path="/read" element={<Read />} />
          </Routes>
        <Routes>
          <Route path="/update" element={<Update />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route path='/viewQuestions' element={<ViewQuestions />} />
        </Routes>
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
