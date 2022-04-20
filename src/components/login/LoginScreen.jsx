import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const LoginScreen = () => {

    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    // console.log(dispatch);


    const handleLogin = () => {

        const newLogin = {
            // logged  : true,
            name    : 'Carlos'
        }

        const action = {
            type    : types.login,
            payload : newLogin
        }

        dispatch( action );

        const lastPath = localStorage.getItem( 'lastPath' ) || '/';

        navigate( lastPath, {
            replace : true
        } );
    }

    return (
        <div className='container mt-5'>
            <h1>Login</h1>

            <hr/>

            <button
                className='btn btn-primary'
                onClick={ handleLogin }
            >
                Login
            </button>

        </div>
    )
}
