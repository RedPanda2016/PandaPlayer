var utils = require ('./socketUtils.js')

module.exports = function(io) {

    rooms = [];
    connections = [];
    //persist users? talk w duncan about using database.

    //Events that we need to emit:

    // open a connection with sockets.io
    io.sockets.on('connection', function (socket) {

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
            })

                   // this is to navigate to a pre-existing room
            socket.on('join', function (room) {

                // establish room name here
                // socket.room = room; --not necessary?

                // store the username in the socket session for this client
                // socket.username = username --not necessary?

                // here...DB query?


                socket.join(room);

            // echo to client they've connected
            socket.emit('updatechat', 'SERVER', 'you have connected to', room);
            // echo to room that a person has connected to their room
            socket.broadcast.to('room').emit('updatechat', 'SERVER', username + ' has connected to this room');
            socket.emit('updaterooms', rooms, room);

                // when the client emits 'sendchat', this listens and executes
                socket.on('sendchat', function (data) {
                    // we tell the client to execute 'updatechat' with 2 parameters
                    io.sockets.in(socket.room).emit('updatechat', socket.username, data);
                });
        });


        socket.on('switchRoom', function(newroom) {
            // leave the current room (stored in session)
            socket.leave(socket.room);
            // join new room, received as function parameter
            socket.join(newroom);
            socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
            // sent message to OLD room
            socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
            // update socket session room title
            socket.room = newroom;
            socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
            socket.emit('updaterooms', rooms, newroom);
        });

        // when the user disconnects from a room

        socket.on('disconnectFromRoom', function() {

            // echo globally that this client has left
            socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            socket.leave(socket.room);

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

        user.on('new user', function(data, callback) {
            callback(true);

           // db query?

        });

    });

}



    // function(req, res) { // add a new post and if needed a username
    //   db.User.findOrCreate({where: {userName: req.body.userName, firstName: req.body.firstName, lastName: req.body.lastName}})
    //     .spread(function(user, created) {
    //       db.Post.create({
    //         userId: user.get('id'),
    //         userPost: req.body.userPost
    //       })
    //       .then(function(message) {
    //         res.status(201);
    //         res.end();
    //       });
    //     });    },


