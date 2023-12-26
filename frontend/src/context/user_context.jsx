import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { AuthenticationService } from "../services/auth_service";

const UserContext = createContext(null)

export function useUser() {
    const context = useContext(UserContext)
    return context
}

export function UserProvider(props) {
    const [user, setUser] = useState(-1)
    useEffect(() => {
        const authService = new AuthenticationService();
        authService.login().then(
            data => setUser(data.result.user)
        )
    }, []);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}