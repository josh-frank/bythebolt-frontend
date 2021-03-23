import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Dropdown, Form, Grid, Header, Image, Input, Label, Message, Modal, Popup, Segment, TextArea } from "semantic-ui-react";
import { setAllListings } from "../redux/allListingsSlice";

function EditListingModal( { listing, display, toggleDisplay } ) {

    const dispatch = useDispatch();

    const allCategories = useSelector( state => state.allCategories );

    const allListings = useSelector( state => state.allListings );

    const [ editListingErrors, setEditListingErrors ] = useState( [] );

    const categoryDropdownOptions = allCategories && allCategories.map( category => {
        return { key: category.id, text: category.name, value: category.id };
    } );

    const [ editListingFormState, setEditListingFormState ] = useState( {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        quantity: listing.quantity,
        unit: listing.unit,
        image_urls: listing.image_urls,
        new_images: [],
        categories: listing.listing_categories.map( listingCategory => listingCategory.category.id )
    } );

    const listingImagePreviews = (
        <>
            <Grid>
                { editListingFormState.image_urls && editListingFormState.image_urls.map( imageUrl => {
                    return <Popup
                        key={ imageUrl }
                        inverted
                        size="mini"
                        position="bottom center"
                        content="Click to delete"
                        trigger={
                            <Image
                                size="small"
                                src={ imageUrl }
                                alt={ imageUrl.name }
                                onClick={ () => removeEditListingFormPreviousImage( imageUrl ) }
                            />
                        }
                    /> }
                ) }
                { editListingFormState.new_images.map( ( newImage, index ) => {
                    return <Popup
                        key={ index }
                        inverted
                        size="mini"
                        position="bottom center"
                        content="Click to delete"
                        trigger={
                            <Image
                                size="small"
                                src={ URL.createObjectURL( newImage ) }
                                alt={ newImage.name }
                                onClick={ () => removeEditListingFormNewImage( newImage ) }
                            />
                        }
                    /> }
                ) }
            </Grid>
            <Divider />
            <Dropzone onDrop={ acceptedFiles => addEditListingFormNewImages( acceptedFiles ) }>
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
        </>
    );

    function updateEditListingForm( editListingFormChangeEvent ) {
        const updatedListingFormState = { ...editListingFormState };
        updatedListingFormState[ editListingFormChangeEvent.target.name ] = editListingFormChangeEvent.target.value;
        setEditListingFormState( updatedListingFormState );
    }

    function updateEditListingFormUnit( unit ) {
        const updatedListingFormState = { ...editListingFormState };
        updatedListingFormState.unit = unit ? unit : null;
        setEditListingFormState( updatedListingFormState );
    }
    
    function updateEditListingFormTags( categoryIdsArray ) {
        const updatedListingFormState = { ...editListingFormState };
        updatedListingFormState.categories = categoryIdsArray ? categoryIdsArray : [];
        setEditListingFormState( updatedListingFormState );
    }

    function addEditListingFormNewImages( images ) {
        const updatedListingFormState = { ...editListingFormState };
        updatedListingFormState.new_images = editListingFormState.new_images.concat( images );
        setEditListingFormState( updatedListingFormState );
    }

    function removeEditListingFormNewImage( newImage ) {
        const updatedListingFormState = { ...editListingFormState };
        updatedListingFormState.new_images = editListingFormState.new_images.filter( image => image.name !== newImage.name );
        setEditListingFormState( updatedListingFormState );
    }
    
    function removeEditListingFormPreviousImage( imageUrl ) {
        const updatedListingFormState = { ...editListingFormState };
        updatedListingFormState.image_urls = editListingFormState.image_urls.filter( url => url !== imageUrl );
        setEditListingFormState( updatedListingFormState );
    }

    function createListing() {
        const token = localStorage.getItem( "token" ), formData = new FormData();
        formData.append( "title", editListingFormState.title );
        formData.append( "description", editListingFormState.description );
        formData.append( "price", editListingFormState.price );
        formData.append( "quantity", editListingFormState.quantity );
        formData.append( "unit", editListingFormState.unit );
        if ( editListingFormState.image_urls ) {
            editListingFormState.image_urls.forEach( imageUrl => formData.append( "image_urls[]", imageUrl ) );
        }
        if ( editListingFormState.new_images ) {
            editListingFormState.new_images.forEach( newImage => formData.append( "new_images[]", newImage ) );
        }
        if ( editListingFormState.categories ) {
            editListingFormState.categories.forEach( category => formData.append( "categories[]", category ) );
        }
        if ( token ) {
            fetch( `${ process.env.REACT_APP_API_URL }/listings/${ listing.id }`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${ token }` },
                body: formData
            } ).then( response => {
                if ( response.ok ) {
                    setEditListingErrors( [] );
                    return response.json();
                } else { return response.json().then( errorData => { throw errorData } ); }
            } ).then( newListingData => {
                const editedListings = allListings.filter( listing => listing.id !== newListingData.id );
                dispatch( setAllListings( [ ...editedListings, newListingData ] ) );
                toggleDisplay( false );
                window.location.reload();
            } ).catch( errorData => setEditListingErrors( errorData.errors ) );
        }
    }

    return (
        <Modal
            size="large"
            dimmer="inverted"
            open={ display }
        >
            <Modal.Header>Edit listing details</Modal.Header>
            <Modal.Content>
                { !!editListingErrors.length && <Message
                    error
                    header='There was a problem creating this listing'
                    list={ editListingErrors }
                /> }
                <Label>Listing title</Label>
                <Input
                    fluid
                    size="massive"
                    name="title"
                    placeholder="Listing title"
                    value={ editListingFormState.title }
                    onChange={ updateEditListingForm }
                />
                <Divider />
                    { listingImagePreviews }
                <Divider />
                <Form>
                    <Label>Listing description</Label>
                    <TextArea
                        rows="5"
                        name="description"
                        placeholder="Listing description"
                        value={ editListingFormState.description }
                        onChange={ updateEditListingForm }
                    />
                </Form>
                <Divider />
                <Form.Group inline>
                    <Input
                        type="number"
                        min="0"
                        name="price"
                        placeholder="Asking price"
                        label="Price: $"
                        value={ editListingFormState.price }
                        onChange={ updateEditListingForm }
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
                        value={ editListingFormState.unit }
                        onChange={ ( changeEvent, { value } ) => updateEditListingFormUnit( value ) }
                    />
                    <Input
                        type="number"
                        min="1"
                        name="quantity"
                        placeholder="Quantity"
                        label="Quantity available"
                        value={ editListingFormState.quantity }
                        onChange={ updateEditListingForm }
                    />
                </Form.Group>
                <Dropdown
                    fluid
                    multiple
                    selection
                    clearable
                    placeholder="Add tags"
                    options={ categoryDropdownOptions }
                    defaultValue={ editListingFormState.categories }
                    onChange={ ( changeEvent, { value } ) => updateEditListingFormTags( value ) }
                />
            </Modal.Content>
            <Modal.Actions>
                <Button positive onClick={ createListing }>
                    Save edits
                </Button>
                <Button negative onClick={ () => toggleDisplay( false ) }>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    );

}

export default EditListingModal;
