// Import deps
const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const port =process.env.port || 3000;
nicknames = [];
// create app
const app = express()
const http= require('http').Server(app)
const io = require ('socket.io')(http)
const crypto = require('crypto')

// async
crypto.randomBytes(256, (err, buf) => {
  if (err) throw err;
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});
// Use body parer
app.use(bodyParser.urlencoded({ extended: false }))

// Homepage
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// Register
app.use('/register', require('./routes/register'))

// Login
app.get('/login', function(req, res) {
  res.sendFile(__dirname + '/views/login.html')
 
})

io.sockets.on('connection', function(socket) {
    //when receiving the data from the server, push the same message to client.
    socket.on("clientMsg", function(data){
    //send the data to the current client/sent.
      socket.emit("serverMsg", data);
      //send the to all the clients who are accessing the same site(localhost)
      socket.broadcast.emit("serverMsg", data);
    });
    
    socket.on ("sender", function(data){
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
  });




app.post('/login', function(req, res) {
  database.User.findOne({
    where: {email: req.body.email}
  })
  .then(function(user) {
    if (!user) {
      res.send('Please register first')
    } else if (user.password === req.body.password) {
      //res.send('Logged in')
      res.redirect('/')
    } else {
      res.send('Incorrect password')
    }
  })
  .catch(function(e) {
    res.send('Error logging in')
    console.log(e)
  })
})

database.sequelize.authenticate()
.then(function() {
  console.log('Db connection succesful')
  database.sequelize.sync().then(() => {
    console.log('Db synced')
      http.listen(port, function(){
      console.log('listening on *:' + port);
    })
  })
})
.catch(function(error) {
  console.error(error)
})
