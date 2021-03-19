function degreesToRadians( degrees ) {
    return degrees * ( Math.PI / 180 );
}

function distanceBetween( theseCoordinates, thoseCoordinates ) {
    const [ lat1, lng1 ] = theseCoordinates, [ lat2, lng2 ] = thoseCoordinates;
    // Radius of the earth in km
    // var earthsRadius = 6371;
    // Radius of the earth in km
    var earthsRadius = 3958.8;
    var latitudeDistance = degreesToRadians( lat2 - lat1 );
    var lnggituteDistance = degreesToRadians( lng2 - lng1 ); 
    var a = Math.sin( latitudeDistance / 2 ) * Math.sin( latitudeDistance / 2 ) +
        Math.cos( degreesToRadians( lat1 ) ) * Math.cos( degreesToRadians( lat2 ) ) * 
        Math.sin( lnggituteDistance / 2 ) * Math.sin( lnggituteDistance / 2 ); 
    var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) ); 
    var d = earthsRadius * c; // Distance in km
    return d;
}

export { distanceBetween };