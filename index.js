//jshint: esversion 6

const serveStatic = require('serve-static');
const express = require('express');
const app = express();
const cors = require('cors');
// app.use(express.static("public"));

// app.get('', (req, res) => {
//     res.sendFile("index.html")
// });
app.use(cors());
app.options('*', cors());

var history = require('connect-history-api-fallback');

app.use(history());
app.use(serveStatic(__dirname + '/dist'));

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {



    socket.on('howdy', (message) => {

        console.log(message);

    });



    socket.on('breath', (breath) => {
        socket.broadcast.emit('breath', breath);
    });
    socket.on('bite', (bite) => {
        socket.broadcast.emit('bite', bite);
    });
    socket.on('nod', (nod) => {
        socket.broadcast.emit('nod', nod);
    });
    socket.on('tilt', (tilt) => {
        socket.broadcast.emit('tilt', tilt);
    });
    socket.on('heartbeat', (heartbeat) => {
        socket.broadcast.emit('heartbeat', heartbeat);
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('listnin 3K yeet');
});