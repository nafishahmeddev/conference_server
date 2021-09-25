module.exports =  (io, socket) =>{
    const room = socket.handshake.query.room_id;

    socket.on("join", ()=>{
        console.log(socket.id ," has joined to ===> ", room);
        socket.broadcast.to(room).emit("join", socket.id);
    });
    socket.on("candidate", (candidate) => {
        console.log("candidate received from ===> ", socket.id);
        socket.broadcast.to(room).emit("candidate", {
            from: socket.id,
            candidate:candidate
        });
    });
    socket.on("offer", (offer) => {
        console.log("offer received from ===> ", socket.id);
        socket.broadcast.to(room).emit("offer", {
            from: socket.id,
            offer: offer
        });
    });
    socket.on('answer', (event) => {
        console.log("answer received from ===> ", socket.id);
        socket.in(room).to(event.to).emit('answer', {
            from : socket.id,
            answer: event.answer
        });
    })
    socket.on("disconnect", () => {
        console.log("disconnected from ===> ", socket.id);
        socket.broadcast.to(room).emit("detached", socket.id);
        socket.leave(room);
    });
}

