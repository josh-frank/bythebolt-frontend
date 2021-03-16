import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react";
import ProfilePanel from "./ProfilePanel";

function ProfilePage() {

    const currentUser = useSelector( state => state.currentUser );

    const [ activeMenuItem, setActiveMenuItem ] = useState( "profile" );

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
                        <Menu.Item
                            name="profile"
                            icon="user"
                            active={ activeMenuItem === "profile" }
                            onClick={ () => setActiveMenuItem( "profile" ) }
                            />
                        <Menu.Item
                            name="listings"
                            icon="list"
                            active={ activeMenuItem === "listings" }
                            onClick={ () => setActiveMenuItem( "listings" ) }
                            />
                        <Menu.Item
                            name="favorites"
                            icon="heart"
                            active={ activeMenuItem === "favorites" }
                            onClick={ () => setActiveMenuItem( "favorites" ) }
                            />
                        <Divider />
                        <Menu.Item
                            name="settings"
                            icon="settings"
                            active={ activeMenuItem === "settings" }
                            onClick={ () => setActiveMenuItem( "settings" ) }
                        />
                    </Menu>
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                        { activeMenuItem === "profile" && <ProfilePanel /> }
                        { activeMenuItem === "listings" && <div>Listings</div> }
                        { activeMenuItem === "favorites" && <div>Favorites</div> }
                        { activeMenuItem === "settings" && <div>Settings</div> }
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );

}

export default ProfilePage;
