import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Divider, Icon, Label, Segment } from "semantic-ui-react";
import LocationModal from "./LocationModal";
import UpdateBioForm from "./UpdateBioForm";
import UpdateEmailForm from "./UpdateEmailForm";

function ProfilePanel() {

    const currentUser = useSelector( state => state.currentUser );

    const defaultEditPanelsState = { email: false, bio: false, location: false };
    const [ openEditPanelsState, toggleOpenEditPanelsState ] = useState( defaultEditPanelsState );

    function setOpenEditPanelsState( panelName ) {
        const updatedEditPanelsState = { ...openEditPanelsState };
        updatedEditPanelsState[ panelName ] = !updatedEditPanelsState[ panelName ];
        toggleOpenEditPanelsState( updatedEditPanelsState );
    }

    return (
        <>
            <LocationModal
                displayModal={ openEditPanelsState.location }
                toggleDisplayModal={ setOpenEditPanelsState }
            />
            <Container>
                <Label><Icon name="mail" />Email</Label>&nbsp;
                { currentUser.email }
                <Button
                    size="small"
                    floated="right"
                    onClick={ () => setOpenEditPanelsState( "email" ) }
                >
                    Update email
                </Button>
                { openEditPanelsState.email && <UpdateEmailForm toggleDisplay={ setOpenEditPanelsState } /> }
                <Divider />
                <Label><Icon name="book" />Bio</Label>
                <Button
                    size="small"
                    floated="right"
                    onClick={ () => setOpenEditPanelsState( "bio" ) }
                >
                    Update bio
                </Button>
                <Segment>{ !currentUser.bio ? <em>No bio yet!</em> : currentUser.bio }</Segment>
                { openEditPanelsState.bio && <UpdateBioForm toggleDisplay={ setOpenEditPanelsState } /> }
                <Divider />
                <Label><Icon name="map marker alternate" />Location</Label>&nbsp;
                { !currentUser.location ? <em>No location set!</em> : currentUser.location }
                <Button.Group size="small" floated="right">
                    <Button onClick={ () => setOpenEditPanelsState( "location" ) }>Set location</Button>
                    <Button.Or />
                    <Button>Use current location</Button>
                </Button.Group>
            </Container>
        </>
    );

}

export default ProfilePanel;
