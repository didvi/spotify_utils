var redirect_uri = "https://open.spotify.com/collection/playlists" 
var scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-public';


export var access_request_url = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri)

export function get_access_token_from_url() {
    var hash = window.location.hash;
    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce((result, item) => {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
    return result['access_token']
}

export function get(url, accessToken) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + accessToken, 
        //   not sure if this needs to be here
        'Content-Type': 'application/json'
        },
    });

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        return await response.json();
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

export function post(url, body, accessToken) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
        'Authorization': 'Bearer ' + accessToken, 
        'Content-Type': 'application/json;charset=utf-8'
        },
        body: body,
    });

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        return await response.json();
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

export function makePlaylist(name, user_id, accessToken) {
    body = { "name": name }
    post("https://api.spotify.com/v1/users/" + user_id + "/playlists", body, accessToken)
    // add verification here
}