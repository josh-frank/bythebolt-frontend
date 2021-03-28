function fetchSearchResults( query, category, page, limit ) {
    return fetch( `${ process.env.REACT_APP_API_URL }/search?query=${ query }&category=${ category }&page=${ page }&per_page=${ limit }` )
        .then( response => response.json() );
}

function fetchProfile( token ) {
    return fetch( `${ process.env.REACT_APP_API_URL }/profile`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` }
    } ).then( response => response.json() );
}

function fetchAddress( lat, lng ) {
    return fetch( `${ process.env.REACT_APP_GEOCODE_URL }&query=${ lat },${ lng }` )
        .then( response => response.json() );
}

function postUserLocation( token, latitude, longitude ) {
    return fetch( `${process.env.REACT_APP_API_URL}/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ token }` },
        body: JSON.stringify( { location: [ latitude, longitude ] } )
    } ).then( response => response.json() );
}

function fetchCategories() {
    return fetch( `${ process.env.REACT_APP_API_URL }/categories` ).then( response => response.json() );
}

function postUserCategory( token, userId, categoryId ) {
    return fetch( `${process.env.REACT_APP_API_URL}/user_categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ token }` },
        body: JSON.stringify( { user_id: userId, category_id: categoryId } )
    } ).then( response => response.json() );
}

function deleteUserCategory( token, userCategoryId ) {
    return fetch( `${process.env.REACT_APP_API_URL}/user_categories/${ userCategoryId }`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${ token }` },
    } ).then( response => response.json() );
}

function deleteListing( token, listingId ) {
    return fetch( `${ process.env.REACT_APP_API_URL }/listings/${ listingId }`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${ token }` }
    } ).then( response => response.json() );
}

function favorite( token, listingId ) {
    return fetch( `${ process.env.REACT_APP_API_URL }/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` },
        body: JSON.stringify( { listing_id: listingId } )
    } ).then( response => response.json() );
}

function unfavorite( token, favoriteId ) {
    return fetch( `${ process.env.REACT_APP_API_URL }/favorites/${ favoriteId }`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${ token }` }
    } ).then( response => response.json() );
}

export {
    fetchSearchResults,
    fetchProfile,
    fetchAddress,
    postUserLocation,
    fetchCategories,
    postUserCategory,
    deleteUserCategory,
    deleteListing,
    favorite,
    unfavorite
};
