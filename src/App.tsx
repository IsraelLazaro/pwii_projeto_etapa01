import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
import Home from './pages/home/Home';
import Login from './pages/login/login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz para /welcome */}
        <Route path="/" element={<Navigate to="/welcome" replace />} />

        {/* Rota da página Welcome */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
