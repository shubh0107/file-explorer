var http = require('http');
var app = require('./app');

const port = 3000;
/*
const requestHandler = function(request, response) {
    console.log(request.url);
    response.end('Hello Node.js Server!');
};
*/

const server = http.createServer(app);
server.on('error', onError);


server.listen(port, function(err) {
    if (err) {
        return console.log('Something bad happened', err);
    }

    console.log('....Server is listening on '+port);
});


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
