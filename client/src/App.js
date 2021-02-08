import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import MovieDetail from './components/MovieDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Switch>
        <Route path='/' exact component={HomeScreen} />
        <Route path='/movie/movieId' exact component={MovieDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
