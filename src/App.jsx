import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import View from "./components/view";
import Home from "./pages/home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


function App() {
  return (
    <MantineProvider >
      <Router>
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
    </MantineProvider>
  );
}

export default App;
