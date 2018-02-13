const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const expect = chai.expect;

const {Post} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {PORT, TEST_DATABASE_URL} = require('../config');
chai.use(chaiHttp)

function seedPostData() {
    console.info('seeding post data');
    const seedData = [];
  
    for (let i=1; i<=10; i++) {
      seedData.push(generatePostData());
    }
    // this will return a promise
    return Post.insertMany(seedData);
  }
  
function generateFStop() {
    const fStop = ['1.8', '3.5', '5', '7.8', '15', '22', '24']
    return fStop[Math.floor(Math.random() * fStop.length)];
    
}
  
function generateShutterSpeed() {
    const shutterSpeed = ['1', '1/20', '1/100', '1/400', '1/600', '1/1000', '1/4000']
    return shutterSpeed[Math.floor(Math.random() * shutterSpeed.length)];
    
}
  
function generateIso() {
    const iso = ['100', '200', '400', '700', '600', '1/1000', '1/4000']
    return iso[Math.floor(Math.random() * iso.length)];
}
 
function generateTime() {
    const fakerDate = faker.date.past()
    var seconds = fakerDate.getTime() / 1000;
    var roundedDate = Math.round(seconds);
    return new Date(roundedDate * 1000)
}

  function generatePostData() {
    return {
      pictureTitle: faker.lorem.words(),
      userName: faker.internet.userName(),
      cameraSettings: {
        fStop: generateFStop(),
        shutterSpeed: generateShutterSpeed(),
        iso: generateIso()
      },
      publishedAt: generateTime(),
      pictureBio: faker.lorem.sentences()
    };
  }

  function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
  }
//----------Describe API resource
  describe('Posts API resource', function() {
  
    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
    
    beforeEach(function() {
        return seedPostData();
      });  
    
    afterEach(function() {
        return tearDownDb();
      });
    
    after(function() {
        return closeServer();
      });

//----------Describe GET ENDPOINT
describe('GET endpoint', function() {
  
it('should return all existing posts', function() {
  
  
  let res;
    return chai.request(app)
      .get('/posts')
      .then(function(_res) {
        console.log(_res)
        res = _res;
        expect(res).to.have.status(200);
        
        expect(res.body.posts).to.have.length.of.at.least(1);
        return Post.count();
      })
      .then(function(count) {
        expect(res.body.posts).to.have.length.of(count);
      
      })
      .catch(err => {
        console.log(err)
      })
      
    });

  it('should return posts with right fields', function() {
    

    let resPost;
    return chai.request(app)
      .get('/posts')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
         console.log(res);
        expect(res.body.posts).to.be.a('array');
        expect(res.body.posts).to.have.length.of.at.least(1);

        res.body.posts.forEach(function(post) {
          expect(post).to.be.a('object');
          expect(post).to.include.keys(
            'id', 'userName', 'publishedAt', 'pictureBio');
        });
        resPost = res.body.posts[0];
        return Post.findById(resPost.id);
      })
      .then(function(post) {
       expect(resPost.id).to.equal(post.id);
        expect(resPost.pictureTitle).to.equal(post.pictureTitle);
        expect(resPost.userName).to.equal(post.userName);
        expect(resPost.cameraSetting).to.equal(post.cameraSetting);
        expect(resPost.publishedAt).to.equal(post.publishedAt.getTime() / 1000);
       

        expect(resPost.pictureBio).to.equal(post.pictureBio);
      });
  });
});

    describe('POST endpoint', function() {
      it('should add a new post', function() {

        const newPost = generatePostData();
        
        return chai.request(app)
        .post('/posts')
        .send(newPost)
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys(
            'id', 'userName', 'cameraSettings', 'pictureBio');
          expect(res.body.userName).to.equal(newPost.userName);
          expect(res.body.id).to.not.be.null;
          expect(res.body.cameraSettings).to.deep.equal(newPost.cameraSettings);
          expect(res.body.pictureBio).to.equal(newPost.pictureBio);
          return Post.findById(res.body.id);

    })
    .then(function(post) {
      expect(post.pictureTitle).to.equal(newPost.pictureTitle);
      expect(post.userName).to.equal(newPost.userName);
      expect(post.cameraSettings.fStop).to.equal(newPost.cameraSettings.fStop);
      expect(post.cameraSettings.shutterSpeed).to.equal(newPost.cameraSettings.shutterSpeed);
      expect(post.cameraSettings.iso).to.equal(newPost.cameraSettings.iso);
      expect(post.cameraSettings.whiteBalance).to.equal(newPost.cameraSettings.whiteBalance);
      expect(post.pictureBio).to.equal(newPost.pictureBio);
    });

  });
});

describe('PUT endpoint', function() {

 
  it('should update fields you send over', function() {
    
    const updateData = {
      pictureTitle: 'tdtdtdttdttdtdtdt',
      pictureBio: 'bean bag fleind flag sniend snag'
      
    };
    console.log(updateData)
    return Post
      .findOne()
      .then(function(post) {
        updateData.id = post.id;

        // make request then inspect it to make sure it reflects
        // data we sent
        return chai.request(app)
          .put(`/posts/${post.id}`)
          .send(updateData);
      })
      .then(function(res) {
        expect(res).to.have.status(204);

        return Post.findById(updateData.id);
      })
      .then(function(post) {
        expect(post.pictureTitle).to.equal(updateData.pictureTitle);
        expect(post.pictureBio).to.equal(updateData.pictureBio);
      });
  });
});

describe('DELETE endpoint', function() {

  it('delete a posts by id', function() {

    let post;

    return Post
      .findOne()
      .then(function(_post) {
        post = _post;
        return chai.request(app).delete(`/posts/${post.id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
        return Post.findById(post.id);
      })
      .then(function(_post) {
        expect(_post).to.be.null;
      });
  });
});
});