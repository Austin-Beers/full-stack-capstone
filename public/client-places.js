var GEN_POSTS = '/posts'
let files;
var MOCK_PLACES_UPDATE = {
	"placesUpdates": [
        {
            "id": "333333",
            "pictureTitle": "bean",
            //"pictureFile": path_to_file,
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
            "id": "2222222",
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
            "id": "4444444",
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
        $('.explore').append(
        '<p>' + data.placesUpdates[index].userName + '</p>');
    }
}

function getAndDisplayUpdatePlaces() {
    getUpdatePlaces(displayUpdatePlaces);
   
}

$(function() {
    getAndDisplayUpdatePlaces();

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

//------------Ajax call for /uploads/



function prepareUpload(event) {
        
        files = event.target.files;

}

function uploadCompletePost(event) {
    // implement second ajax call for textual informationthat alos include the saved image 
    //create ajax request to upload image
    event.stopPropagation(); // Stop stuff happening
    event.preventDefault();
    var data = new FormData();
    
    $.each(files, function(key, value)
    {
        data.append(key, value);
        console.log(key, value);
    });
    
    $.ajax({
        url: '/fileupload',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
            if(typeof data.error === 'undefined')
            {
                // Success so call function to process the form
                handleImgSave(event, data);
            }
            else
            {
                // Handle errors here
                console.log('ERRORS: ' + data.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            // Handle errors here
            console.log('ERRORS: ' + textStatus);
            // STOP LOADING SPINNER
        }
    });
}


function handleImgSave(event, data){
    event.stopPropagation(); 
    event.preventDefault();
    // console.log(data)
    let $pictureTitle = $("input[name=picture-title]");
    let $userName = $("input[name=user-name]");
    let $fStop = $("input[name=f-stop]");
    let $shutterSpeed = $("input[name=shutter-speed]");
    let $iso = $("input[name=iso]");
    let $whiteBalance = $("input[name=white-balance]");
    let $pictureBio = $("input[name=picture-bio]");
    const newData = {
        pictureTitle: $pictureTitle.val(),
        uuidFile: data.path,
        userName: $userName.val() ,
        cameraSettings: {
            fStop: $fStop.val(),
            shutterSpeed: $shutterSpeed.val(),
            iso: $iso.val(),
            whiteBalance: $whiteBalance.val(),
        },
        pictureBio: $pictureBio.val(),
    }

    
    const settings = {
        url: GEN_POSTS,
        data: JSON.stringify(newData),
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST',
        success: function(){
            alert('success');
        },
          error: function(){
            alert('failure');
        }
    };
    $.ajax(settings);
    console.log(event, data)
}
 
function getPostData(callback) {
    console.log("=======")
    const settings = {
        url: GEN_POSTS,
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: callback
    };
    $.ajax(settings);

}

function renderApiResults(clientPost) {
 
   
   return `
    <div class="post-container">
        <a class="user-uuid-file"><img src=${clientPost.uuidFile} + '.jpeg'></a>
        <h1>
            <div class="title">${clientPost.pictureTitle}</div>
        </h1>    
        <h2>
            <div class="un">${clientPost.userName}</div>
            <div class="bio">${clientPost.pictureBio}</div>
        </h2>
    </div>
    <div class="aside-container">
        <h4>Camera settings used:</h4>
            <ul>
                <li>
                    <div class="settings-box">
                        <p>
                            Aperature settiing: <span class="app-set">${clientPost.cameraSettings.fStop}</span>
                        </p>
                    </div>
                </li>

                <li>
                    <div class="settings-box">
                        <p>
                            Shutter settiing: <span class="shut-set">${clientPost.cameraSettings.shutterSpeed}</span>
                        </p>
                    </div>
                </li>
                    
                <li>
                    <div class="settings-box">
                        <p>
                            ISO settiing: <span class="iso-set">${clientPost.cameraSettings.iso}</span>
                        </p>
                    </div>
                </li>

                <li>
                    <div class="settings-box">
                        <p>
                            White balance setting: <span class="wb-set">${clientPost.cameraSettings.whiteBalance}</span>
                        </p>
                    </div>
                </li>
            </ul>
    </div>
    `
}

function displayApiResults(data) {
    console.log(data)
    const apiResults = data.posts.map((item, index) => renderApiResults(item));
    $(".api-result").html(apiResults);
}

//------------------put and delete ajax calls-----------------

function handleUpdate(event, data) {
    event.stopPropagation(); 
    event.preventDefault();
    let $updateTitle = $("input[name=update-title]");
    let $updateBio = $("input[name=update-bio]");
    const updatedData = {
        updatetitle: $updateTitle.val(),
        updateBio: $updateBio.val()
    }
    const settings = {
        url: GEN_POSTS,
        // data: JSON.stringify(newData),
        dataType: 'json',
        contentType: 'application/json',
        type: 'put',
        success: function(){
            alert('success');
        },
        error: function(){
            alert('failure');
        }
    };
    $.ajax(settings);

}




//--------------App.js----------

//-------------BUTTON HANDLERS-----------
function renderHomePage() {
    $(".home-page").show()
    $(".my-places").hide()
    $(".post-gen").hide()
    $(".explore").hide()
    $(".post-update").hide()
    $(".my-places-button").click()
    $(".explore-button").click(renderExplore)
    $(".make-post-button").click(renderPostGen)
    $("update-button").click(renderUpdateForm)
}

function renderPostGen() {
    console.log("boiiii");
    $(".post-gen").show();
    $(".home-page").hide();
    $(".my-places").hide();
    $(".explore").hide();
    $('input[type=file]').on('change', prepareUpload);
    $(".file-upload").submit(uploadCompletePost);
    // when form gets submitted, find file to upload, send image to /fileupload, /fileupload should
    // save image with unique id, server will send file with UH back to cs Js and then send whole
    // prodeuct back to server to save.
}


function renderExplore() {
    console.log("girlllll")
    $(".post-gen").hide();
    $(".home-page").hide();
    $(".my-places").hide();
    $(".explore").show();
    getPostData(displayApiResults);
}

function renderUpdateForm() {
    $(".post-gen").hide();
    $(".home-page").hide();
    $(".my-places").hide();
    $(".explore").hide();
    $(".post-update").show();

}

renderHomePage();