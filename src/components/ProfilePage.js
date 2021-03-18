import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Container, Divider, Grid, Header, Image, Label, Menu, Segment } from "semantic-ui-react";
import ProfilePanel from "./ProfilePanel";
import UploadAvatarModal from "./UploadAvatarModal";
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function ProfilePage() {

    const currentUser = useSelector( state => state.currentUser );

    const [ activeMenuItem, setActiveMenuItem ] = useState( "profile" );
    const [ displayAvatarForm, toggleDisplayAvatarForm ] = useState( false );

    const categoryTags = currentUser.categories.map( category => {
        return <Label key={ category.id } tag>{ category.name }</Label>
    } );

    return (
        <>
            <UploadAvatarModal
                display={ displayAvatarForm }
                toggleDisplay={ toggleDisplayAvatarForm }
            />
            <Container style={ { marginTop: "10px" } }>
                <Segment.Group>
                    <Segment>
                        <Header>
                            { currentUser.avatar_url && <Image
                                className="avatar"
                                src={ currentUser.avatar_url }
                                alt={ currentUser.username }
                                avatar
                            /> }
                            <Button
                                floated="right"
                                onClick={ () => toggleDisplayAvatarForm( !displayAvatarForm ) }
                            >
                                Update avatar
                            </Button>
                            { currentUser.username }
                        </Header>
                        Member since { new Date( currentUser.created_at ).toLocaleDateString() }
                    </Segment>
                    <Segment secondary>{ categoryTags }</Segment>
                </Segment.Group>
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
        </>
    );

}

export default ProfilePage;
