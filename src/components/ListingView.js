import 'pure-react-carousel/dist/react-carousel.es.css';
import { ButtonBack, ButtonNext, CarouselProvider, Image as CarouselImage, Slider, Slide } from 'pure-react-carousel';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Button, Card, Container, Form, Header, Icon, Image, Input, Label, Segment } from "semantic-ui-react";
import { distanceBetween } from "../utilities/distanceBetween";
import { setCurrentUser } from '../redux/currentUserSlice';
import EditListingModal from './EditListingModal';
import { favorite, toggleAvailability, unfavorite } from '../utilities/fetchData';

function ListingView() {

    const history = useHistory();

    const dispatch = useDispatch();
    
    const currentUser = useSelector( state => state.currentUser );
    
    const { listingId } = useParams();
    
    const [ thisListing, setThisListing ] = useState( null );

    const [ displayEditModal, toggleDisplayEditModal ] = useState( false );

    const [ startChatFormState, setStartChatFormState ] = useState( "" );

    const daysSinceCreated = thisListing && Math.floor( ( Date.now() - Date.parse( thisListing.created_at ) ) / 86_400_000 );

    const isMine = currentUser && thisListing && !!currentUser.listings.find( listing => listing.id === thisListing.id )

    useEffect( () => {
        fetch( `${ process.env.REACT_APP_API_URL }/listings/${ listingId }` )
            .then( response => {
                if ( response.ok ) return response.json();
                history.push( "/" );
            } ).then( setThisListing );
    }, [ listingId, history ] );

    const thisFavorite = currentUser && thisListing ? currentUser.favorite_listings.find( favoriteListing => {
        return favoriteListing.listing.id === thisListing.id;
    } ) : null;

    const token = localStorage.getItem( "token" );

    function addToFavorites() {
        favorite( token, thisListing.id ).then( userData => dispatch( setCurrentUser( userData ) ) );
    }

    function removeFromFavorites() {
        unfavorite( token, thisFavorite.id ).then( userData => dispatch( setCurrentUser( userData ) ) );
    }

    function markSoldOrUnsold() {
        toggleAvailability( thisListing.id ).then( setThisListing );
    }

    function sendMessage() {
        const chatToContinue = currentUser.chats.find( chat => chat.listing_id === thisListing.id );
        if ( chatToContinue ) {
            fetch( `${ process.env.REACT_APP_API_URL }/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` },
                body: JSON.stringify( {
                    content: startChatFormState,
                    chat_id: chatToContinue.id,
                    user_id: currentUser.id
                } )
            } ).then( () => history.push( `/chats/${ chatToContinue.id }` ) ); 
        } else {
            fetch( `${ process.env.REACT_APP_API_URL }/chats`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` },
                body: JSON.stringify( { listing_id: thisListing.id, message_content: startChatFormState } )
            } ).then( response => response.json() ).then( newChatData => {
                dispatch( setCurrentUser( newChatData.current_user ) );
                history.push( `/chats/${ newChatData.new_chat.id }` );
            } );
        }
    }

    const sellerCard = ( thisListing &&
        <Card>
            <Card.Content>
                { thisListing.user.avatar_url && <Image
                    avatar
                    floated="right"
                    src={ thisListing.user.avatar_url }
                    alt={ thisListing.user.username }
                /> }
                <Card.Header>{ thisListing.user.username }</Card.Header>
                <Card.Meta>
                    Member since { new Date( thisListing.user.created_at ).toLocaleDateString() }
                </Card.Meta>
                { currentUser && currentUser.location && <Card.Description>
                    <Icon name="map signs" />
                    { distanceBetween( thisListing.user.location, currentUser.location ).toFixed( 1 ) } mi. away
                </Card.Description> }
            </Card.Content>
        </Card>
    );

    const listingImageCarousel = ( thisListing && thisListing.image_urls ?
        <CarouselProvider
            naturalSlideWidth={6}
            naturalSlideHeight={4}
            totalSlides={ thisListing.image_urls.length }
        >
            { !thisListing.active &&
                <div style={ {
                    fontSize: "96pt",
                    fontWeight: "bold",
                    color: "white",
                    opacity: "0.75",
                    position: "absolute",
                    left: "33%",
                    top: "45%",
                    transform: "rotate( 45deg )",
                    zIndex: "1000"
                } }>
                    SOLD
                </div>
            }
            <Slider>
                { thisListing.image_urls.map( ( imageUrl, index ) => {
                    return <Slide key={ index } index={ index }>
                        <Image as={ CarouselImage } src={ imageUrl }/>
                    </Slide>
                } ) }
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
        : <em>No images</em>
    );

    const sendMessageForm = (
        <Form onSubmit={ sendMessage }>
            <Form.Group>
                <Form.Field
                    as={ Input }
                    width={ 14 }
                    action={ { icon: "send" } }
                    placeholder="Send message..."
                    value={ startChatFormState }
                    onChange = { changeEvent => setStartChatFormState( changeEvent.target.value ) }
                />
            </Form.Group>
        </Form>
    );

    return ( thisListing &&
        <>
            <EditListingModal
                listing={ thisListing }
                display={ displayEditModal }
                toggleDisplay={ toggleDisplayEditModal }
            />
            <Container style={ { marginTop: "10px" } }>
                <Segment.Group>
                    <Segment>
                        <Header size="huge">{ thisListing.title }</Header>
                        { !thisListing.active &&
                            <Label size="big" color="red">No longer available</Label>
                        }
                    </Segment>
                    <Segment secondary>
                        { thisListing.listing_categories.map( listingCategory => {
                            return <Label tag key={ listingCategory.id }>{ listingCategory.category.name }</Label>
                        } ) }
                    </Segment>
                </Segment.Group>
                <Segment.Group horizontal>
                    <Segment loading={ !thisListing }>
                        { listingImageCarousel }
                    </Segment>
                    <Segment style={ { maxWidth: "25vw" } }>
                        { sellerCard }
                        <Icon name="calendar alternate" />
                        Listed { !daysSinceCreated ? null : daysSinceCreated }{ daysSinceCreated < 1 ? "Today" : daysSinceCreated === 1 ? " day ago" : " days ago" }
                        { !!thisListing.favorites.length && <div>
                            <Icon name="heart" />
                                Favorited by { thisListing.favorites.length } { thisListing.favorites.length === 1 ? "user" : "users" }
                        </div> }
                        <br /><br />
                        { currentUser && !isMine && <Button
                            primary
                            icon
                            size="mini"
                            labelPosition="left"
                            onClick={ thisFavorite ? removeFromFavorites : addToFavorites }
                        >
                            <Icon name={ thisFavorite ? "heart outline" : "heart" }/>
                            { thisFavorite ? "Remove from Favorites" : "Add to Favorites" }
                        </Button> }
                        <br /><br />
                        { currentUser && !isMine && sendMessageForm }
                        { isMine && <Button
                            primary
                            icon
                            size="mini"
                            labelPosition="left"
                            onClick={ () => toggleDisplayEditModal( true ) }
                        >
                            <Icon name="edit"/>
                            Edit listing
                        </Button> }
                        { isMine && <Button
                            primary
                            icon
                            size="mini"
                            labelPosition="left"
                            onClick={ () => markSoldOrUnsold( thisListing.id ) }
                        >
                            <Icon name="ban"/>
                            { thisListing.active ? "Mark as unavailable" : "Mark as available" }
                        </Button> }
                    </Segment>
                </Segment.Group>
                <Segment.Group>
                    <Segment>
                        <Label ribbon color={ thisListing.quantity === 1 ? "red" : null }>
                            { thisListing.quantity === 1 ? "Last one!" : thisListing.quantity + " available" }
                        </Label>
                        <span style={ { fontSize: "21pt", fontWeight: "bold" } }>
                            ${ parseFloat( thisListing.price ).toFixed( Number.isInteger( parseFloat( thisListing.price ) ) ? 0 : 2 ) }
                        </span>
                        { thisListing.unit && <span style={ { fontSize: "16pt", fontWeight: "bold" } }>/{ thisListing.unit }</span> }
                        &nbsp;
                    </Segment>
                    <Segment>
                        <Label ribbon>Description</Label>
                        <br /><br />
                        <p style={ { fontSize: "12pt" } }>{ thisListing.description }</p>
                    </Segment>
                </Segment.Group>
            </Container>
        </>
    );

}

export default ListingView;
