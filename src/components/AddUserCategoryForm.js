import { useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";

function AddUserCategoryForm() {

    const categoryDropdownOptions = useSelector( state => state.allCategories ).map( category => {
        return { key: category.id, text: category.name };
    } );

    return (
        <Dropdown
            search
            selection
            placeholder='Add tags'
            options={ categoryDropdownOptions }
            onAddItem={ alert }
        />
    );
}

export default AddUserCategoryForm;
