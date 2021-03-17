import { Button, Modal } from "semantic-ui-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function LocationModal( { displayModal, toggleDisplayModal } ){

    return (
        <Modal
            size="mini"
            dimmer="inverted"
            open={ displayModal }
        >
            <Modal.Header>Set location</Modal.Header>
            <Modal.Content>
                    <MapContainer
                        id="mapid"
                        center={ [ 51.505, -0.09 ] }
                        zoom={ 12 }
                        scrollWheelZoom={ false }
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={ [ 51.505, -0.09 ] } />
                    </MapContainer>
            </Modal.Content>
            <Modal.Actions>
                <Button positive>Set location</Button>
                <Button negative onClick={ () => toggleDisplayModal( "location" ) }>Cancel</Button>
            </Modal.Actions>
        </Modal>
    );

}

export default LocationModal;