import { createConsumer } from "@rails/actioncable"

const consumer = createConsumer( process.env.REACT_APP_WS_URL );

export default consumer;