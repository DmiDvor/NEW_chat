const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

server.listen(3000) // Слушаем порт 3000

app.get('/', function(request, response) {
    // По запросу отправляем файл index.html
    response.sendFile(__dirname + '/index.html')
})

users = [] // массив пользователей
connections = [] // массив соединений

io.sockets.on('connection', function(socket) {
    console.log('Succefull connect')
    // Отслеживание события connection и добавление в массив onnections соотв сокета
    connections.push(socket)
    socket.on('disconnect', function(data) {
        // Отслеживание дисконнекта и удаление из массива соотв сокета по его индексу
        connections.splice(connections.indexOf(socket), 1)
        console.log('disconnect')

    })
    // Создаём событие отправки сообщения
    socket.on('send mess', function(data) {
        //Вызов события add mess, создание обьекта и передача data.mess и data.name в него
        io.sockets.emit('add mess', {mess: data.mess, name: data.name})
    })

})
