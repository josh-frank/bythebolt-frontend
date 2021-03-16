import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../redux/currentUserSlice";

import { useHistory } from "react-router-dom";

import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";

function UserControlPanel() {

    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.currentUser );

    function logOutUser() {
        localStorage.removeItem( "token" );
        dispatch( setCurrentUser( null ) );
    }

    return (
        <>
            <Menu.Item>
                <Button icon labelPosition="left" color="blue">
                    <Icon name="camera" />
                    Create listing
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button.Group color="blue">
                    <Dropdown
                        floating labeled button
                        text={ currentUser.username }
                        icon="user"
                        className="icon"
                        direction="left"
                    >
                        <Dropdown.Menu>
                            {/* <Dropdown.Header content='Filter by tag' /> */}
                            <Dropdown.Item
                                icon="address card"
                                text="My profile"
                                onClick={ () => history.push( "/profile" ) }
                            />
                            <Dropdown.Item icon="heart" text='My favorites'/>
                            <Dropdown.Item icon="clone" text='My listings'/>
                            <Dropdown.Divider />
                            <Dropdown.Item icon="setting" text='My account'/>
                            <Dropdown.Item icon="log out" text='Log out' onClick={ logOutUser }/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Button.Group>
            </Menu.Item>
        </>
    );

}

export default UserControlPanel;