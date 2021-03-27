import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Image, Menu, Segment } from "semantic-ui-react";
import AddUserCategoryDropdown from "./AddUserCategoryDropdown";
import MyFavoritesPanel from "./MyFavoritesPanel";
import MyListingsPanel from "./MyListingsPanel";
import ProfilePanel from "./ProfilePanel";
import UploadAvatarModal from "./UploadAvatarModal";
import UserCategoryTags from "./UserCategoryTags";
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

function ProfilePage( { activeItem } ) {

    const history = useHistory();
    if ( !localStorage.getItem( "token" ) ) history.push( "/" );

    const currentUser = useSelector( state => state.currentUser );

    const [ activeMenuItem, setActiveMenuItem ] = useState( activeItem );
    
    const [ displayAvatarModal, toggleDisplayAvatarModal ] = useState( false );

    return ( currentUser &&
        <>
            <UploadAvatarModal
                display={ displayAvatarModal }
                toggleDisplay={ toggleDisplayAvatarModal }
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
                                onClick={ () => toggleDisplayAvatarModal( !displayAvatarModal ) }
                            >
                                Update avatar
                            </Button>
                            { currentUser.username }
                        </Header>
                        Member since { new Date( currentUser.created_at ).toLocaleDateString() }
                    </Segment>
                    <Segment secondary>
                        { !!currentUser.user_categories.length ? <UserCategoryTags /> : <em>No categories yet!</em> }
                        &nbsp;
                        <AddUserCategoryDropdown />
                    </Segment>
                </Segment.Group>
                <Grid>
                    <Grid.Column width={ 4 }>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name="My profile"
                                icon="user"
                                active={ activeMenuItem === "profile" }
                                onClick={ () => setActiveMenuItem( "profile" ) }
                                />
                            <Menu.Item
                                name="My listings"
                                icon="list"
                                active={ activeMenuItem === "listings" }
                                onClick={ () => setActiveMenuItem( "listings" ) }
                                />
                            <Menu.Item
                                name="My favorites"
                                icon="heart"
                                active={ activeMenuItem === "favorites" }
                                onClick={ () => setActiveMenuItem( "favorites" ) }
                                />
                            <Divider />
                            <Menu.Item
                                name="Settings"
                                icon="settings"
                                active={ activeMenuItem === "settings" }
                                onClick={ () => setActiveMenuItem( "settings" ) }
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column stretched width={ 12 }>
                        <Segment>
                            { activeMenuItem === "profile" && <ProfilePanel /> }
                            { activeMenuItem === "listings" && <MyListingsPanel /> }
                            { activeMenuItem === "favorites" && <MyFavoritesPanel /> }
                            { activeMenuItem === "settings" && <div>Settings</div> }
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    );

}

export default ProfilePage;
