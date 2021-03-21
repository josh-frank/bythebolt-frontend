import 'pure-react-carousel/dist/react-carousel.es.css';
import { ButtonBack, ButtonNext, CarouselProvider, Image as CarouselImage, Slider, Slide } from 'pure-react-carousel';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Card, Container, Header, Icon, Image, Label, Segment } from "semantic-ui-react";
import { distanceBetween } from "../utilities/distanceBetween";

function ListingView() {

    const history = useHistory();

    const currentUser = useSelector( state => state.currentUser );

    const { listingId } = useParams();

    const [ thisListing, setThisListing ] = useState( null );

    useEffect( () => {
        fetch( `${ process.env.REACT_APP_API_URL }/listings/${ listingId }` )
            .then( response => {
                if ( response.ok ) return response.json();
                history.push( "/" );
            } ).then( setThisListing );
    }, [ listingId, history ] );

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

    const listingImageCarousel = ( thisListing &&
        <CarouselProvider
            naturalSlideWidth={6}
            naturalSlideHeight={4}
            totalSlides={ thisListing.image_urls.length }
        >
            <Slider>
                { thisListing.image_urls.map( ( imageUrl, index ) => {
                    return <Slide key={ index } index={ index }>
                        <Image as={ CarouselImage } src={ imageUrl } isBgImage={ true }/>
                    </Slide>
                } ) }
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    );

    return ( thisListing &&
        <Container style={ { marginTop: "10px" } }>
            <Segment.Group>
                <Segment>
                    <Header size="huge">{ thisListing.title }</Header>
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
    );

}

export default ListingView;