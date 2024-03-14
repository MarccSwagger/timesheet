import './App.css';
import React from 'react';
import Routes from './routes/Routers';
import Header from './components/Header';

function App() {
  return (
    
    <div>

      <Header />

      <div>
        <Routes />
      </div>
    </div>
  );
}

export default App;
