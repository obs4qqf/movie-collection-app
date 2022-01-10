import React, { useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userCurrent, setUserCurrent] = useState("");

    useEffect(() => {
        const auth = getAuth();

        const user = auth.currentUser;
        if (user) {
            console.log("Signed In");
        } else {
            console.log("Not Signed In");
        }

        const removeObserver = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserCurrent(user.uid);
            } else {
                setUserCurrent("");
            }
        });

        return removeObserver;
    }, [])

    return (
        <UserContext.Provider value={userCurrent}>
            {children}
        </UserContext.Provider>
    )
}