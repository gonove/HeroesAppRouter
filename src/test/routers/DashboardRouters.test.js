import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRouters } from "../../routers/DashboardRouters";



describe('Pruebas en DashboardRouters', () => {

    const contextValue = {
        user : {
            logged  : true,
            name    : 'Juanchoto',
        }
    }

    test('Debe mostrarse correctamente', () => {


        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>

                <MemoryRouter initialEntries={['/']} >
                    <DashboardRouters />
                </MemoryRouter>

            </AuthContext.Provider>
        );

        // console.log( wrapper.html());

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('Marvel Screen');

    });

    test('Debe mostrarse correctamente de DC', () => {


        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>

                <MemoryRouter initialEntries={['/dc']} >
                    <DashboardRouters />
                </MemoryRouter>

            </AuthContext.Provider>
        );

        // console.log( wrapper.html());

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DC Screen');

    });
});
