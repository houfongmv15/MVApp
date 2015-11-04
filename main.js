// URL Shortener
$(document).ready(function() {
    // get Bitly Shorten URL from Bitly API/
    function getShortURL(longURL) {
        var longURL = longURL;
        var accessToken = "a4d53111e337df43ada0ef3a4258099ae2144184";
        $.ajax({
            type: "POST",
            url: "https://api-ssl.bitly.com/v3/shorten",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            data: {
                longUrl: longURL, 
              access_token:accessToken 
            },
            success: function(data) {
                console.log(data);
                var shortenURL = data.data.url;
                var qrCodeURL =
                    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=jpg&data=" +
                    shortenURL;
                $("#systemMsg").html(
                    '<div class="alert alert-success" role="alert"><strong>Done</strong><br/><a id="shortURLResult" href="' +
                    shortenURL +
                    '" target="_blank">' +
                    shortenURL +
                    '</a><p> <img src=' + qrCodeURL +
                    ' class="img-thumbnail" alt="QR Code for ' +
                    shortenURL + '"></div>');
                $("#result").val(shortenURL);
            }
        });
    }

    function submitLongURL() {
            var url = $("#url").val();
            var urlRegex =
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
            var urltest = urlRegex.test(url);
            if (urltest) {
                getShortURL(url);
            } else {
                //alert("Bad URL");
                $("#systemMsg").html(
                    '<div class="alert alert-danger" role="alert"><strong>ERROR</strong> Kindly Insert Valid Long URL (With http://  or https:// ) </div>'
                );
            }
        }
        // When Submit button is clicked
    $("#submitBtn").click(function(e) {
        e.preventDefault();
        submitLongURL();
    });
});
