import { MemoryRouter, Route, Routes } from "react-router";
import { mount } from "enzyme";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

 jest.mock('react-router-dom', () => ({
     ...jest.requireActual('react-router-dom'),
     useNavigate: () => mockNavigate,
 }));

describe('Pruebas en el HeroScreen', () => {

    test('No debe de mostrar el HeroScreen si no hay un heroe en el URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path='/hero' element={ <HeroScreen />} />
                    <Route path='/' element={ <h1> No hero page </h1> } />
                </Routes>
            </MemoryRouter>
        );

        // console.log( wrapper.html() );
        expect( wrapper.find('h1').text().trim() ).toBe( 'No hero page' );

    });


    test('Debe de mostrar un heroe si el parametro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen />} />
                    <Route path='/' element={ <h1> No hero page </h1> } />
                </Routes>
            </MemoryRouter>
        );

        // console.log( wrapper.html() );
        expect( wrapper.find('.row').exists() ).toBe(true);

    });

    test('Debe de regresar a la pantalla anterior', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen />} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect( mockNavigate ).toHaveBeenCalledWith( -1 );

    });

    test('Debe mostrar el No hero page si no tenemos un heroe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider3214215']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={ <HeroScreen />} />
                    <Route path='/' element={ <h1> No hero page </h1> } />
                </Routes>
            </MemoryRouter>
        );

        // console.log( wrapper.html() );
        expect( wrapper.text().trim() ).toBe('No hero page');

    });

});
