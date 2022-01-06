import {useState} from 'react';
import app from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Error from './Error'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [createAccount, setCreateAccount] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                setLoggedIn(true);
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
                    setLoggedIn(true);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
        setPassword("");
        setPasswordRepeat("");
    }

    return (
        <div className="sign-in-box">
            {!passwordMatch && <Error errorMsg="Error: Passwords do not match" />}
            {!passwordMatch && <p id="signup-error">Error: Passwords do not match</p>}

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
        </div>
    )
}

export default SignIn
