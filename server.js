var io = require('socket.io')(process.env.PORT || 8080);

console.log('server started\n');

io.on('connection', function (socket) {
//To both clients    
    socket.emit('register');
    console.log('new client connected');
//==============================================================
    /****   TABLE   ****/
//From mobile to PC
    socket.on('table', function() {
        console.log('creat table');
        socket.broadcast.emit('table');
    });

//From PC to mobile    
    socket.on('tablePos', function(data) {
        console.log('table position is:', JSON.stringify(data));
        socket.broadcast.emit('tablePos', data);        
    });
//==============================================================
    /****   CHAIR   ****/
//From mobile to PC
    socket.on('chair', function() {
        console.log('creat chair');
        socket.broadcast.emit('chair');
    });

//From PC to moblie
    socket.on('chairPos', function(data) {
        console.log('chair position is:', JSON.stringify(data));
        socket.broadcast.emit('chairPos', data);        
    });
//==============================================================
//From mobile DB to PC
    socket.on('create', function(data) {
        console.log('previously existing data', JSON.stringify(data));
        socket.broadcast.emit('create', data);
    });

//From both clients
    socket.on('disconnect', function () {
        console.log('disconnected from server');
        socket.leave(socket.room);
    });
});