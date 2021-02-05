import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';

function App() {
  return (
    <Router>
      <HomeScreen className='bg-gray-900' />
    </Router>
  );
}

export default App;
