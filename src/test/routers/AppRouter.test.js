import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouters } from "../../routers/AppRouters";

describe('Pruebas en el AppRouters', () => {

    test('Debe mostrar el login si no esta autenticado', () => {

        const contextValue = {
            user    : {
                logged : false,
            }
        };

        // Utilizamos el mount() porque necesitamos renderizar los componentes dentro del AuthContext, en vez de shallow().
        const wrapper = mount(
            <AuthContext.Provider value = { contextValue } >
                <AppRouters/>
            </AuthContext.Provider>
        );

        // console.log( wrapper.html() );
        expect( wrapper ).toMatchSnapshot();

        // Buscamos el h1 que diga Login ya que corresponde al compoenente del LoginScreen
        expect( wrapper.find('h1').text().trim() ).toBe( 'Login' );

    });

    test('Debe mostrar el componente de Marvel si esta autenticado', () => {

        const contextValue = {
            user    : {
                logged  : true,
                name    : 'Carlos',
            }
        };

        // Utilizamos el mount() porque necesitamos renderizar los componentes dentro del AuthContext, en vez de shallow().
        const wrapper = mount(
            <AuthContext.Provider value = { contextValue } >
                <AppRouters/>
            </AuthContext.Provider>
        );

        // console.log( wrapper.html() );
        expect( wrapper ).toMatchSnapshot();

        // Buscamos el h1 que diga Login ya que corresponde al compoenente del LoginScreen
        expect( wrapper.find('.navbar').exists() ).toBe( true );

    });

});
