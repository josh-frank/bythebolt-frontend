import { Button, Modal } from "semantic-ui-react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/currentUserSlice";

function LocationModal( { displayModal, toggleDisplayModal } ) {

    const dispatch = useDispatch();

    const [ map, setMap ] = useState( null );

    const [ newLocation, setNewLocation ] = useState( null );

    const currentUser = useSelector( state => state.currentUser );
    
    function updateLocation() {
        const token = localStorage.getItem( "token" );
        fetch( `${process.env.REACT_APP_API_URL}/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ token }` },
            body: JSON.stringify( { location: [ newLocation.lat, newLocation.lng ] } )
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            toggleDisplayModal( "location" );
        } );
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
                center={ currentUser.location }
                zoom={ 12 }
                scrollWheelZoom={ false }
                whenCreated={ setMap }
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ), [ currentUser ]
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
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={ updateLocation }>Set location</Button>
                <Button negative onClick={ () => toggleDisplayModal( "location" ) }>Cancel</Button>
            </Modal.Actions>
        </Modal>
    )

}

export default LocationModal;