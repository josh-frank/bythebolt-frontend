import { Menu } from "semantic-ui-react";

function Footer() {

    return (
        <Menu inverted color="blue">
            <div style={ { color: "white", marginLeft: "auto", marginRight: "auto", marginTop: "10px" } }>
                © { new Date().getFullYear() } ByTheBolt
            </div>
        </Menu>
    );

}

export default Footer;