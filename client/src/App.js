import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './core/About';
import Dropdown from './core/Dropdown';
import Footer from './core/Footer';
import Header from './core/Header';
import HomeScreen from './core/HomeScreen';
import Infos from './core/Infos';
import MovieDetail from './core/MovieDetail';
import Navbar from './core/Navbar';
import NewMovies from './core/NewMovies';
import Register from './user/Register';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    <Router>
      <Header />
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/movie/:movieId' exact component={MovieDetail} />
        <Route path='/infos' exact component={Infos} />
        <Route path='/about' exact component={About} />
        <Route path='/newMovies' exact component={NewMovies} />
        <Route path='/register' exact component={Register} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
