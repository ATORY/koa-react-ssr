// console.log('footer');
const socket = new WebSocket('ws://localhost:9876');

// Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Hello Server!');
// });

// Listen for messages
socket.addEventListener('message', (event) => {
  console.info('Message from server ', event.data);
  if (event.data === 'reload') {
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
  }
});
