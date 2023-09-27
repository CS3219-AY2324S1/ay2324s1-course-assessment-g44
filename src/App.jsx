import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import View from "./components/view";
import Home from "./components/home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="main">
      <Router>
        <h2 className="main-header">Peer Prep (Team 44)</h2>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
        <Routes>
          <Route path="/create" element={<Create/>} />
        </Routes>
        <div style={{ marginTop: 20 }}>
          <Routes>
            <Route path="/read" element={<Read/>} />
          </Routes>
        </div>
        <Routes>
          <Route path="/update" element={<Update/>} />
        </Routes>
        <Routes>
          <Route path="/view" element={<View/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
