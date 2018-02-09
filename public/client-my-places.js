var GEN_POSTS = '/posts'
var MOCK_MY_PLACES = {
	"myPlaces": [
        {
            "placeId": "12121212",
            "pictureTitle": "Shred the knar",
            // "pictureFile": path_to_file,
            "userName": "Austin",
            "cameraSettings": {
                "fStop": "3.6",
                "shutterSpeed": "1/250",
                "iso": "800",
                "whiteBalance": "+1"
            },
            "publishedAt": 1470016976209,
            "pictureBio": "My favorite shot from a collab a friend of mine and I had."
        },
        {
            "placeId": "13131313",
            "pictureTitle": "Art of a Samuari",
            // "pictureFile": path_to_file,
            "userName": "Austin",
            "cameraSettings": {
                "fStop": "13",
                "shutterSpeed": "1/1000",
                "iso": "300",
                "whiteBalance": "+2"
            },
            "publishedAt": 1470016976110,
            "pictureBio": "Japanese festival in Philly showed the true culture of pre industrialized Japan"
        }
    ]
};

function getMyPlaces(callbackFn) {
    setTimeout(function(){ callbackFn(GEN_POST)}, 1000);
}


function displayMyPlaces(data) {
    for (index in data.myPlaces) {
       $('body').append(
        '<p>' + data.myPlaces[index].userName + '</p>');
    }
}

function getAndDisplayMyPlaces() {
    getMyPlaces(displayMyPlaces);
}

$(function() {
    getAndDisplayMyPlaces();
})