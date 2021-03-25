import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Container, Grid, Header, Icon, Menu, Segment } from "semantic-ui-react";
import ChatPanel from "./ChatPanel";

function ChatsPage() {

    const history = useHistory();
    if ( !localStorage.getItem( "token" ) ) history.push( "/" );

    const { chatId } = useParams();

    const currentUser = useSelector( state => state.currentUser );

    const [ selectedChat, setSelectedChat ] = useState( { id: null } );

    useEffect( () => {
        const chatToLoadFromParams = currentUser && currentUser.chats.find( userChat => userChat.id === parseInt( chatId ) );
        if ( chatToLoadFromParams ) setSelectedChat( chatToLoadFromParams );
    }, [ currentUser, chatId, setSelectedChat ] );

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

    function ChatPanelPlaceholder() {
        return <Segment placeholder>
        <Header icon>
          <Icon name='chat' />
          Start a conversation and find your next project!
        </Header>
      </Segment>
    }

    return ( currentUser &&
        <Container style={ { marginTop: "10px" } }>
            <Grid>
                <Grid.Column width={ 4 }>
                    <Menu fluid vertical tabular>
                        { chatMenuItems }
                    </Menu>
                </Grid.Column>
                <Grid.Column
                    stretched
                    width={ 12 }
                    style={ { backgroundColor: "white", marginTop: "15px" } }
                >
                    { selectedChat.messages ? <ChatPanel chat={ selectedChat } setChat={ setSelectedChat } /> : <ChatPanelPlaceholder /> }
                </Grid.Column>
            </Grid>
        </Container>
    );

}

export default ChatsPage;
