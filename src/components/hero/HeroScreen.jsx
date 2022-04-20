import React, { useMemo } from 'react'

import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

    const navigate = useNavigate();
    // Se recibe el id React Router v6
    const { heroeId } = useParams();

    console.log(heroeId);

    // Memorizar la funcion para que no vuelva a llamar
    const hero = useMemo(() => getHeroById( heroeId ), [ heroeId ]);

    const handleReturn = () => {

        // if( heroeId.includes( 'dc' ) ){
        //     navigate( '/dc' )
        // } else{
        //     navigate( '/marvel' )
        // }
        // Para volver una pagina atras.
        navigate( -1 );

    }

    // Para controlar si se coloca un link que no existe
    if ( !hero ){
        return <Navigate to='/' />
    }

    // console.log( heroeId );

    const {id,
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters} = hero;

        // const imagePath = `/assets/${ id }.jpg`;  desde public/assets
    return (
        <div className='row mt-5'>

            <div className='col-4'>
                <img
                    src={ heroImages(`./${id}.jpg`).default
                 }
                    alt={ superhero }
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                />
            </div>

            <div className='col-8 animate__animated animate__fadeIn'>
                <h3> { superhero } </h3>
                <ul className='list-group list-group-flush animate__animated animate__fadeIn'>
                    <li className='list-group-item'> <b>Alter ego:</b> { alter_ego } </li>
                    <li className='list-group-item'> <b>Publisher:</b> { publisher } </li>
                    <li className='list-group-item'> <b>First appearance:</b> { first_appearance } </li>
                </ul>

                <h5 className='mt-3'>Characters</h5>
                <p> { characters } </p>

                <button
                    className='btn btn-outline-info'
                    onClick={ handleReturn }
                >
                    Back
                </button>


            </div>

        </div>
    )
}
