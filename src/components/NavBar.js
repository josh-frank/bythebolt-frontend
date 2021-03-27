import { useSelector } from "react-redux";
import { Form, Input, Menu } from "semantic-ui-react";
import LoginDropdown from "./LoginDropdown";
import SignupModal from "./SignupModal";
import UserControlPanel from "./UserControlPanel";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

function NavBar() {

    const history = useHistory();

    const currentUser = useSelector( state => state.currentUser );
    
    const displaySignupModal = useSelector( state => state.displaySignupModal );

    const [ searchQuery, setSearchQuery ] = useState( "" );

    return (
        <>
            <SignupModal display={ displaySignupModal } />
            <Menu color="blue" borderless inverted stackable secondary>
                <Menu.Item position="left">
                    <Link to="/">
                        <h1 className="logo">Buy the Bolt</h1>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Form
                        style={ { width: "40vw" } }
                        onSubmit={ () => history.push( `/search/${ searchQuery }` ) }
                    >
                        <Form.Field>
                            <Input
                                required
                                className="search"
                                size="big"
                                action={ { icon: 'search' } }
                                placeholder='Search listings'
                                value={ searchQuery }
                                onChange={ searchQueryChangeEvent => setSearchQuery( searchQueryChangeEvent.target.value ) }
                            />
                        </Form.Field>
                    </Form>
                </Menu.Item>
                <Menu.Item position="right">
                    { currentUser ? <UserControlPanel /> : <LoginDropdown /> }
                </Menu.Item>
            </Menu>
        </>
    );

}

export default NavBar;