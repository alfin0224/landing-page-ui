import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameCatalog from './pages/GameCatalog';
import GameDetail from './pages/GameDetail';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<GameCatalog />} />
            <Route path="/game/:id" element={<GameDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
