// import { stringify } from 'querystring';



const express = require('express');
const morgan = require('morgan');
const {Post} = require('./models');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const uuidv4 = require('uuid/v4');   
const path = require('path');
const fs = require('fs');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL, TEST_DATABASE_URL} = require('./config');
const app = express();
app.use(morgan('common'));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());

//----------PLACES ENDPOINT-------------------------------------------




//----------Get posts from places

app.get('/uploads',(req, res) =>{
res.send(req.params.uuidFile)
});


app.get('/posts',(req, res) =>{
   console.log('recieved req')
  Post
    .find()
    .then(posts => {
      console.log('recieved post')
      res.json({
       posts: posts.map(
        (post) => post.serialize())
      });
      })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'something went screwy' });
      });
      console.log('finished req')
    });

app.get('/posts/:id', (req, res) => {
  Post
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went screwy' });
    });
});

//---------Adding new post to places
//---------have a way to expell useless files that were randomized with uuidv4
//----------link with cloud that is financially responsible
app.post('/fileupload',(req, res) =>{
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files){
  // console.log(files)
  const oldPath = files[0].path;
  const clientPath = uuidv4(oldPath);
  const newPath = __dirname + '/uploads/' + clientPath + '.jpg';
  
  fs.rename(oldPath, newPath, function (err) {
   returnObj = {
     path: clientPath
   }
    if (err) throw err;
    res.write(JSON.stringify(returnObj) )
    console.log('File uploaded!')
    res.end();
  });
  })
});



app.post('/posts', (req, res) => {
  console.log(req);
  const requiredFields = ['pictureTitle', 'userName', 'pictureBio'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Post
    .create({
      pictureTitle: req.body.pictureTitle,
      userName: req.body.userName,
      uuidFile: req.body.uuidFile,
      cameraSettings: req.body.cameraSettings,
      pictureBio: req.body.pictureBio
    })
    .then(post => res.status(201).json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went screwy' });
    });
  });

// //-----------Updating a previous post in places

app.put('/posts/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body  id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['pictureTitle', 'pictureBio'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Post
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedPost => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Something went screwy' }));
});

//---------Deleting posts

app.delete('/posts/:id', (req, res) => {
  Post
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went screwy' });
    });
});

app.delete('/:postsId', (req, res) => {
  Post
    .findByIdAndRemove(req.params.placeId)
    .then(() => {
      console.log(`Deleted post with place id \`${req.params.placeId}\``);
      res.status(204).end();
    });
});

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});




//--------RUN SERVER/CLOSE SERVER-----------------------------------
let server;
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  console.log("====================")
  console.log(databaseUrl)
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
  };
  
  module.exports = {app, runServer, closeServer};


  

