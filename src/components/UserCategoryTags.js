import { useDispatch, useSelector } from "react-redux";
import { Label, Popup } from "semantic-ui-react";
import { setCurrentUser } from "../redux/currentUserSlice";

function UserCategoryTags() {

    const dispatch = useDispatch();

    const currentUser = useSelector( state => state.currentUser );

    function deleteCategory( userCategoryId ) {
        const token = localStorage.getItem( "token" );
        fetch( `${process.env.REACT_APP_API_URL}/user_categories/${ userCategoryId }`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${ token }` },
        } ).then( response => response.json() ).then( userData => {
            dispatch( setCurrentUser( userData ) );
        } );
    }

    return (
        currentUser.user_categories.map( userCategory => {
            return <span key={ userCategory.id } onClick={ () => deleteCategory( userCategory.id ) }>
                <Popup
                    inverted
                    size="mini"
                    position="bottom center"
                    content={ `Click to delete ${ userCategory.category.name } tag` }
                    trigger={ <Label tag content={ userCategory.category.name } /> }
                />
            </span>
        } )
    );

}

export default UserCategoryTags;