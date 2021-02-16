import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashoard from './admin/AdminDashoard';
import AdminMovieList from './admin/AdminMovieList';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import About from './core/About';
import Footer from './core/Footer';
import Header from './core/Header';
import HomeScreen from './core/HomeScreen';
import Infos from './core/Infos';
import MovieDetail from './core/MovieDetail';
import NewMovies from './core/NewMovies';
import MyProfile from './user/MyProfile';
import Register from './user/Register';
import { isAuth } from './auth/ApiAuth';
import AddMovie from './admin/AddMovie';
import Registered from './user/Registered';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [isLogged, setIsLogged] = useState(isAuth());
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
      <Header
        toggle={toggle}
        isOpen={isOpen}
        setIsLogged={setIsLogged}
        isLogged={isLogged}
      />
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/movie/:movieId' exact component={MovieDetail} />
        <Route path='/infos' exact component={Infos} />
        <Route path='/about' exact component={About} />
        <Route path='/newMovies' exact component={NewMovies} />
        <Route path='/register' exact component={Register} />
        <Route path='/registered' exact component={Registered} />
        <PrivateRoute path='/profil' exact component={MyProfile} />
        <AdminRoute path='/adminDashboard' exact component={AdminDashoard} />
        <AdminRoute path='/movieList' exact component={AdminMovieList} />
        <AdminRoute path='/addMovie' exact component={AddMovie} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
