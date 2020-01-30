const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
  res.send("Woof Woof! We are out of the Pound!")
});

// define our port variable
const port = process.env.PORT || 5000;
// Instruct our server to listen for connections on that port
server.listen(port, ()=> console.log(`\n Running on port ${port}\n`))


