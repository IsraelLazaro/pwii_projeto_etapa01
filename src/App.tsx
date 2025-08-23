import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
import Welcom_2 from './pages/Welcome_2/Welcome_2';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import FAQPage from './pages/FAQ';
import { AuthProvider } from './context/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';
import PetForms from './pages/petForms/PetForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/Welcom_2" element={<Welcom_2 />} />
          <Route path="/Register" element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path="/Profile" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }/>   
          <Route path="/PetForms" element={
              <ProtectedRoute>
                <PetForms />
              </ProtectedRoute>
            }
          />
          <Route path="/PetForms/:id" element={
              <ProtectedRoute>
                <PetForms />
              </ProtectedRoute>
            }
          />
          <Route path="/Faq" element={<FAQPage/>} />   
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;