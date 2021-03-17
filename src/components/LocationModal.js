import { Button, Icon, Modal } from "semantic-ui-react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/currentUserSlice";

const defaultLocation = { lat: 40.76547518458087, lng: -73.98536808381324 };

function LocationModal( { displayModal, toggleDisplayModal } ) {

    const dispatch = useDispatch();

    const [ map, setMap ] = useState( null );

    const currentUser = useSelector( state => state.currentUser );
    
    const [ newLocation, setNewLocation ] = useState( !!currentUser.location && !!currentUser.location.length ? currentUser.location : defaultLocation );
    
    function updateLocation() {
        const token = localStorage.getItem( "token" );
        fetch( `${process.env.REACT_APP_API_URL}/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ token }` },
            body: JSON.stringify( { location: [ newLocation.lat, newLocation.lng ] } )
        } )
            .then( response => response.json() )
            .then( userData => dispatch( setCurrentUser( userData ) ) );
    }

    function GetPosition( { map } ) {
        
        const onMove = useCallback( () => {
            setNewLocation( map.getCenter() );
        }, [ map ] );
    
        useEffect( () => {
            map.on( 'move', onMove );
            return () => { map.off( 'move', onMove ); }
        }, [ map, onMove ] );
    
        return null;
    
    }

    const displayMap = useMemo(
        () => (
            <MapContainer
                id="mapid"
                center={ newLocation }
                zoom={ 12 }
                scrollWheelZoom={ false }
                whenCreated={ setMap }
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ), [ newLocation ]
    );

    return (
        <Modal
            size="mini"
            dimmer="inverted"
            open={ displayModal }
        >
            <Modal.Header>Set location</Modal.Header>
            <Modal.Content>
                { map ? <GetPosition map={ map } /> : null }
                { displayMap }
                <Icon name="map marker" color="red" size="big" style={ {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    zIndex: "1000"
                } }/>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    positive
                    onClick={ () => {
                        updateLocation();
                        toggleDisplayModal( "location" );
                    } }
                >
                    Set location
                </Button>
                <Button
                    negative
                    onClick={ () => toggleDisplayModal( "location" ) }
                >
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    )

}

export default LocationModal;