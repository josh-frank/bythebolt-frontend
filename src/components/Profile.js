import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import { Container, Grid, Header, Image, Menu, Segment } from "semantic-ui-react";

function Profile() {

    const history = useHistory();
    const currentUser = useSelector( state => state.currentUser );

    if ( !currentUser ) {
        history.push( "/" );
        return null;
    }

    return (
        <Container>
            <Segment>
                <Header>
                    <Image className="avatar" src="logo512.png" avatar/>
                    { currentUser.username }
                </Header>
                Member since { new Date( currentUser.created_at ).toLocaleDateString() }
            </Segment>
            <Grid>
                <Grid.Column width={4}>
                <Menu fluid vertical tabular>
                    <Menu.Item name='My profile' />
                    <Menu.Item name='My listings' />
                    <Menu.Item name='My favorites' />
                    <Menu.Item name='Settings' />
                </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                <Segment>
                    This is an stretched grid column. This segment will always match the
                    tab height
                </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );

}

export default Profile;
