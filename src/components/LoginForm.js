import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Header } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";
import { setLoginFormDisplay } from "../redux/displayLoginFormSlice";
import { setSignupModalDisplay } from "../redux/displaySignupModalSlice";
// import { useHistory } from "react-router-dom";

function LoginForm() {

    const defaultLoginFormState = { username: "", password: "", confirmation: "" };
    
    // const history = useHistory();
    const dispatch = useDispatch();
    
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
                dispatch( setLoginFormDisplay( false ) );
                // history.push( "/" );
            } ).catch( errorData => setLoginErrors( errorData.errors ) );
    }

    return (
        <div className="login-form">
            <Header>Log in</Header>
            { loginErrors &&
                <ul className="user-errors">
                    { loginErrors.map( ( error, index ) => <li key={ index }>{ error }</li> ) }
                </ul>
            }
            <Form>
                <Form.Field className="username-field">
                    <Form.Input
                        name="username"
                        label="Username:"
                        value={ loginFormState.username }
                        onChange={ updateLoginFormState }
                        required
                    />
                </Form.Field>
                <Form.Field className="password-field">
                    <Form.Input
                        type="password"
                        name="password"
                        label="Enter password:"
                        value={ loginFormState.password }
                        onChange={ updateLoginFormState }
                        required
                    />
                </Form.Field>
                <Form.Field className="confirmation-field">
                    <Form.Input
                        type="password"
                        name="confirmation"
                        label="Confirm password:"
                        value={ loginFormState.confirmation }
                        onChange={ updateLoginFormState }
                        required
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
        </div>
    );

}

export default LoginForm;