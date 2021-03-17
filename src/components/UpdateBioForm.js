import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Label, TextArea } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";

function UpdateBioForm( { toggleDisplay } ) {

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const [ newBio, setNewBio ] = useState( currentUser.bio );

    function updateBio() {
        const token = localStorage.getItem( "token" );
        fetch( `${process.env.REACT_APP_API_URL}/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ token }` },
            body: JSON.stringify( { bio: newBio } )
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            toggleDisplay( "bio" );
        } );
    }

    return (
        <Form
            size="small"
            style={ { marginTop: "5px" } }
            onSubmit={ updateBio }
        >
            <Label ribbon color="blue">New bio:</Label>
            <Form.Group>
                <TextArea
                    value={ newBio }
                    rows={ 2 }
                    onChange = { changeEvent => setNewBio( changeEvent.target.value ) }
                />
                <Input type="submit" />
            </Form.Group>
        </Form>
    );

}

export default UpdateBioForm;