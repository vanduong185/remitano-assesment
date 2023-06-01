import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_SERVER_ADDRESS || 'http://localhost:3000';

export const socket = io(URL);

