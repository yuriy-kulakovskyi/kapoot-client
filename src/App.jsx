import './styles/App.css';

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home component link
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
