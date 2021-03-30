import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function CategoryMenu() {

    const history = useHistory();

    const allCategories = useSelector( state => state.allCategories );

    const categoryNavLinks = allCategories && allCategories.map( category => {
        return <Menu.Item key={ category.id }>
            <Link
                to="#"
                onClick={ () => {
                    history.push( `/search/${ encodeURIComponent( category.name ) }/%20/` );
                    window.location.reload();
                } }
            >
                { category.name }
            </Link>
        </Menu.Item>
    } );

    return (
        <Menu
            borderless stackable secondary inverted
            className="categories"
            color="blue"
        >
            { categoryNavLinks }
            {/* <Menu.Item as="a">Fabric</Menu.Item>
            <Menu.Item as="a">Yarn</Menu.Item>
            <Menu.Item as="a">Thread</Menu.Item>
            <Menu.Item as="a">Notions</Menu.Item>
            <Menu.Item as="a">Books/Magazines</Menu.Item>
            <Menu.Item as="a">Patterns</Menu.Item>
            <Menu.Item as="a">Machines</Menu.Item>
            <Menu.Item as="a">Services</Menu.Item> */}
        </Menu>
    );

}

export default CategoryMenu;