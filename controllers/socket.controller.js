module.exports = {
    userJoinRoom: (io, socket, data) =>{
        const {roomId} = data;
        socket.join(roomId);
        //send to room members avoid sender
        // socket.to(roomId).emit('room:newMember', {userName: socket.id})

        //send to room members include sender
        io.to(roomId).emit('room:newMember', {userName: socket.id})
    }
}