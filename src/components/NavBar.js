// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoginFormDisplay } from "../redux/displayLoginFormSlice";

import { Button, Dropdown, Input, Menu } from "semantic-ui-react";

import LoginForm from "./LoginForm";
import SignupModal from "./SignupModal";
import UserControlPanel from "./UserControlPanel";
import { Link } from "react-router-dom";

function NavBar() {

    // const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector( state => state.currentUser );
    const displayLoginForm = useSelector( state => state.displayLoginForm );
    const displaySignupModal = useSelector( state => state.displaySignupModal );

    return (
        <>
            <SignupModal display={ displaySignupModal } />
            <Menu color="blue" borderless inverted stackable secondary>
                <Menu.Item position="left">
                    <Link to="/">
                        <h1 className="logo">By the Bolt</h1>
                    </Link>
                </Menu.Item>
                <Menu.Item style={ { width: "40vw" } }>
                    <Input
                        className="search"
                        size="big"
                        action={ { icon: 'search' } }
                        placeholder='Search listings'
                    />
                </Menu.Item>
                <Menu.Item position="right">
                    { currentUser ? <UserControlPanel /> :
                        <Button.Group color="blue">
                            <Dropdown
                                floating labeled button
                                text="Log in"
                                icon="sign in"
                                className="icon"
                                direction="left"
                                open={ displayLoginForm }
                                onClick={ () => dispatch( setLoginFormDisplay( !displayLoginForm ) ) }
                            >
                                <Dropdown.Menu onClick={ loginMenuClick => loginMenuClick.stopPropagation() }>
                                    <LoginForm />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Button.Group>
                    }
                </Menu.Item>
            </Menu>
        </>
    );

}

export default NavBar;