import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Chat from './pages/Chat';
import Home from './pages/Home';
import SignUp from './pages/SignUp';

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
      <Routes>
        <Route path='/' element={<Home user={user} setUser={setUser}/>}/>
        <Route path='/signup' element={ <SignUp setUser={setUser} /> }/>
        <Route path='/chat' element={ <Chat user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
