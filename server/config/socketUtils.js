/**
 * Created by charleen on 12/10/16.
 */
module.exports = {

    // NOTE TO SELF: check username storage!!


    switchRoom : function(io, currentRoom, newRoom, socket) {

        socket.leave(currentRoom);
        // join new room, received as function parameter
        socket.join(newRoom);
        //state change for chat
        socket.emit('updateChat', 'SERVER', 'you have connected to '+ newRoom);
        // sent message to OLD room
        socket.broadcast.to(currentRoom).emit('updatechat', 'SERVER', socket.username+' has left this room');
        // update socket session room title
        // socket.room = newRoom;
        socket.broadcast.to(newRoom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
        // state change /routing for room change
        socket.emit('updateRooms', rooms, newroom);

    },

    joinRoom : function(io, room, socket) {

        socket.join(room);

        // echo to client they've connected
        socket.emit('updateChat', 'SERVER', 'you have connected to', room);
        // echo to room that a person has connected to their room
        // state change for chat
        socket.broadcast.to('room').emit('updateChat', 'SERVER', username + ' has connected to this room');
        // state change/routing for room change
        socket.emit('updateRooms', rooms, room);

    },


    emitChatEvent : function (io, currentRoom, user, socket) {

        socket.on('sendchat', function (data) {
            // we tell the client to execute 'updatechat' with 2 parameters
            io.sockets.in(currentRoom).emit('updatechat', user, data);
        });

    },

    emitStartVideo: function(io, room) {
        io.sockets.in(room).emit('startVideo');
        console.log('playPause emitted from server-side!')
    },

    emitLoadUrl: function(io, room, url) {
        io.sockets.in(room).emit('loadUrl', url)
        console.log('loadUrl emitted from server-side!')
    }

};

