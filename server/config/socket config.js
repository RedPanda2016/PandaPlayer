var utils = require ('./socketUtils.js')

module.exports = function(io) {

    rooms = [];
    connections = [];
    //persist users? talk w duncan about using database.

    //Events that we need to emit:

    // open a connection with sockets.io
    io.sockets.on('connection', function (socket) {

        // var username = socket.username

        //add opened socket to connections array
        connections.push(socket);

        // console.log number of sockets connected (regex expression)
        console.log('Connection: %s users connected', connections.length)


        // query the database to insert the socket's username and ot


        // socket will listen for an adduser event to be emitted from the client
        // this event will be triggered when a user has logged on

            socket.on('userSignedOn', function(username) {

            // once the client is connected, server will expect a ping from the client saying which room they would like to join

            //event emitter if the client wants to create a new room, to be followed by 'room' emitter

            socket.on('createRoom', function (newRoom) {
                rooms.push(newRoom);
                socket.emit('updaterooms', rooms);
            });

            // this is to navigate to a pre-existing room
            socket.on('join', function (room) {

                // echo to client they've connected
                // echo to room that a person has connected to their room
                // when the client emits 'sendchat', listen and executes
                // we tell the client to execute 'updatechat' with 2 parameters

                utils.joinRoom(io, room, socket);

                socket.on('sendchat', function (data) {
                    utils.emitChatEvent(io, room, socket, data)
                });

                socket.on('startVideoSync', function() {
                    // Sends the command to start the videos.
                    utils.emitStartVideo(io, room);
                });



            socket.on('switchRoom', function(newRoom) {
                // leave the current room (stored in session)
                utils.switchRoom(io, room, newRoom, socket)


             });

        // when the user disconnects from a room

            socket.on('disconnectFromRoom', function(room) {

            // echo globally that this client has left
            //     socket.broadcast.emit('updatechat', 'SERVER', socket, ' has disconnected');
                socket.leave(room);

            });
        });
                // Namespace: Represents a pool of sockets connected under a given scope identified by a pathname (eg: /


        //disconnect socket from server
        socket.on('disconnect', function(data) {
            connections.splice(connections.indexOf(socket), 1);
            //console.log how many sockets are still connected
            console.log('Disconnected: %s of sockets connected', connections.length)
        })

    }


        // populate rooms?

    });

}



