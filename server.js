const io = require('socket.io')(3000, {
    cors: {
        origin: "*"
    }
})
users = {};

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.emit('user-connected', name)
    })
    socket.on('new-message', text => {
        socket.broadcast.emit('user-message', {message: text, user: users[socket.id]})
    })
})