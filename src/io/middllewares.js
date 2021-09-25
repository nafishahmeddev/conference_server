const checkRoomId = (socket, next) =>{
    const room_id = socket.handshake.query.room_id;
    const name = socket.handshake.query.name;
    if(room_id && name){
        socket.join(room_id);
        next();
    } else {
        const err = new Error("not authorized");
        err.data = { content: "Please retry later" };
        next(err);
    }
}
module.exports = {
    checkRoomId
}
