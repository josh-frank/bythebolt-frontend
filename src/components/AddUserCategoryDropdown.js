import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";
import { postUserCategory } from '../utilities/fetchData';

function AddUserCategoryDropdown() {

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    const allCategories = useSelector( state => state.allCategories );
    
    const categoryDropdownOptions = allCategories && allCategories.map( category => {
        const disabled = !!currentUser.user_categories ?
            currentUser.user_categories.map( userCategory => userCategory.category.id ).includes( category.id ) :
            false;
        return { key: category.id, text: category.name, value: category.id, disabled: disabled };
    } );

    const [ selectedCategory, setSelectedCategory ] = useState( null );

    function addUserCategory() {
        postUserCategory( localStorage.getItem( "token" ), currentUser.id, selectedCategory ).then( userData => {
            dispatch( setCurrentUser( userData ) );
            setSelectedCategory( null );
        } );
    }

    return (
        <>
            <Dropdown
                search
                selection
                placeholder='Add tags'
                options={ categoryDropdownOptions }
                clearable={ true }
                onChange={ ( changeEvent, { value } ) => setSelectedCategory( value ) }
            />
            <Button
                size="small"
                onClick={ addUserCategory }
            >
                Add category
            </Button>
        </>
    );
}

export default AddUserCategoryDropdown;
