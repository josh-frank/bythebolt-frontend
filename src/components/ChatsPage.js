import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Container, Grid, Header, Menu } from "semantic-ui-react";
import ChatPanel from "./ChatPanel";

function ChatsPage() {

    const history = useHistory();
    if ( !localStorage.getItem( "token" ) ) history.push( "/" );

    const currentUser = useSelector( state => state.currentUser );

    const [ selectedChat, setSelectedChat ] = useState( { id: null } );

    const chatMenuItems = currentUser && currentUser.chats.map( chat => {
        return <Menu.Item
            key={ chat.id }
            name={ chat.subject }
            active={ selectedChat.id === chat.id }
            onClick={ () => setSelectedChat( chat ) }
        >
            <Header as="h4">{ chat.subject }</Header>
            <small>
                Between you and { chat.participants.filter( participant => participant !== currentUser.username ) }
            </small>
        </Menu.Item>
    } );

    return ( currentUser &&
        <Container style={ { marginTop: "10px" } }>
            <Grid>
                <Grid.Column width={ 4 }>
                    <Menu fluid vertical tabular>
                        { chatMenuItems }
                    </Menu>
                </Grid.Column>
                <Grid.Column
                    stretched width={ 12 }
                    style={ { backgroundColor: "white", marginTop: "15px" } }
                >
                    { selectedChat.messages && <ChatPanel chat={ selectedChat } setChat={ setSelectedChat } /> }
                </Grid.Column>
            </Grid>
        </Container>
    );

}

export default ChatsPage;
