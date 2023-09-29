import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import ViewQuestions from "./pages/ViewQuestions";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


function App() {
  return (
    <MantineProvider /*theme={theme} for colour scheme*/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/create" element={<Create/>} />
        </Routes>
        <div style={{ marginTop: 20 }}>
          <Routes>
            <Route path="/settings" element={<Settings/>} />
          </Routes>
        </div>
        <Routes>
          <Route path="/userprofile" element={<UserProfile/>} />
        </Routes>
        <Routes>
          <Route path="/viewquestions" element={<ViewQuestions/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
