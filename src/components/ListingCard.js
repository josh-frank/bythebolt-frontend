import { useSelector } from "react-redux";
import { Card, Icon, Image, Label, Segment } from "semantic-ui-react";
import { distanceBetween } from "../utilities/distanceBetween";

function ListingCard( { listing } ) {

    const currentUser = useSelector( state => state.currentUser );

    const daysSinceCreated = Math.floor( ( Date.now() - Date.parse( listing.created_at ) ) / 86_400_000 );

    const newLabel = (
        <Label corner color="red">
            <div style={ { transform: "rotate( 45deg ) translate( 28% )" } }>NEW</div>
        </Label>
    );

    return (
        <Card>
            <Image
                fluid
                src='https://react.semantic-ui.com/images/wireframe/image.png'
                label={ !daysSinceCreated ? newLabel : null }
            />
            <Card.Content>
                <Card.Header>{ listing.title }</Card.Header>
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