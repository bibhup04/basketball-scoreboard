import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Scoreboard from "./components/Scoreboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Scoreboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
