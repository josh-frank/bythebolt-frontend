import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Divider, Form, Image, Input, Message } from "semantic-ui-react";
import consumer from "../cable";

function ChatPanel( { chat, setChat } ) {

    const currentUser = useSelector( state => state.currentUser );

    const [ newMessage, setNewMessage ] = useState( "" );

    function isFromMe( message ) { return message.message_user.username === currentUser.username; }

    useEffect( () => {
        console.log( "subscribed" );
        const subscription = consumer.subscriptions.create( {
            channel: "ChatChannel",
            chat_id: chat.id
        }, {
            received: messageData => {
                const updatedChat = { ...chat };
                updatedChat.messages.push( messageData );
                setChat( updatedChat );
            }
        } );
        return () => {
            console.log( "unsubscribed" );
            subscription.unsubscribe();
        }
    }, [ chat, setChat ] );

    function sendMessage() {
        const token = localStorage.getItem( "token" );
        if ( token ) {
            fetch( `${ process.env.REACT_APP_API_URL }/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` },
                body: JSON.stringify( {
                    content: newMessage,
                    chat_id: chat.id,
                    user_id: currentUser.id
                } )
            } ).then( () => {} ).then( () => setNewMessage( "" ) );
        }
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

    function ScrollToBottom() {
        const elementRef = useRef();
        useEffect( () => elementRef.current.scrollIntoView() );
        return <div ref={elementRef} />;
    };

    return (
        <>
            <div style={ { height: "60vh", whiteSpace: "nowrap", overflowY: "auto" } }>
                { chatMessages }
                <ScrollToBottom />
            </div>
            <Divider />
            <Form onSubmit={ sendMessage }>
                <Form.Group>
                    <Form.Field
                        as={ Input }
                        width={ 14 }
                        action={ { icon: "send", content: "Send" } }
                        value={ newMessage }
                        onChange = { changeEvent => setNewMessage( changeEvent.target.value ) }
                    />
                </Form.Group>
            </Form>
        </>
    );

}

export default ChatPanel;
