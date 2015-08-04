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
URL_REGISTER = host+":8080/API/users/new";
URL_CURRENT_USER = host+":8080/API/users/me";
URL_UPDATE_USER = host+":8080/API/users/";
URL_UPDATE_USER_PASSWORD = host+":8080/API/users/authenticate/";
URL_BRING_ALL_USERS = host+":8080/API/users/all";
URL_DETAIL_USERS = host+":8080/API/users/detail/";
URL_RECOVERY_PASSWORD = host+":8080/API/users/recovery";

//Degree == Plan
URL_GET_DEGREE = host+":8080/API/degree/all";

//Foro
URL_CREATE_ASK_FORO = host+":8080/API/forum/ask/";
URL_BRING_ASKS_FORO = host+":8080/API/forum/ask/all";
URL_DETAIL_ASKS_FORO = host+":8080/API/forum/ask/detail/";

URL_CREATE_ANSWER_FORO = host+":8080/API/forum/answer/";
URL_GET_ANSWERS_FORUM = host+":8080/API/forum/answer/all";


//Wiki
URL_CREATE_PAGE_WIKI = host+":8080/API/wiki/new";
URL_UPDATE_PAGE_WIKI = host+":8080/API/wiki/v0/%slug%/edit";
URL_GET_ALL_PAGES = host+":8080/API/wiki/v0/all";
URL_GET_LIST_APPROVED_PAGES = host+":8080/API/wiki/published";
URL_DETAIL_ONE_PAGE = host+":8080/API/wiki/";
URL_VERSION_PAGE = host+":8080/API/wiki/%slug%/version/%version%/";

URL_GET_ALL_WIKI_REQUEST = host+":8080/API/wiki/request/all";
URL_APPROVE_REQUEST = host+":8080/API/wiki/request/approve/%slug%..%version%";

URL_GET_WIKI_HISTORY = host+':8080/API/wiki/history/';


//Comments
URL_CREATE_COMMENT = host+':8080/API/comment/';
URL_GET_COMMENTS = host+':8080/API/comment/all/%thread%';

