import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Image, Input, Modal } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";

function UploadAvatarModal( { display, toggleDisplay } ) {

    const dispatch = useDispatch();

    const [ fileToUpload, setFileToUpload ] = useState( null );
    
    function uploadAvatar() {
        const formData = new FormData();
        formData.append( "avatar", fileToUpload );
        const token = localStorage.getItem( "token" );
        fetch( `${ process.env.REACT_APP_API_URL }/profile`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${ token }` },
            body: formData
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            toggleDisplay( false );
        } );
    }

    return (
        <Modal
            dimmer="inverted"
            size="mini"
            open={ display }
        >
            <Modal.Header>Upload a new avatar</Modal.Header>
            <Modal.Content>
                { fileToUpload && <Image
                    src={ URL.createObjectURL( fileToUpload ) }
                    alt={ fileToUpload.name }
                    style={ {
                        marginLeft: "auto", marginRight: "auto", margin: "10px", width: "100px"
                    } }
                /> }
                <Form name="user">
                    <Form.Group>
                        <Input
                            type="file"
                            style={ {
                                marginLeft: "auto", marginRight: "auto"
                            } }
                            onChange={ changeEvent => setFileToUpload( changeEvent.target.files[ 0 ] ) }
                        />
                    </Form.Group>
                </Form>        
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={ uploadAvatar }>Upload</Button>
                <Button negative onClick={ () => {
                    setFileToUpload( null );
                    toggleDisplay( false );
                } }>Cancel</Button>
            </Modal.Actions>
        </Modal>
    );

}

export default UploadAvatarModal;