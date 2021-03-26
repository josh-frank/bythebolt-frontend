// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Menu } from "semantic-ui-react";
import LoginDropdown from "./LoginDropdown";
import SignupModal from "./SignupModal";
import UserControlPanel from "./UserControlPanel";
import { Link } from "react-router-dom";
import { setSearchQuery } from '../redux/searchQuerySlice';

function NavBar() {

    // const history = useHistory();

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const searchQuery = useSelector( state => state.searchQuery );

    const displaySignupModal = useSelector( state => state.displaySignupModal );

    function updateSearchQuery( searchQueryChangeEvent ) {
        dispatch( setSearchQuery( searchQueryChangeEvent.target.value ) );
    }

    return (
        <>
            <SignupModal display={ displaySignupModal } />
            <Menu color="blue" borderless inverted stackable secondary>
                <Menu.Item position="left">
                    <Link to="/">
                        <h1 className="logo">Buy the Bolt</h1>
                    </Link>
                </Menu.Item>
                <Menu.Item style={ { width: "40vw" } }>
                    <Input
                        className="search"
                        size="big"
                        action={ { icon: 'search' } }
                        placeholder='Search listings'
                        value={ searchQuery }
                        onChange={ updateSearchQuery }
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