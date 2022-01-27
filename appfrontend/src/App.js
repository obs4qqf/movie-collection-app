import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieDashboard from './components/MovieDashboard';
import SignIn from './components/SignIn';
import Credits from './components/Credits';
import MovieDetails from './components/MovieDetails';
import Account from './components/Account';
import NavBar from './components/NavBar';
import Favorites from './components/Favorites';

function App() {
  return (
    <div className="app">
      <Router>
        <UserProvider>
            <div id="content">
              <NavBar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/search" element={<MovieDashboard />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route exact path="/account" element={<Account />} />
                <Route exact path="/account/favorites" element={<Favorites />} />
              </Routes>
            </div>
            <Credits />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
