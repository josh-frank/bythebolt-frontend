import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card, Icon, Image, Label, Segment } from "semantic-ui-react";
import { distanceBetween } from "../utilities/distanceBetween";

function ListingCard( { listing } ) {

    const history = useHistory();

    const currentUser = useSelector( state => state.currentUser );

    const daysSinceCreated = Math.floor( ( Date.now() - Date.parse( listing.created_at ) ) / 86_400_000 );

    const newLabel = (
        <Label corner color="red">
            <div style={ { transform: "rotate( 45deg ) translate( 28% )" } }>NEW</div>
        </Label>
    );

    const listingCategoryTags = listing.listing_categories.map( listingCategory => {
        return <Label tag size="mini" key={ listingCategory.id }>{ listingCategory.category.name }</Label>
    } );

    return (
        <Card>
            { listing.image_urls && <Image
                fluid
                src={ listing.image_urls[ 0 ] }
                label={ !daysSinceCreated ? newLabel : null }
            /> }
            <Card.Content>
                <Card.Header as="a" onClick={ () => history.push( `listing/${ listing.id }` ) }>
                    { listing.title }
                </Card.Header>
                <Card.Meta>
                    <Segment.Group horizontal>
                        <Segment>
                            <Icon name="calendar alternate outline" />
                            { !daysSinceCreated ? null : daysSinceCreated }{ daysSinceCreated < 1 ? "Today" : daysSinceCreated === 1 ? " day ago" : " days ago" }
                        </Segment>
                        { currentUser && currentUser.location && <Segment>
                            <Icon name="map signs" />
                            { distanceBetween( listing.user.location, currentUser.location ).toFixed( 1 ) } mi. away
                        </Segment> }
                    </Segment.Group>
                </Card.Meta>
                <Card.Meta>
                    { listingCategoryTags }
                </Card.Meta>
                <Card.Description>
                    { listing.description.split( " " ).slice( 0, 10 ).join( " " ) + "…" }
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <span style={ { fontSize: "21pt", fontWeight: "bold" } }>
                    ${ parseFloat( listing.price ).toFixed( Number.isInteger( parseFloat( listing.price ) ) ? 0 : 2 ) }
                </span>
                { listing.unit && <span style={ { fontSize: "16pt", fontWeight: "bold" } }>/{ listing.unit }</span> }
            </Card.Content>
        </Card>
    );

}

export default ListingCard;