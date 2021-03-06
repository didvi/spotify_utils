var redirect_uri = "https://open.spotify.com/collection/playlists" 
var baseURL = "https://api.spotify.com/v1"

// lock = divi
var scopes = 'playlist-read-private playlist-read-collaborative playlist-modify-public';


export var access_request_url = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri)

export function get_access_token_from_url() {
    // Must be called after user is redirected to access_request_url
    // Could put logic in here to redirect

    var hash = window.location.hash;
    var hash = window.location.hash.substr(1);

    var result = hash.split('&').reduce((result, item) => {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {});
    return result['access_token']
}

export function get(url, access_token) {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
        'Authorization': 'Bearer ' + access_token, 
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

export function post(url, body, access_token) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
        'Authorization': 'Bearer ' + access_token, 
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

export function makePlaylist(name, user_id, access_token) {
    body = { "name": name }
    post("https://api.spotify.com/v1/users/" + user_id + "/playlists", body, access_token)
    // add verification here
}

export function getUserPlaylists(user_id, public, access_token) {
    data = get(baseURL + "/users/" + user_id + "/playlists");
    console.log(data);
}

export function getPlaylistList(user_id, public, access_token) {

}

export function getTracksFromPlaylist(track_url, access_token) {
    // TODO
    tracks = get(track_url, access_token)
    return tracks['items']
}

export function getAllSongsForUser(user_id, public, access_token) {
    // should be set
    var tracks = []

    var playlist_list_data = getPlaylistList(user_id, public, access_token)
    playlist_list_data = playlist_list_data['items'];
    for (let i = 0; i < length(playlist_list_data); i++) {
        playlist = playlist_list_data[i]
        track_url = playlist['tracks']['href']
        tracks += getTracksFromPlaylist(track_url, access_token)
    }
}