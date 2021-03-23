import { Menu } from "semantic-ui-react";

function Footer() {

    return (
        <Menu
            inverted
            color="blue"
            style={ { marginTop: "10px" } }
        >
            <div style={ { color: "white", marginLeft: "auto", marginRight: "auto", marginTop: "10px" } }>
                © { new Date().getFullYear() } Buy The Bolt
            </div>
        </Menu>
    );

}

export default Footer;