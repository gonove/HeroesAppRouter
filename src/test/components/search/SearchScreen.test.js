import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate, // Reescribir el useNavigate

}));

describe('Pruebas en el SearchScreen', () => {


    test('Debe mostrarse correctamente con valores por defecto', () => {

        const wrapper = mount(

            <MemoryRouter initialEntries = { ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe( 'Buscar un heroe');
    });

    test('Debe mostrar a batman y el input con el valor del querString', () => {

        const wrapper = mount(

            <MemoryRouter initialEntries = { ['/search/?q=batman'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe mostrar un error si no encuentra el hero', () => {
        const wrapper = mount(

            <MemoryRouter initialEntries = { ['/search/?q=batman123'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe( 'batman123' );
        expect( wrapper.find('.alert-danger').exists() ).toBe( true );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe( 'No hay resultados: batman123' );

    })

    test('Debe llamar el navigate a la nueva pantalla', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries = { ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        );

        // Simulamos el cambio en el formulario
        wrapper.find('input').simulate( 'change', {
            target: {
                name    : 'searchText',
                value   : 'batman'
            }
        });

        // Simulamos el submit del formulario \\ Se necesita el PreventDefault # Pasar el preventDefault \\ Navigate haya sido llamado
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');

    });

});
