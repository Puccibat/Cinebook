import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Dropdown from './components/Dropdown';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import Infos from './components/Infos';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar';
import NewMovies from './components/NewMovies';
import Register from './components/Register';

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
