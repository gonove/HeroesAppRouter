import { useEffect, useReducer } from "react"

import { AuthContext } from "./auth/authContext"
import { authReducer } from "./auth/authReducer"
import { AppRouters } from "./routers/AppRouters"

const init = () => {
    return JSON.parse(localStorage.getItem( 'user' )) || { logged: false };
}

export const HeroesApp = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {

        if( !user ) return;
        localStorage.setItem( 'user', JSON.stringify( user ));
    }, [user])

    return (
        <AuthContext.Provider value={{
            user,
            dispatch
        }}>

            <AppRouters />

        </AuthContext.Provider>
    )
}
