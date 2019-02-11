import opensocket from "socket.io-client";

const Socket = opensocket("http://localhost:4000");

export default Socket;
