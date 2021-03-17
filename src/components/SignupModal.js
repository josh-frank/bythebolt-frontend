import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Modal } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";
import { setSignupModalDisplay } from "../redux/displaySignupModalSlice";

function SignupModal( { display } ) {

    const defaultSignupFormState = { username: "", email: "", password: "", confirmation: "" };

    const dispatch = useDispatch();

    const [ signupErrors, setSignupErrors ] = useState( [] );
    const [ signupFormState, setSignupFormState ] = useState( defaultSignupFormState );

    function updateSignupFormState( signupFormChangeEvent ) {
        const updatedSignupFormState = { ...signupFormState };
        updatedSignupFormState[ signupFormChangeEvent.target.name ] = signupFormChangeEvent.target.value;
        setSignupFormState( updatedSignupFormState );
    }

    function signUpUser( signupFormSubmitEvent ) {
        signupFormSubmitEvent.preventDefault();
        fetch( `${ process.env.REACT_APP_API_URL }/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( signupFormState )
        } ).then( response => {
            if ( response.ok ) {
                setSignupErrors( [] );
                setSignupFormState( defaultSignupFormState );
                return response.json();
            } else { return response.json().then( errorData => { throw errorData } ); }
        } ).then( responseData => {
                dispatch( setCurrentUser( responseData.user ) );
                localStorage.setItem( "token", responseData.token );
                dispatch( setSignupModalDisplay( false ) );
                // history.push( "/" );
            } ).catch( errorData => setSignupErrors( errorData.errors ) );
    }

    function cancelSignup() {
        setSignupFormState( defaultSignupFormState );
        dispatch( setSignupModalDisplay( false ) );
    }

    return (
        <Modal dimmer="inverted" open={ display }>
            <Modal.Header>Sign up</Modal.Header>
                <Modal.Content>
                    { signupErrors &&
                        <ul className="user-errors">
                            { signupErrors.map( ( error, index ) => <li key={ index }>{ error }</li> ) }
                        </ul>
                    }
                    <Form>
                        <Form.Field className="username-field">
                            <Form.Input
                                name="username"
                                label="Username:"
                                value={ signupFormState.username }
                                onChange={ updateSignupFormState }
                            />
                        </Form.Field>
                        <Form.Field className="email-field">
                            <Form.Input
                                name="email"
                                label="Email address:"
                                value={ signupFormState.email }
                                onChange={ updateSignupFormState }
                            />
                        </Form.Field>
                        <Form.Field className="password-field">
                            <Form.Input
                                type="password"
                                name="password"
                                label="Enter password:"
                                value={ signupFormState.password }
                                onChange={ updateSignupFormState }
                            />
                        </Form.Field>
                        <Form.Field className="confirmation-field">
                            <Form.Input
                                type="password"
                                name="confirmation"
                                label="Confirm password:"
                                value={ signupFormState.confirmation }
                                onChange={ updateSignupFormState }
                            />
                        </Form.Field>
                    </Form>            
                </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={ signUpUser }>Sign up</Button>
                <Button negative onClick={ cancelSignup }>Cancel</Button>
            </Modal.Actions>
        </Modal>
    );

}

export default SignupModal;