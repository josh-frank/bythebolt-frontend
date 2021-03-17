import { Button, Modal } from "semantic-ui-react";

function LocationModal( { displayModal, toggleDisplayModal } ){

    return (
        <Modal open={ displayModal }>
            <Modal.Header>Set location</Modal.Header>
            <Modal.Content>          
            </Modal.Content>
            <Modal.Actions>
                <Button positive>Set location</Button>
                <Button negative onClick={ () => toggleDisplayModal( "location" ) }>Cancel</Button>
            </Modal.Actions>
        </Modal>
    );

}

export default LocationModal;