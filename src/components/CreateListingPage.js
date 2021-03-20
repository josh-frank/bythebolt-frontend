// import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Divider, Dropdown, Form, Header, Input, Segment, TextArea } from "semantic-ui-react";

function CreateListingPage() {

    const history = useHistory();
    if ( !localStorage.getItem( "token" ) ) history.push( "/" );

    // const currentUser = useSelector( state => state.currentUser );

    const unitDropdownOptions = [
        { key: 1, text: "Each", value: "each" },
        { key: 2, text: "Spool", value: "each" },
        { key: 3, text: "Roll", value: "each" },
        { key: 4, text: "Bolt", value: "each" },
        { key: 5, text: "Inch", value: "each" },
        { key: 6, text: "Yard", value: "each" },
        { key: 7, text: "Centimeter", value: "each" },
        { key: 8, text: "Meter", value: "each" },
        { key: 9, text: "Ounce", value: "each" },
        { key: 10, text: "Pound", value: "each" },
        { key: 11, text: "Gram", value: "each" },
        { key: 12, text: "Kilogram", value: "each" }
    ];

    const [ newListingFormState, setNewListingFormState ] = useState( {} );
    console.log('newListingFormState: ', newListingFormState);

    function updateNewListingForm( newListingFormChangeEvent ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState[ newListingFormChangeEvent.target.name ] = newListingFormChangeEvent.target.value;
        setNewListingFormState( updatedListingFormState );
    }
    
    function updateNewListingFormUnit( unit ) {
        const updatedListingFormState = { ...newListingFormState };
        updatedListingFormState.unit = unit;
        setNewListingFormState( updatedListingFormState );
    }

    return (
        <Container style={ { marginTop: "10px" } }>
            <Header size="huge">Create new listing</Header>
            <Segment.Group>
                <Segment>
                    <Input
                        fluid
                        size="massive"
                        name="title"
                        placeholder="Listing title"
                        onChange={ updateNewListingForm }
                    />
                </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
                <Segment>
                    <Form>
                        <TextArea
                            rows="20"
                            name="description"
                            placeholder="Listing description"
                            onChange={ updateNewListingForm }
                        />
                    </Form>
                </Segment>
                <Segment>
                    <Input
                        type="number"
                        min="0"
                        name="price"
                        placeholder="Asking price"
                        label="$"
                        onChange={ updateNewListingForm }
                    />
                    <span style={ { fontSize: "16pt" } }> / </span>
                    <Dropdown
                        selection
                        name="unit"
                        placeholder='Unit'
                        clearable={ true }
                        options={ unitDropdownOptions }
                        onChange={ ( changeEvent, { value } ) => updateNewListingFormUnit( value ) }
                    />
                    {/* <Dropdown
                        name="unit"
                        placeholder='Unit'
                        clearable={ true }
                        onChange={ updateNewListingForm }
                    >
                        <Dropdown.Menu>
                            <Dropdown.Header content='Unit' />
                            <Dropdown.Item>each</Dropdown.Item>
                            <Dropdown.Item>spool</Dropdown.Item>
                            <Dropdown.Item>roll</Dropdown.Item>
                            <Dropdown.Item>bolt</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header content='Length' />
                            <Dropdown.Item>inch</Dropdown.Item>
                            <Dropdown.Item>yard</Dropdown.Item>
                            <Dropdown.Item>centimeter</Dropdown.Item>
                            <Dropdown.Item>meter</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header content='Weight' />
                            <Dropdown.Item>pound</Dropdown.Item>
                            <Dropdown.Item>ounce</Dropdown.Item>
                            <Dropdown.Item>gram</Dropdown.Item>
                            <Dropdown.Item>kilogram</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                    <Divider />
                </Segment>
            </Segment.Group>
        </Container>
    );

}

export default CreateListingPage;