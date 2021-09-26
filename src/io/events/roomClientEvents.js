const getWhiteSpace = (word, max = 0) =>{
    let length = max - word.length;
    for (let x=0; x<length; x++) {
        word += " ";
    }
    return word;
}
const debug = (incoming=true, event, from,  to="", room="") =>{
    room = getWhiteSpace(room, 15);
    event = getWhiteSpace(event, 10);
    console.log(
        '\x1b[36m', `conference-server:socket`,'\x1b[0m',
        '\x1b[32m', incoming?"↓":"↑" ,'\x1b[0m',
        `\x1b[35m${room}\x1b[0m`,
        event,
        `\x1b[35m${from}\x1b[0m`,
        '\x1b[32m', "→" ,'\x1b[0m',
        `\x1b[35m${to}\x1b[0m`)

}
module.exports =  (io, socket) =>{
    const room = socket.handshake.query.room_id;
    const name = socket.handshake.query.name;
    socket.on("join", ()=>{
        debug(true , "JOIN", socket.id,"Broker",room);
        socket.broadcast.to(room).emit("join", {
            id: socket.id,
            name: name
        });
    });
    socket.on("candidate", (event) => {
        debug(true , "CANDIDATE", socket.id, event.to, room);
        socket.to(event.to).emit("candidate", {
            from: socket.id,
            candidate:event.candidate
        });
    });
    socket.on("offer", (event) => {
        debug(true , "OFFER", socket.id, event.to, room);
        socket.to(event.to).emit("offer", {
            from: socket.id,
            name: name,
            offer: event.offer
        });
    });
    socket.on('answer', (event) => {
        debug(true , "ANSWER", socket.id, event.to, room);
        socket.to(event.to).emit('answer', {
            from : socket.id,
            answer: event.answer
        });
    })

    socket.on("disconnect", () => {
        debug(false , "DISCONNECT", socket.id, "Everyone", room);
        socket.broadcast.to(room).emit("detached", socket.id);
        socket.leave(room);
    });
}

