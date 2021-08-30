// Import modules and initialize other stuff
const parser=require('./parser.js');
client.on('messageCreate', (message) => {
  parser.parseMessage(client, message);
};
