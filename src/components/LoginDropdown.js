import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dropdown, Form, Message } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";
import { setSignupModalDisplay } from "../redux/displaySignupModalSlice";
// import { useHistory } from "react-router-dom";

function LoginDropdown() {

    const defaultLoginFormState = { username: "", password: "", confirmation: "" };
    
    const dispatch = useDispatch();
    
    const [ displayLoginForm, setLoginFormDisplay ] = useState( false );

    const [ loginErrors, setLoginErrors ] = useState( [] );

    const [ loginFormState, setLoginFormState ] = useState( defaultLoginFormState );

    function updateLoginFormState( loginFormChangeEvent ) {
        const updatedLoginFormState = { ...loginFormState };
        updatedLoginFormState[ loginFormChangeEvent.target.name ] = loginFormChangeEvent.target.value;
        setLoginFormState( updatedLoginFormState );
    }

    function logInUser() {
        fetch( `${ process.env.REACT_APP_API_URL }/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( loginFormState )
        } ).then( response => {
            if ( response.ok ) {
                setLoginErrors( [] );
                setLoginFormState( defaultLoginFormState );
                return response.json();
            } else { return response.json().then( errorData => { throw errorData } ); }
        } ).then( responseData => {
                dispatch( setCurrentUser( responseData.user ) );
                localStorage.setItem( "token", responseData.token );
                setLoginFormDisplay( false );
                // history.push( "/" );
            } ).catch( errorData => setLoginErrors( errorData.errors ) );
    }

    return (
        <Button.Group color="blue">
            <Dropdown
                floating labeled button
                text="Log in"
                icon="sign in"
                className="icon"
                direction="left"
                open={ displayLoginForm }
                onClick={ () => setLoginFormDisplay( !displayLoginForm ) }
            >
                <Dropdown.Menu onClick={ loginMenuClick => loginMenuClick.stopPropagation() }>
                    { !!loginErrors.length && <Message
                        error
                        header='Login failed'
                        list={ loginErrors }
                    /> }
                    <Form style={ { padding: "1rem" } }>
                        <Form.Field className="username-field">
                            <Form.Input
                                name="username"
                                label="Username:"
                                value={ loginFormState.username }
                                onChange={ updateLoginFormState }
                            />
                        </Form.Field>
                        <Form.Field className="password-field">
                            <Form.Input
                                type="password"
                                name="password"
                                label="Enter password:"
                                value={ loginFormState.password }
                                onChange={ updateLoginFormState }
                            />
                        </Form.Field>
                        <Form.Field className="confirmation-field">
                            <Form.Input
                                type="password"
                                name="confirmation"
                                label="Confirm password:"
                                value={ loginFormState.confirmation }
                                onChange={ updateLoginFormState }
                            />
                        </Form.Field>
                        <Button.Group fluid>
                            <Button onClick={ logInUser }>Log in</Button>
                            <Button.Or />
                            <Button onClick={ () => dispatch( setSignupModalDisplay( true ) ) }>
                                Sign up
                            </Button>
                        </Button.Group>
                    </Form>
                </Dropdown.Menu>
            </Dropdown>
        </Button.Group>
    );

}

export default LoginDropdown;