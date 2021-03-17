import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Label } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";

function UpdateEmailForm( { toggleDisplay } ) {

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const [ newEmail, setNewEmail ] = useState( currentUser.email );

    function updateEmail() {
        const token = localStorage.getItem( "token" );
        fetch( `${process.env.REACT_APP_API_URL}/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ token }` },
            body: JSON.stringify( { email: newEmail } )
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            toggleDisplay( "email" );
        } );
    }

    return (
        <Form
            size="small"
            style={ { marginTop: "5px" } }
            onSubmit={ updateEmail }
        >
            <Label ribbon color="blue">New email:</Label>
            <Form.Group>
                <Input
                    action='Update'
                    value={ newEmail }
                    onChange = { changeEvent => setNewEmail( changeEvent.target.value ) }
                />
            </Form.Group>
        </Form>
    );

}

export default UpdateEmailForm;