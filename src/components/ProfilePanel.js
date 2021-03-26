import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Divider, Icon, Label, Segment } from "semantic-ui-react";
import { fetchAddress } from "../utilities/fetchData";
// import { setCurrentUser } from "../redux/currentUserSlice";
import LocationModal from "./LocationModal";
import UpdateBioForm from "./UpdateBioForm";
import UpdateEmailForm from "./UpdateEmailForm";

function ProfilePanel() {

    // const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const defaultEditPanelsState = { email: false, bio: false, location: false };
    const [ openEditPanelsState, toggleOpenEditPanelsState ] = useState( defaultEditPanelsState );

    const [ address, setAddress ] = useState( null );

    useEffect( () => {
        if ( !!currentUser.location && !!currentUser.location.length ) {
            fetchAddress( currentUser.location[ 0 ], currentUser.location[ 1 ] )
                .then( addressData => setAddress( addressData.data[ 0 ].label ) );
        }
    }, [ currentUser ] );

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
                { !address ? <em>No location set!</em> : address }
                <Button.Group size="small" floated="right">
                    <Button onClick={ () => setOpenEditPanelsState( "location" ) }>Set location</Button>
                    {/* <Button.Or />
                    <Button onClick={ useCurrentLocation }>Use current location</Button> */}
                </Button.Group>
            </Container>
        </>
    );

}

export default ProfilePanel;
