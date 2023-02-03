import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sorteio from "./pages/Sorteio";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sorteio />} />
      </Routes>
    </Router>
  );
}

export default App;
