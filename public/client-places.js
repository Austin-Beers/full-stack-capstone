var MOCK_PLACES_UPDATE = {
	"placesUpdates": [
        {
            "placeId": "333333",
            "pictureTitle": "bean",
            // "pictureFile": path_to_file,
            "userName": "Bobert",
            "cameraSettings": {
                "fStop": "5.5",
                "shutterSpeed": "1/20",
                "iso": "300",
                "whiteBalance": "+1"
            },
            "publishedAt": 1470016976609,
            "pictureBio": "This picture was inspire by one of my coworkers and the location was easily accessable by vehicle"
        },
        {
            "place": {
                "city":"Phoinex",
                "state":"Arizona",
                "country":"United States"
            },
            "landmark":"oranges",
            "pictureTitle": "Great Divide",
            // "pictureFile": path_to_file,
            "userName": "Gert",
            "cameraSettings": {
                "fStop": "10",
                "shutterSpeed": "1/2000",
                "iso": "1000",
                "whiteBalance": "+.5"
            },
            "publishedAt": 1470016976610,
            "pictureBio": "I love the grand-canyon so I wanted to share my best picture"
        },
        {
            "placeId": "2222222",
            "pictureTitle": "Lost hope",
            "userName": "Flootwood",
            "cameraSettings": {
                "fStop": "1.5",
                "shutterSpeed": "1.8",
                "iso": "6000",
                "whiteBalance": "-1.5"
            },
            "publishedAt": 1470016976710,
            "pictureBio": "THis image shows a visual representation of my life"
        },
        {
            "placeId": "4444444",
            "pictureTitle": "grammer check",
            "userName": "vaccinequeen",
            "cameraSettings": {
                "fStop": "15",
                "shutterSpeed": "1/800",
                "iso": "400",
                "whiteBalance": "0"
            },
            "publishedAt": 1470016976809,
            "pictureBio": "This picture shows the daily struggle of the college student"
        }
    ]
};

function getUpdatePlaces(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_PLACES_UPDATE)}, 1000);
}


function displayUpdatePlaces(data) {
    console.log(data)
    for (index in data.placesUpdates) {
        $('body').append(
        '<p>' + data.placesUpdates[index].userName + '</p>');
    }
}

function getAndDisplayUpdatePlaces() {
    getUpdatePlaces(displayUpdatePlaces);
   
}

$(function() {
    getAndDisplayUpdatePlaces();

})
