import { Menu } from "semantic-ui-react";

function CategoryMenu() {

    return (
        <Menu
            borderless stackable secondary inverted
            className="categories"
            color="blue"
        >
            <Menu.Item as="a">Fabric</Menu.Item>
            <Menu.Item as="a">Yarn</Menu.Item>
            <Menu.Item as="a">Thread</Menu.Item>
            <Menu.Item as="a">Notions</Menu.Item>
            <Menu.Item as="a">Books/Magazines</Menu.Item>
            <Menu.Item as="a">Patterns</Menu.Item>
            <Menu.Item as="a">Machines</Menu.Item>
            <Menu.Item as="a">Services</Menu.Item>
        </Menu>
    );

}

export default CategoryMenu;