module.exports = function(io) {

    connections = [];

    io.on('connection', function (socket) {

        connections.push(socket);
        console.log('Connection: %s users connected', connections.length)

        socket.on('join', function(room){
            socket.join(room);
            console.log('new user in room:', room)

            socket.on('URL', function(data) {
                io.to(room).emit('loadUrl', data.url)
                console.log('serverside', data.url);
            });

            socket.on('playPause', function() {
                io.to(room).emit('startVideo')
                console.log('playpause emitted on serverside')
            });

            socket.on('messageSent', function(message, username) {
                io.to(room).emit('postMessage', message, username)
                console.log('message received on the serverside', message, username);
            })

            socket.on('disconnect', function() {
                connections.splice(connections.indexOf(socket), 1);
                console.log('Connection: %s users connected', connections.length)
            });
        });
    });
}



