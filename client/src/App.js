import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/me')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
