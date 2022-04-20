import React from 'react';
import { Routes, Route, BrowserRouter  } from "react-router-dom";
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRouters } from './DashboardRouters';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouters = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* <Route path="/login" element={<LoginScreen />} /> */}

                <Route path='/login' element={ <PublicRoute>
                                                <LoginScreen />
                                            </PublicRoute> } />

                <Route path='/*' element={ <PrivateRoute>
                                                <DashboardRouters />
                                            </PrivateRoute> } />

                {/* <Route path='/*' element={ <DashboardRouters /> } /> */}

            </Routes>
        </BrowserRouter>
    )
}
