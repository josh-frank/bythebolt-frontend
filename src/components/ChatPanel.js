import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Divider, Form, Image, Input, Message } from "semantic-ui-react";
import consumer from "../cable";

function ChatPanel( { chat } ) {

    useEffect( () => {
        const subscription = consumer.subscriptions.create( {
            channel: "ChatChannel",
            chat_id: chat.id
        }, {
            received: updatedChatData => {
                console.log('updatedChatData: ', updatedChatData);
                chat.messages.push( updatedChatData );
            }
        } );
        return () => subscription.unsubscribe();
    }, [ chat ] );

    const currentUser = useSelector( state => state.currentUser );

    const [ newMessage, setNewMessage ] = useState( "" );

    function isFromMe( message ) { return message.message_user.username === currentUser.username; }

    function sendMessage() {
        fetch( `${ process.env.REACT_APP_API_URL }/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {
                content: newMessage,
                chat_id: chat.id,
                user_id: currentUser.id
            } )
        } ).then( response => response.json() ).then( () => setNewMessage( "" ) );
    }

    const chatMessages = chat.messages.map( message => {
        return <Message
            key={ message.id }
            color={ isFromMe( message ) ? "blue" : "grey" }
        >
            <Image
                avatar
                src={ message.message_user.avatar_url }
                alt={ message.message_user.username }
                floated={ isFromMe( message ) ? "right" : "left" }
            />
            <div align={ isFromMe( message ) ? "right" : "left" }>
                { message.content }
                <br />
                <span style={ { fontSize: "8pt" } }>
                    { new Date( message.created_at ).toLocaleString() }
                </span>
            </div>
        </Message>
    } );

    return (
        <>
            <div>{ chatMessages }</div>
            <Divider />
            <Form onSubmit={ sendMessage }>
                <Form.Group>
                    <Form.Field
                        as={ Input }
                        width={ 14 }
                        action='Send'
                        value={ newMessage }
                        onChange = { changeEvent => setNewMessage( changeEvent.target.value ) }
                    />
                </Form.Group>
            </Form>
        </>
    );

}

export default ChatPanel;
