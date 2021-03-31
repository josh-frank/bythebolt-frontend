import { /* ButtonBack, ButtonNext, */ CarouselProvider, Slide, Slider } from "pure-react-carousel";
import { useEffect, useState } from "react";
import { Container, Header, /* Icon, */ Image } from "semantic-ui-react";
import ListingCard from "./ListingCard";

function HomePage() {

    const [ newListings, setNewListings ] = useState( [] );

    useEffect( () => {
        fetch( `${ process.env.REACT_APP_API_URL }/listings/new/10` ).then( response => response.json() ).then( setNewListings );
    }, [] );

    const headerCarousel = (
        <CarouselProvider
            naturalSlideWidth={ 965 }
            naturalSlideHeight={ 270 }
            infinite={ true }
            isPlaying={ true }
            totalSlides={ 6 }
        >
            <Slider>
                <Slide>
                    <Header style={ {
                        fontFamily: "Bitstream Vera Serif Bold",
                        fontSize: "21pt",
                        color: "white",
                        textShadow: "-2px 0 black, 5px 5px black, 0 0 25px black",
                        position: "absolute",
                        left: "66%",
                        top: "10%",
                        zIndex: "1000"
                    } }>
                        Find your next project
                    </Header>
                    <Image fluid src="/slides/slide1.jpg" />
                </Slide>
                <Slide>
                    <Header style={ {
                        fontFamily: "Bitstream Vera Serif Bold",
                        fontSize: "21pt",
                        color: "black",
                        textShadow: "-2px 0 white, 0 0 25px white",
                        position: "absolute",
                        left: "5%",
                        top: "10%",
                        zIndex: "1000"
                    } }>
                        Learn a new stitch
                    </Header>
                    <Image fluid src="/slides/slide2.jpg" />
                </Slide>
                <Slide>
                    <Header style={ {
                        fontFamily: "Bitstream Vera Serif Bold",
                        fontSize: "21pt",
                        color: "white",
                        textShadow: "-2px 0 black, 5px 5px black, 0 0 25px black",
                        position: "absolute",
                        left: "66%",
                        top: "10%",
                        zIndex: "1000"
                    } }>
                        Start a collection
                    </Header>
                    <Image fluid src="/slides/slide3.jpg" />
                </Slide>
                <Slide>
                    <Header style={ {
                        fontFamily: "Bitstream Vera Serif Bold",
                        fontSize: "21pt",
                        color: "white",
                        textShadow: "-2px 0 black, 5px 5px black, 0 0 25px black",
                        position: "absolute",
                        left: "66%",
                        top: "10%",
                        zIndex: "1000"
                    } }>
                        Make it new again
                    </Header>
                    <Image fluid src="/slides/slide4.jpg" />
                </Slide>
                <Slide>
                    <Header style={ {
                        fontFamily: "Bitstream Vera Serif Bold",
                        fontSize: "21pt",
                        color: "black",
                        textShadow: "-2px 0 white, 0 0 25px white",
                        position: "absolute",
                        left: "5%",
                        top: "10%",
                        zIndex: "1000"
                    } }>
                        Find life's colors
                    </Header>
                    <Image fluid src="/slides/slide5.jpg" />
                </Slide>
                <Slide>
                    <Header style={ {
                        fontFamily: "Bitstream Vera Serif Bold",
                        fontSize: "21pt",
                        color: "black",
                        textShadow: "-2px 0 white, 0 0 25px white",
                        position: "absolute",
                        left: "30%",
                        top: "10%",
                        zIndex: "1000"
                    } }>
                        Take it slow
                    </Header>
                    <Image fluid src="/slides/slide6.jpg" />
                </Slide>
            </Slider>
            {/* <ButtonBack
                className="ui small blue button"
                style={ { position: "absolute", left: "10%", top: "50%" } }
            >
                <Icon name="backward" />
            </ButtonBack>
            <ButtonNext
                className="ui small blue button"
                style={ { position: "absolute", right: "10%", top: "50%" } }
            >
                <Icon name="forward" />
            </ButtonNext> */}
        </CarouselProvider>
    );

    const newListingsSlides = ( !!newListings.length &&
        <Slider>
            { newListings.map( ( newListing, index ) => {
                return <Slide key={ index } index={ index }>
                    <ListingCard listing={ newListing } />
                </Slide>
            } ) }
        </Slider>
    );

    return (
        <Container className="center aligned" style={ { marginTop: "10px" } }>
            { headerCarousel }
            <Header size="huge">New listings</Header>
            <CarouselProvider
                naturalSlideWidth={ 2 }
                naturalSlideHeight={ 4 }
                totalSlides={ newListings.length }
                visibleSlides={ 4 }
                isPlaying={ true }
            >
                { newListingsSlides }
            </CarouselProvider>
        </Container>
    );

}

export default HomePage;