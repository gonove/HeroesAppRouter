import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {

    test('Debe retornar el estado por defecto', () => {

        // Se llama el reducer y se le pasa como estado inicial el log en false
        const state = authReducer({ logged : false }, {});

        expect( state ).toEqual( { logged : false } );

    });

    test('Debe autenticar y colocar el "name" del usuario', () => {

        const action = {
            type    : types.login,
            payload : {
                name    : 'Fernando',
            }
        }
        const state = authReducer({ logged : false }, action);

        expect( state ).toEqual({ logged : true, name : 'Fernando' });

    });

    test('Debe borrar el name del usuario y logged en false', () => {

        const action = {
            type : types.logout,
        };

        // Se llama el reducer y en el action se dispara el logout
        const state = authReducer({ logged : true, name : 'Fernandinho' }, action);

        expect( state ).toEqual({ logged : false });
    });


});
