var http = location.protocol;
var slashes = http.concat("//");
var host = slashes.concat(window.location.hostname);
//
CLIENT_ID = 'W768A6yDuxGU8nEQ3iXOvghKxFfUGOWbHPWGHXQw';
CLIENT_SECRET = 'LHrwNGN13ISnvXpQAn4YW5K5eWqzasICAwsGExdT5rmFTuAAsdpC0sH2JUbuAV3Am5U8zBHWRRYDyY1Vi4yQfILTugxCdrbitubEkyVuPU0bYNbknN8WUETNqkeaCixi';

//authentcation
URL_LOGIN = host+":8080/API/auth/token/";
URL_LOGOUT = host+":8080/API/auth/revoke_token/";

//user
URL_REGISTER = host+":8080/API/users/";
URL_CURRENT_USER = host+":8080/API/users/me";
URL_UPDATE_USER = host+":8080/API/users/";
URL_UPDATE_USER_PASSWORD = host+":8080/API/users/password/";