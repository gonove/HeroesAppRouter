import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

// Crear un mock para el Navigate
jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo</span>
}));

describe('Pruebas en PrivateRoute', () => {

    // Como saber si fue llamado el localStorage
    Storage.prototype.setItem = jest.fn()

    test('Debe mostrar el componente si esta autenticado y guardar en el localStorage ', () => {

        const contextValue = {
            user    : {
                logged : true,
                name   : 'pepe',
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper.text().trim() ).toBe('Private component');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');

    });

    test('Debe de bloquear el componente si no esta auntenticado', () => {

        const contextValue = {
            user    : {
                logged : false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        console.log(wrapper.html());
        expect( wrapper.text().trim() ).toBe('Saliendo');

    });

});
