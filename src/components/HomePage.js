import { useEffect, useState } from "react";

function HomePage() {

    const [ newListings, setNewListings ] = useState( [] );
    console.log('newListings: ', newListings);

    useEffect( () => {
        fetch( `${ process.env.REACT_APP_API_URL }/listings/new/10` ).then( response => response.json() ).then( setNewListings );
    }, [] );

    return (
        null
    );

}

export default HomePage;