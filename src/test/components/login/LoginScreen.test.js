import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

 jest.mock('react-router-dom', () => ({
     ...jest.requireActual('react-router-dom'),
     useNavigate: () => mockNavigate,
 }));

describe('Pruebas en el LoginScreen', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/login'] }>

                <Routes>
                    <Route path = '/login' element= { <LoginScreen /> } />
                </Routes>

            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('Debe mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe realizar el dispatch y la navegacion', () => {

        // Hacemos click al boton login
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        // Esperamos el distpach haya sido llamado
        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type    : types.login,
            payload : { name : 'Fernando' }
        });

        // Esperamos que se haya llamado el mockNavigate con los siguientes argumentos
        expect( mockNavigate ).toHaveBeenCalledWith( '/', { replace : true } );

        // localStorage || Seteamos el valor de dc el ls y luego comprobamos
        localStorage.setItem( 'lastPath', '/dc' );

        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith( '/dc', { replace : true } );

    });

});
