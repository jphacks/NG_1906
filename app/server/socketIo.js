
module.exports = function (io) {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log('disconnect')
    })

    socket.on('join', (data) => {
      console.log('join:' + JSON.stringify(data))
    })
  })
}
