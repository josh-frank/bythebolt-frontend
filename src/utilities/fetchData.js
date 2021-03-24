function fetchProfile( token ) {
    return fetch( `${ process.env.REACT_APP_API_URL }/profile`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` }
    } ).then( response => response.json() );
}

function fetchCategories() {
    return fetch( `${ process.env.REACT_APP_API_URL }/categories` ).then( response => response.json() );
}

export { fetchProfile, fetchCategories };