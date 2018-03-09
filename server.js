var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var ws = require('ws');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: false,
  historyApiFallback: true
}).listen(3000, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});

var lastOffer = null
var sockets = []
var wss = new ws.Server({ port: 8085 })
wss.on('connection', function (socket) {
  console.log('connected %s', socket)
  sockets.push(socket)
  socket.on('message', function (message) {
    console.log('received: %s', message)
    var msg = JSON.parse(message)
    console.log(msg)
    if (msg.type.offer)
      lastOffer = message
    sockets.forEach(function (socket) {
      try {
        socket.send(message)
      } catch (e) {
      }
    })
  })
  socket.on('disconnect', function (socket) {
    console.log('disconnected %s', socket)
    sockets = sockets.filter(function (s) { return s != socket })
    lastOffer = null
  })
  if (lastOffer)
    socket.send(lastOffer)
})