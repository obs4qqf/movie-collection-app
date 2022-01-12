import {useState} from 'react';
import app from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useUser } from "./UserContext";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [createAccount, setCreateAccount] = useState(false);
    const userCurrent = useUser();

    const handleLogin = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                setEmail("");
                setPassword("");
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        if (password != passwordRepeat) {
            setPasswordMatch(false);
            setPassword("");
            setPasswordRepeat("");
        } else {
            setEmail("");
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential.user);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
        setPassword("");
        setPasswordRepeat("");
    }

    const signOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log("Signed Out");
          console.log(auth.currentUser);
        }).catch((error) => {
          console.log(error);
        })
      }

    // const retrieveFavorites = async () => {
    //     if (!showFavorites) {
    //         userCurrent.getIdToken().then(async (idToken) => {
    //             const res = await fetch(`/favorites`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': 'Bearer ' + idToken
    //                 }
    //             });
    //             const data = await res.json();
    //             setMovies(data);
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     }
    //     getFavorites();
    // }

    return (
        //new
        // <SignIn getFavorites={getFavorites} showFavorites={showFavorites} setMovies={setMovies}/>

        <div className="sign-in-box">
            {/* {userCurrent != "" && <p onClick={retrieveFavorites}>{showFavorites ? "Close Favorites" : "Get Favorites"}</p>} */}

            {!passwordMatch && 
                <div className="error">
                    <p onClick={() => setPasswordMatch(true)}>❌  </p>
                    <p>Error: Passwords do not match</p>
                </div>
            }

            {!createAccount && 
                <form onSubmit={handleLogin} className="sign-in-form">
                    <h1>Login:</h1>
                    <div className="sign-in-form">
                        <label><b>Email: </b></label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="sign-in-form">
                        <label><b>Password: </b></label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit">Log In</button>
                </form>
            }

            {createAccount &&
                <form onSubmit={handleSignUp} className="sign-in-form">
                    <h1>Sign Up for Free!</h1>
                    <div className="sign-in-form">
                        <label><b>Email: </b></label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="sign-in-form">
                        <label><b>Password: </b></label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="sign-in-form">
                        <label><b>Confirm Password: </b></label>
                        <input type="password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} required/>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            }

            <p id="switch-log-in-form" onClick={() => setCreateAccount(!createAccount)}>{createAccount ? "Log In" : "Sign Up"}</p>
            {userCurrent != "" && <p id="signout" onClick={signOutUser}>Sign Out</p>}
        </div>
    )
}

export default SignIn
