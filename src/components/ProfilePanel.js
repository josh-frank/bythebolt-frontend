import { useSelector } from "react-redux";
import { Button, Container, Divider, Icon, Label, Segment } from "semantic-ui-react";

function ProfilePanel() {

    const currentUser = useSelector( state => state.currentUser );

    return (
        <Container>
            <Label><Icon name="mail" />Email</Label>&nbsp;
            { currentUser.email }
            <Button size="small" floated="right">Update email</Button>
            <Divider />
            <Label><Icon name="book" />Bio</Label>
            <Button size="small" floated="right">Update bio</Button>
            <Segment>{ !currentUser.bio ? <em>No bio yet!</em> : currentUser.bio }</Segment>
            <Divider />
            <Label><Icon name="map marker alternate" />Location</Label>&nbsp;
            { !currentUser.location ? <em>No location set!</em> : currentUser.location }
            <Button.Group size="small" floated="right">
                <Button>Set location</Button>
                <Button.Or />
                <Button>Use current location</Button>
            </Button.Group>
        </Container>
    );

}

export default ProfilePanel;
