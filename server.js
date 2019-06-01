const express = require('express')
const io = require('socket.io').listen(server)

const app = express()
const server = require('http').createServer(app)

server.listen(3000)

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html')
})