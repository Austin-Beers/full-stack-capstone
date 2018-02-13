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
    setTimeout(function()
    { 
        callbackFn(GEN_POST)
    }, 
    1000);
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

//-------------AJAX_CALLS_FOR_POSTS-------------------
function getDataFromPosts(callback) {
    const settings = {
        url: GEN_POSTS,
        data: {
            // apiKey: 'f4arv7xx2b3a7n6tpvezn945',
            // query: searchTerm,
            // start: partsIndex,
        },
        dataType: 'jsonp',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);

}

function renderPostsData(result) {
return 
`
    <div class="posts-container">
        <a class="main-post-picture">${result.pictureFile}</a>
        <h2>
            <a class="picture-un">${result.userName}</a>
            <a class="picture-title">${result.pictureTitle}</a>
            <a class="camera-settings">${result.cameraSettings}</a>
            <a class="picture-bio">${result.pictureBio}</a>
            <a class="publish-time">${result.publishedAt}</a>
        </h2>
    </div>
`
}

function displayPostsData(data) {
    console.log(data, "data")
    let totalResultsFnd = `<h5> Your search returned <span id='resultNum'>${data.count}</span> result(s).</h5>`;
    const searchResults = data.results.map((item, index) => renderEtsyResult(item));
    $("#totalNum1").html(totalResultsFnd);
    $("#aa-result").html(searchResults);
    console.log(aaIndex);
    addToAAIndex(data.results.length);

}