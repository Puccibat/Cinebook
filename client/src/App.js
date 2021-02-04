import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <h1 className='text-6xl'>Hello Wolrd</h1>
      <Footer />
    </Router>
  );
}

export default App;
