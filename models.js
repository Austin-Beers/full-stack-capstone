const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postsSchema = mongoose.Schema({
  pictureTitle: {type: String, required: true},
  userName: {type: String, required: true},
  cameraSettings : {
    fStop: String,
    shutterSpeed: String,
    iso: String,
    whiteBalance: String
  },
  publishedAt: {type: Date, default: Date.now},
  pictureBio: {type: String, required: true}
});

postsSchema.methods.serialize = function() {
    return {
      id: this._id,
      pictureTitle: this.pictureTitle,
      userName: this.userName,
      cameraSettings: this.cameraSettings,
      publishedAt: this.publishedAt.getTime() / 1000,
      pictureBio: this.pictureBio
    };
  };

const Post = mongoose.model('Post', postsSchema);

module.exports = {Post};

// js save image to server?
//--https://stackoverflow.com/questions/30795620/get-image-and-upload-save-it-in-server-location
// how allow user to upload image?
//get post request ot add image then get data on image
//--https://stackoverflow.com/questions/38793345/sending-an-image-to-node-js-server-from-client-angularjs
//node module specified to storing file
//--https://github.com/petersirka/node-filestorage 
//store file name at file name 