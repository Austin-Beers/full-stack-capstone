const uuid = require('uuid');


function StorageException(message) {
    this.message = message;
    this.name = "StorageException";
  }

  const Posts = {
      create: function(pictureTitle, userName, cameraSettings, pictureBio){
        console.log('Creating new place');
      
        const place = {
            pictureTitle: pictureTitle,
            placeId: uuid.v4(),
            userName: userName,
            cameraSettings: cameraSettings,
            pictureBio: pictureBio
        };
        this.places[place.id]= place;
        return place;
       },
       get: function(){
        console.log('Retrieving places')
        return Object.keys(this.places).map(key => this.places[key]);
       },
       delete: function(placeId){
        console.log(`Deleting place \`${placeId}\``);
        delete this.places[id];
       },
       update: function(updatedPlace) {
        console.log(`Deleting place \`${updatedPlace.placesId}\``);
        const {placeId} = updatedPlace;
        if (!(placeId in this.places)) {
            throw StorageException(
                `Can't update place \`${placeId}\` because doesn't exist.`)
            }
            this.places[updatedPlace.placeId] = updatedPlace;
            return updatedPlace;
        }
       };
 
function Posts() {
     const storage = Object.create(Posts);
     storage.places = {};
     return storage;
  }      
 
    