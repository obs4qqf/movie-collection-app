import {useState} from 'react';
import app from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = (event) => {
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

    return (
        <div>
            {!passwordMatch ? <p id="signup-error">Error: Passwords do not match</p> : <></>}
            <form onSubmit={handleSubmit}>
                <h1>Sign Up for Free!</h1>
                <div className="sign-up-form">
                    <label><b>Email</b></label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="sign-up-form">
                    <label><b>Password</b></label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="sign-up-form">
                    <label><b>Confirm Password</b></label>
                    <input type="password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} required/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignIn
