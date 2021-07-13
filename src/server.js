const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

let tick = 0;
let plusOrMinus = 0;
let today = new Date().toISOString().slice(0, 10)
// 1. listen for socket connections
io.on('connection', client => {
  setInterval(() => {
    plusOrMinus = Math.random() < 0.5 ? (plusOrMinus+=0.005) :  (plusOrMinus-=0.005);
    plusOrMinus = parseFloat(plusOrMinus.toFixed(6))
    client.emit('rrbf', {
      name: tick,
      atm: plusOrMinus,
      drr25: plusOrMinus,
      drr10: plusOrMinus,
      dbf25: plusOrMinus,
      dbf10: plusOrMinus,
      expDate: today,
    });
  }, 1000);
});

io.on('connection', client => {
  setInterval(() => {
    plusOrMinus = Math.random() < 0.5 ? (plusOrMinus+=0.007) :  (plusOrMinus-=0.007);
    plusOrMinus = parseFloat(plusOrMinus.toFixed(6))
    client.emit('callPut', {
      name: tick,
      atm: plusOrMinus,
      drr25: plusOrMinus,
      drr10: plusOrMinus,
      dbf25: plusOrMinus,
      dbf10: plusOrMinus,
      expDate: today,
    });
  }, 1000);
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

server.listen(3000);
