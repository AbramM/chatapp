const express = require('express')
const database = require('../database')

const router = express.Router()

router.get('/', function(req, res) {
  res.send(`
  <head>
  <header>
<header class="w3-container w3-padding-32 w3-center w3-black" id="home">
  <a href="/login" class="w3-right w3-bar-item w3-button" onclick="w3_open()"><i class="fa fa-bars"></i></a>
    <h1 class="w3-jumbo"><span class="w3-hide-small">Yo</span>Bro!</h1>
    <p>chatting application</p>
    
    </header>
   </head>

    <h2>Register</h2>
   <form action="/register" method="post"> 
     <div>
    <label for="username">Username</label></br>
    <input type="text" required name="username" id="username" placeholder="username">
   </div>     
    <div>
    <label for="email">Email</label></br>
    <input type="text" required name="email" id="email" placeholder="Email">
   </div>
   <div>
    <label for="password">Password</label></br>
    <input type="password" required name="password" id="password" placeholder="Password">
   </div>
   <div>
    <label for="password">Repeat Password</label></br>
    <input type="password"required name="repeatpassword" id="password" placeholder="Reapeat Password">
   </div>
    <div>
    <input type="submit" value="Register">
     </div>
     </form>
  


  `)
})

router.post('/', function(req, res) {
  // register
  database.User.create({
   username:req.body.username,
   email: req.body.email,
   password: req.body.password,
   confirmPassword:req.body.confirmPassword,
  }).then(function() {
    res.send(`
      <h2>Thank you, you can <a href="/login">login</a> now</h2>
    `)
  })
  .catch(function(e) {
    res.send('Error registering')
    console.log(e)
  })
})

module.exports = router
