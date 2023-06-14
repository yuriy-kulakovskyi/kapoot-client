import './styles/App.css';

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home component link
import Home from "./components/pages/Home/Home";

// Signup component link
import Signup from "./components/pages/Signup/Signup";

// AuthProvider
import { AuthProvider } from './contexts/AuthContext';

// Login component link
import Login from "./components/pages/Login/Login";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
