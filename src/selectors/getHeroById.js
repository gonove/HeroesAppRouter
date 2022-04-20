import { heroes } from "../data/heroes";

export const getHeroById = ( id = '' ) => {
    // console.log('called')
    return heroes.find( hero => hero.id === id );

}