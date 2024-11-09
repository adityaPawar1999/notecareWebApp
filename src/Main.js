import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import AddNoteForm from './components/notes/AddNoteForm';
import App from './App'; 


function Main() {
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add-note" element={<AddNoteForm />} />
          <Route path="/app" element={<App />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
