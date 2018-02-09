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
      userName: this.userName,
      cameraSettings: this.cameraSettings,
      publishedAt: this.publishedAt,
      pictureBio: this.pictureBio
    };
  };

const Post = mongoose.model('Post', postsSchema);

module.exports = {Post};