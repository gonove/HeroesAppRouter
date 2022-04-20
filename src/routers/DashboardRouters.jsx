import React from 'react';
import { Routes, Route  } from "react-router-dom";

import { DcScreen } from '../components/dc/DcScreen';
import { HeroScreen } from '../components/hero/HeroScreen';
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/Navbar';


export const DashboardRouters = () => {
    return (
        <>

            <Navbar />
            <div className='container'>
                <Routes>
                    <Route path="marvel" element={<MarvelScreen />} />
                    <Route path="dc" element={<DcScreen />} />

                    <Route path="search" element={<SearchScreen />} />

                    {/* Para indicar el argumento del URL || heroeId se esta desestructurando del useParams del React Router v6 */}
                    <Route path='hero/:heroeId' element={ <HeroScreen /> } />

                    <Route path="/" element={<MarvelScreen />} />
                </Routes>
            </div>

        </>
    )
}
