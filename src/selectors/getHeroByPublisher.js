import { heroes } from "../data/heroes";


export const getHeroByPublisher = ( publisher ) => {

    const validPublishers = [ 'DC Comics', 'Marvel Comics' ];
    if ( !validPublishers.includes( publisher ) ){
        throw new Error( `${ publisher } no es una publisher valido` );
    }

    return heroes.filter( hero => hero.publisher === publisher );

}
