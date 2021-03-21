// import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, Divider, Dropdown, Form, Grid, Header, Image, Input, Label, Popup, Segment, TextArea } from "semantic-ui-react";
import Dropzone from 'react-dropzone'
import { setAllListings } from "../redux/allListingsSlice";

function CreateListingPage() {

    const history = useHistory();
    if ( !localStorage.getItem( "token" ) ) history.push( "/" );

    const dispatch = useDispatch();

    const [ newListingFormState, setNewListingFormState ] = useState( {} );

    const currentUser = useSelector( state => state.currentUser );
    const allCategories = useSelector( state => state.allCategories );
    const allListings = useSelector( state => state.allListings );

    const categoryDropdownOptions = !allCategories ? null : allCategories.map( category => {
        return { key: category.id, text: category.name, value: category.id };
    } );
    
    function updateNewListingForm( newListingFormChangeEvent ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState[ newListingFormChangeEvent.target.name ] = newListingFormChangeEvent.target.value;
        setNewListingFormState( updatedListingFormState );
    }
    
    function updateNewListingFormUnit( unit ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState.unit = unit ? unit : null;
        setNewListingFormState( updatedListingFormState );
    }
    
    function updateNewListingFormTags( categoryIdsArray ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState.tags = categoryIdsArray ? categoryIdsArray : null;
        setNewListingFormState( updatedListingFormState );
    }
    
    function updateNewListingFormImages( images ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState.images = !images ? null :
            newListingFormState.images ? newListingFormState.images.concat( images ) : images;
        setNewListingFormState( updatedListingFormState );
    }
    
    function removeNewListingFormImage( image ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState.images = newListingFormState.images.length === 1 ? null :
            newListingFormState.images.filter( newImage => newImage.name !== image.name );
        setNewListingFormState( updatedListingFormState );
    }

    function createListing() {
        const formData = new FormData();
        formData.append( "user_id", currentUser.id );
        formData.append( "title", newListingFormState.title );
        formData.append( "description", newListingFormState.description );
        formData.append( "price", newListingFormState.price );
        formData.append( "quantity", newListingFormState.quantity );
        formData.append( "unit", newListingFormState.unit );
        newListingFormState.images.forEach( image => formData.append( "images[]", image ) );
        fetch( `${ process.env.REACT_APP_API_URL }/listings`, {
            method: "POST",
            body: formData
        } ).then( response => response.json() ).then( newListingData => {
            dispatch( setAllListings( { ...allListings, newListingData } ) );
        } );
    }

    const newListingImagePreviews = !newListingFormState.images ? null :
        newListingFormState.images.map( ( image, index ) => {
            return <Popup
                key={ index }
                inverted
                size="mini"
                position="bottom center"
                content="Click to delete"
                trigger={
                    <Image
                        size="small"
                        src={ URL.createObjectURL( image ) }
                        alt={ image.name }
                        onClick={ () => removeNewListingFormImage( image ) }
                    />
                }
            />
        }
    );

    return (
        <Container style={ { marginTop: "10px" } }>
            <Header size="huge">Create new listing</Header>
            <Segment>
                <Label>Listing title</Label>
                <Input
                    fluid
                    size="massive"
                    name="title"
                    placeholder="Listing title"
                    onChange={ updateNewListingForm }
                />
            </Segment>
            <Segment.Group horizontal>
                <Segment>
                    <Form>
                        <Label>Listing description</Label>
                        <TextArea
                            rows="20"
                            name="description"
                            placeholder="Listing description"
                            onChange={ updateNewListingForm }
                        />
                    </Form>
                </Segment>
                <Segment>
                    <Form.Group inline>
                        <Input
                            type="number"
                            min="0"
                            name="price"
                            placeholder="Asking price"
                            label="Price: $"
                            onChange={ updateNewListingForm }
                        />
                        <span style={ { fontSize: "16pt" } }> / </span>
                        <Dropdown
                            selection
                            name="unit"
                            placeholder="Unit (leave blank if none)"
                            clearable={ true }
                            options={ [
                                { key: 1, text: "Each", value: "each" },
                                { key: 2, text: "Spool", value: "spool" },
                                { key: 3, text: "Roll", value: "roll" },
                                { key: 4, text: "Bolt", value: "bolt" },
                                { key: 5, text: "Inch", value: "inch" },
                                { key: 6, text: "Yard", value: "yard" },
                                { key: 7, text: "Centimeter", value: "centimeter" },
                                { key: 8, text: "Meter", value: "meter" },
                                { key: 9, text: "Ounce", value: "ounce" },
                                { key: 10, text: "Pound", value: "pound" },
                                { key: 11, text: "Gram", value: "gram" },
                                { key: 12, text: "Kilogram", value: "kilogram" }
                            ] }
                            onChange={ ( changeEvent, { value } ) => updateNewListingFormUnit( value ) }
                        />
                        <Input
                            type="number"
                            min="1"
                            name="quantity"
                            placeholder="Quantity"
                            label="Quantity available"
                            onChange={ updateNewListingForm }
                        />
                    </Form.Group>
                    <Divider />
                    <Grid columns="5">
                        { newListingImagePreviews }
                    </Grid>
                    <Dropzone onDrop={ acceptedFiles => updateNewListingFormImages( acceptedFiles ) }>
                        { ( { getRootProps, getInputProps } ) => (
                            <Segment>
                                <div { ...getRootProps() }>
                                    <Header textAlign="center">
                                        Drag and drop listing image/s here
                                    </Header>
                                    <input { ...getInputProps() } />
                                    <Header size="small" textAlign="center">
                                        Or click to select listing images from file browser
                                    </Header>
                                </div>
                            </Segment>
                        )}
                    </Dropzone>
                    <Button onClick={ () => updateNewListingFormImages( null ) }>
                        Clear images
                    </Button>
                </Segment>
            </Segment.Group>
            <Segment>
                <Dropdown
                    fluid
                    multiple
                    selection
                    clearable
                    placeholder="Add tags"
                    options={ categoryDropdownOptions }
                    onChange={ ( changeEvent, { value } ) => updateNewListingFormTags( value ) }
                />
            </Segment>
            <Segment secondary>
                <Button primary onClick={ createListing }>
                    Create listing
                </Button>
            </Segment>
        </Container>
    );

}

export default CreateListingPage;

// <Dropdown
//     name="unit"
//     placeholder="Unit"
//     clearable={ true }
//     onChange={ updateNewListingForm }
// >
//     <Dropdown.Menu>
//         <Dropdown.Header content="Unit" />
//         <Dropdown.Item>each</Dropdown.Item>
//         <Dropdown.Item>spool</Dropdown.Item>
//         <Dropdown.Item>roll</Dropdown.Item>
//         <Dropdown.Item>bolt</Dropdown.Item>
//         <Dropdown.Divider />
//         <Dropdown.Header content="Length" />
//         <Dropdown.Item>inch</Dropdown.Item>
//         <Dropdown.Item>yard</Dropdown.Item>
//         <Dropdown.Item>centimeter</Dropdown.Item>
//         <Dropdown.Item>meter</Dropdown.Item>
//         <Dropdown.Divider />
//         <Dropdown.Header content="Weight" />
//         <Dropdown.Item>pound</Dropdown.Item>
//         <Dropdown.Item>ounce</Dropdown.Item>
//         <Dropdown.Item>gram</Dropdown.Item>
//         <Dropdown.Item>kilogram</Dropdown.Item>
//     </Dropdown.Menu>
// </Dropdown>