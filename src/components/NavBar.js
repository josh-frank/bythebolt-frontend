// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Menu } from "semantic-ui-react";
import LoginDropdown from "./LoginDropdown";
import SignupModal from "./SignupModal";
import UserControlPanel from "./UserControlPanel";
import { Link } from "react-router-dom";

function NavBar() {

    // const history = useHistory();
    const currentUser = useSelector( state => state.currentUser );
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
                    { currentUser ? <UserControlPanel /> : <LoginDropdown /> }
                </Menu.Item>
            </Menu>
        </>
    );

}

export default NavBar;