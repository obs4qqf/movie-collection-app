import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import MovieDashboard from './components/MovieDashboard';
import SignIn from './components/SignIn';
import Credits from './components/Credits';

function App() {
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
                  <Link to="/movie">Movies</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/movie" element={<MovieDashboard />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>

            </div>
            <Credits />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
