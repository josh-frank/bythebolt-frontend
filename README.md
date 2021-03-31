# Buy The Bolt

Buy The Bolt is a draft design for an e-commerce/social network for the textile arts community, created by Josh Frank as his capstone project for the [Flatiron School](https://flatironschool.com/)'s [software engineering program](https://flatironschool.com/career-courses/coding-bootcamp).

The back end repository may be viewed [here](https://github.com/josh-frank/bythebolt-backend).

## Features and functionality

- Users may create an account and then sign in
    - login remains valid until logout or cache clearing through a `localStorage` token
- Upon signing in a User may upload an avatar and update their email address, bio and location
    - Users may upload image/s to illustrate a listing
- Users may create a listing with a name, price, quantity, unit and category tags
- Users may search for listings with a query and sort/filter search results by date, price and location
- Users may add/remove listings to/from a list of favorites
- Users may update or delete their own listings
- Users may express interest and plan to purchase a listing through a chat/message feature which updates live without a window refresh

## Technologies used

- Front end
    - JavaScript
    - React
    - Redux (state management)
    - Semantic UI for React (styling)
    - Miscellaneous packages/hooks including:
        - [react-leaflet](https://react-leaflet.js.org/)
        - [react-dropzone](https://github.com/react-dropzone/react-dropzone)
        - [react-pure-carousel](https://www.npmjs.com/package/pure-react-carousel)
- Back end
    - Ruby on Rails
    - ActionChannel (WebSocket for chat feature)
    - Miscellaneous gems including:
        - [kaminari](https://www.npmjs.com/package/pure-react-carousel) (pagination)
        - [cloudinary](https://www.npmjs.com/package/pure-react-carousel) (cloud image storage)

## Acknowledgments

Josh is incredibly grateful to his instructors and colleagues at Flatiron, including but not limited to Sylwia Vargas, Tashawn Williams, Eric Kim, Michelle Rios, Ian Hollander, Hasibul Chowdhury, and Danny Sasse. He couldn't have created any of this without their support, patience and loving kindness.
