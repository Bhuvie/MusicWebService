// Put your Last.fm API key here
var api_key = "f89aa69e46ce6a5fd7d40e725269edea";
var responseJson; 
//Bhuvanesh

function sendRequest () {

    getBasicInfo();
    getTopAlbums();
    getSimilarArtists();
    
}
function getBasicInfo()
{
    var image,artistbio;
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            responseJson= JSON.parse(this.responseText);
            image=responseJson.artist.image[2]["#text"];
            artistbio=responseJson.artist.bio.content;
            document.getElementById("output1").innerHTML = "<pre><p> <span style='font-weight:bold'>Name</span> " + responseJson.artist.name +"</p><p> <span style='font-weight:bold'>Last.fm Link:</span>  <a href='"+ responseJson.artist.url+"'>"+responseJson.artist.url+"</a></p><img src='"+image+"'/><br/><span style='font-weight:bold'>Artist's Biography:</span><br/><p style='white-space:pre-wrap'> "+responseJson.artist.bio.content+"</p></pre>";
        }
    };
    xhr.send(null);    
}

function getTopAlbums(){
    var xhr = new XMLHttpRequest();
    var method = "artist.getTopAlbums";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            responseJson= JSON.parse(this.responseText);
            var p="";
            for(var i=0;i<responseJson.topalbums.album.length;i++)
            {
            var image = responseJson.topalbums.album[i].image[2]["#text"];
            p =p+ "<div> <span style='font-weight:bold'>Album Title: </span> "+ responseJson.topalbums.album[i].name + "</div><div><img src='"+image+"'/></div>";
            }
            document.getElementById("output2").innerHTML ="<pre><span style='font-weight:bold'>Top Albums:</span><br/>" + p + "</pre>";
        }
    };
    xhr.send(null);
}

function getSimilarArtists()
{
    var xhr = new XMLHttpRequest();
    var method = "artist.getSimilar";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            responseJson= JSON.parse(this.responseText);
            var p="";
            for(var i=0;i<responseJson.similarartists.artist.length;i++)
            {
            p =p+ "<div> <span style='font-weight:bold'>Artist's Name:</span> "+ responseJson.similarartists.artist[i].name + "</div>";
            }
            document.getElementById("output3").innerHTML ="<pre><span style='font-weight:bold'>Similar Artists:</span> <br/>" + p + "</pre>";
            
        }
    };
    xhr.send(null);
}

//References
// https://www.mkyong.com/javascript/how-to-access-json-object-in-javascript/
// https://stackoverflow.com/questions/800593/loop-through-json-object-list
// https://stackoverflow.com/questions/3038901/how-to-get-the-response-of-xmlhttprequest


