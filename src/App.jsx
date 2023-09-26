import "./App.css";
import Login from "./components/login"
import Signup from "./components/signup";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Router>
        <h2 className="main-header">Peer Prep (Team 44)</h2>
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
        <Routes>
          <Route path="/create" element={<Create />} />
        </Routes>
        <div style={{ marginTop: 20 }}>
          <Routes>
            <Route path="/read" element={<Read />} />
          </Routes>
        </div>
        <Routes>
          <Route path="/update" element={<Update />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
