import { useSelector } from "react-redux";
import { Form, Image, Input, Segment } from "semantic-ui-react";
import consumer from "../cable";

function ChatPanel( { chat } ) {
    
    const currentUser = useSelector( state => state.currentUser );

    function isFromMe( message ) { return message.message_user.username === currentUser.username; }

    const chatMessages = chat.messages.map( message => {
        return <Segment
            clearing
            compact
            key={ message.id }
            inverted={ true }
            floated={ isFromMe( message ) ? "right" : "left" }
            color={ isFromMe( message ) ? "blue" : "grey" }
        >
            { message.content }
            <Image
                avatar
                src={ message.message_user.avatar_url }
                alt={ message.message_user.username }
                floated={ isFromMe( message ) ? "right" : "left" }
            />
            <br />
            <small>{ new Date( message.created_at ).toLocaleString() }</small>
        </Segment>
    } );

    return (
        <>
            <div>{ chatMessages }</div>
            <Form onSubmit={ null }>
                <Form.Group>
                    <Form.Field
                        as={ Input }
                        action='Send'
                        onChange = { null }
                        width={ 14 }
                    />
                </Form.Group>
            </Form>
        </>
    );

}

export default ChatPanel;
