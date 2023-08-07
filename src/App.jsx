// React import
import React from 'react';

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

// CreateTest component link
import CreateTest from "./components/pages/CreateTest/CreateTest";

// HostTest component link
import HostTest from './components/pages/HostTest/HostTest';

// Play component link
import Play from './components/pages/Play/Play';

// Game component link
import Game from './components/pages/Play/Game';

// Results component link
import Results from './components/pages/HostTest/Results';

// Library component link
import Library from './components/pages/Library/Library';

// Settings component link
import Settings from './components/pages/Settings/Settings';

// Edit component link
import Edit from './components/pages/Edit/Edit';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-kapoot" element={<CreateTest />} />

          <Route path="/host-kapoot" element={
                              <HostTest 
                              enTitle="Host a kapoot"
                              uaTitle="Створити капут"
                              plTitle="Stwórz kaput"
                              enDescription="Choose a kapoot to play"
                              uaDescription="Виберіть kapoot, який будете грати"
                              plDescription="Wybierz kaput, który będziesz grać"
                               />
                            } />
                            
          <Route path="/play-kapoot" element={<Play />} />
          <Route path="/library" element={<Library />} />
          <Route path="/host" element={<Results />} />
          <Route path="/game" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
