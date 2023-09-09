import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Router>
        <h2 className="main-header">Peer Prep (Team 44)</h2>
        <div>
          <Routes>
            <Route path="/create" element={<Create/>} />
          </Routes>
        </div>
        <div style={{ marginTop: 20 }}>
          <Routes>
            <Route path="/read" element={<Read/>} />
          </Routes>
        </div>
        <Routes>
          <Route path="/update" element={<Update/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
