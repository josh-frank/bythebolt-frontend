function degreesToRadians( degrees ) {
    return degrees * ( Math.PI / 180 );
}

function distanceBetween( theseCoordinates, thoseCoordinates ) {
    const [ thisLatitude, thisLongitude ] = theseCoordinates, [ thatLatitude, thatLongitude ] = thoseCoordinates;
    // Radius of the earth in km
    // var earthsRadius = 6371;
    // Radius of the earth in mi
    var earthsRadius = 3958.8;
    var latitudeDistance = degreesToRadians( thatLatitude - thisLatitude );
    var longitudeDistance = degreesToRadians( thatLongitude - thisLongitude ); 
    var a = Math.sin( latitudeDistance / 2 ) * Math.sin( latitudeDistance / 2 ) +
        Math.cos( degreesToRadians( thisLatitude ) ) * Math.cos( degreesToRadians( thatLatitude ) ) * 
        Math.sin( longitudeDistance / 2 ) * Math.sin( longitudeDistance / 2 ); 
    var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) ); 
    var d = earthsRadius * c; // Distance in km
    return d;
}

export { distanceBetween };
