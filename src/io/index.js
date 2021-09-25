var debug = require('debug')('conference-server:socket');
const { Server } = require("socket.io");
const {checkRoomId}=require("./middllewares");
const {ERROR_JOINING_ROOM} = require("./../constants/errorCodes");
const roomClientEvents = require("./events/roomClientEvents");
const io = (server) =>{
    const io = new Server(server);
    //
    debug('Socket server started');
    //conference
    const conf_io = io.of("/conference");
    //middleware
    conf_io.use(checkRoomId);
    //event for conference namespace
    conf_io.on('connection', (socket) => {
        //add events
        roomClientEvents(conf_io, socket);
    });

    return io;
}
 module.exports  = io;
