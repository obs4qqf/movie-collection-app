import { Link } from 'react-router-dom';
import { useUser } from "./UserContext";

const NavBar = () => {
    const userCurrent = useUser();

    return (
        <div>
            <nav>
              <ul>
                <li>
                  <Link to="/" className="link">Home</Link>
                </li>
                <li>
                  <Link to="/search" className="link">Movies</Link>
                </li>
                <li>
                  <Link to="/login" className="link">Login</Link>
                </li>
                {/* {signedIn && <Link to="/account" className="link">Account</Link>} */}
                <li>
                    {userCurrent != "" && <Link to="/account" className="link">Account</Link>}
                </li>
              </ul>
            </nav>
        </div>
    )
}

export default NavBar
