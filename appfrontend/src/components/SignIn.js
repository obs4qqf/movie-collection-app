const SignIn = () => {


    return (
        <div>
            <form>
                <h1>Sign Up for Free!</h1>
                <div className="sign-up-form">
                    <label><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" required/>
                </div>
                <div className="sign-up-form">
                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required/>
                </div>
                <div className="sign-up-form">
                    <label><b>Confirm Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="passwordrepeat" required/>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignIn
