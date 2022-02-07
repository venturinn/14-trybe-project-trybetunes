import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import './pages/Login.css';
import './Components/Header.css';
import './pages/Search.css';
import './pages/Album.css';
import './pages/Favorite.css';
import './pages/Profile.css';
import './pages/ProfileEdit.css';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
