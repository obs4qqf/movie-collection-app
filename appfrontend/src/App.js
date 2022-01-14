import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieDashboard from './components/MovieDashboard';
import SignIn from './components/SignIn';
import Credits from './components/Credits';
import MovieDetails from './components/MovieDetails';
import Account from './components/Account';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from "react";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setSignedIn(true);
    }
  });

  return (
    <div className="app">
      <Router>
        <UserProvider>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/search">Movies</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                {signedIn && <Link to="/account">Account</Link>}
              </ul>
            </nav>

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/search" element={<MovieDashboard />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/account" element={<Account />} />
            </Routes>

            </div>
            <Credits />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
