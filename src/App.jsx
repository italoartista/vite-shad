



import './App.css'
import { LoginForm } from '@/components/login-form';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
      <Route path="/sign-up" element={<div>Sign Up Page</div>} />
      <Route path="/dashboard" element={<ProtectedRoute element={<div>Dashboard Page</div>} />} />
    </Routes>
  );
}


export default App
