const express = require('express');
// const morgan = require('morgan');
const app = express();

const usersRouter = require('./usersRouter')
const postsRouter = require('./postsRouter')
const placesRouter = require('./placesRouter')
// app.use(morgan('common'));



app.use(express.static('public'));

app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
})
app.listen(process.env.PORT || 8080);