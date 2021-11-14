// fetch the wallstreet bets api
var token
var userName = "upojT-rxULWxHaohV2favg"; // app client ID
var password = "MUqZZ5kKtbug12ThYb5lUqZmFeg4YA"; // app clientSecret
var tokenUrl = "https://www.reddit.com/api/v1/access_token"; // application token endpoint
let tokenReq = new XMLHttpRequest();

function getToken(url, clientID, secret) {
    var key;
    tokenReq.open("POST", url, true)
    tokenReq.setRequestHeader("Authorization", "Basic " + btoa(clientID + ":" + secret));
    tokenReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    tokenReq.send("grant_type=client_credentials&client_id="+clientID+"&"+"client_secret="+secret);
    tokenReq.addEventListener ("load", function() {
        if (tokenReq.status >= 200 && tokenReq.status < 400) {
            let response = JSON.parse(tokenReq.responseText);
            console.log(response);
            let obj = response;
            key = obj.access_token;
            token = key;
            console.log(token);
            redditRetrieve(token);
        }

        else {
            console.log("Network Error");
        }
    });
}

let redditRetrieve = function(token) {
    if (token) {
        let url = 'https://oauth.reddit.com/r/wallstreetbets/comments/qskqik';
        let data ={
            name: userName,
            id: password
        };
        let otherPram={
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                'Authorization': 'bearer ' + token,
                'User-Agent': 'rwar'
            },
        };
        fetch(url, otherPram)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function(data)
                    {
                        console.log(data);
                        sortData(data);
                    })
                }
            })
    }
}

let sortData = function(data) {

    let commentData = [];
    let hotArr = [];
    let newArr = hotArr.push(data[1].data.children);

    let wsbComments = hotArr[0];
    console.log(wsbComments);
    
    for (let i = 0; i < wsbComments.length; i++) {
            commentData.push(wsbComments[i++].data.body);
            
    }
    console.log(commentData)
    return commentData;
}

getToken(tokenUrl, userName, password);