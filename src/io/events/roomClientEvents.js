
module.exports =  (io, socket) =>{
    const room = socket.handshake.query.room_id;
    let debug = require('debug')(`conference-server:socket:${room}`);

    socket.on("join", ()=>{
        debug(socket.id ," has joined to ===> ", room);
        socket.broadcast.to(room).emit("join", socket.id);
    });
    socket.on("candidate", (event) => {
        debug("candidate received from ===> ", socket.id, "for===>", event.to);
        socket.to(event.to).emit("candidate", {
            from: socket.id,
            candidate:event.candidate
        });
    });
    socket.on("offer", (event) => {
        debug("offer received from ===> ", socket.id, "for===>", event.to);
        socket.to(event.to).emit("offer", {
            from: socket.id,
            offer: event.offer
        });
    });
    socket.on('answer', (event) => {
        debug("answer received from ===> ", socket.id, "for===>", event.to);
        socket.to(event.to).emit('answer', {
            from : socket.id,
            answer: event.answer
        });
    })

    socket.on("disconnect", () => {
        debug("disconnected from ===> ", socket.id);
        socket.broadcast.to(room).emit("detached", socket.id);
        socket.leave(room);
    });
}

