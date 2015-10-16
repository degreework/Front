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
URL_RECOVERY_PASSWORD = host+":8080/API/users/password/reset/";
URL_RECOVERY_PASSWORD_CONFIRM = host+":8080/API/users/password/reset/%uidb%/%token%";

//Degree == Plan
URL_GET_DEGREE = host+":8080/API/degree/all";

//Foro
URL_CREATE_ASK_FORO = host+":8080/API/forum/ask/";
URL_LIST_ASKS_FORO = host+":8080/API/forum/ask/all";
URL_DETAIL_ASKS_FORO = host+":8080/API/forum/ask/detail/";

URL_CREATE_ANSWER_FORO = host+":8080/API/forum/answer/";
URL_GET_ANSWERS_FORUM = host+":8080/API/forum/answer/all/";


//Wiki
URL_CREATE_PAGE_WIKI = host+":8080/API/wiki/new";
URL_UPDATE_PAGE_WIKI = host+":8080/API/wiki/%slug%/edit";
URL_GET_ALL_PAGES = host+":8080/API/wiki/v0/all";
URL_GET_LIST_APPROVED_PAGES = host+":8080/API/wiki/published";
URL_DETAIL_ONE_PAGE = host+":8080/API/wiki/";
URL_VERSION_PAGE = host+":8080/API/wiki/%slug%/version/%version%/";

URL_GET_ALL_WIKI_REQUEST = host+":8080/API/wiki/request/all";
URL_APPROVE_REQUEST = host+":8080/API/wiki/request/approve/%slug%..%version%";

URL_GET_ALL_WIKI_HISTORY = host+':8080/API/wiki/history/all';


//Comments
URL_CREATE_COMMENT = host+':8080/API/comment/';
URL_GET_COMMENTS = host+':8080/API/comment/all/%thread%';


//Evaluations 

// question of evaluations 
URL_CREATE_QUESTION_TF = host+':8080/API/quiz/questions/createTrueFalse';
URL_GET_ALL_QUESTION_TF = host+':8080/API/quiz/questions/listTrueFalse';
URL_UPDATE_QUESTION_TF = host+':8080/API/quiz/questions/updateTrueFalse/'; // se le pega el id de la pregunta 

URL_CREATE_QUESTION_ESSAY = host+':8080/API/quiz/questions/createEssay';
URL_GET_ALL_QUESTION_ESSAY = host+':8080/API/quiz/questions/listEssay';
URL_UPDATE_QUESTION_ESSAY = host+':8080/API/quiz/questions/updateEssay/'; // se le pega el id de la pregunta 

URL_CREATE_QUESTION_MC = host+':8080/API/quiz/questions/createMultichoice';
URL_GET_ALL_QUESTION_MC = host+':8080/API/quiz/questions/listMultichoice';
URL_UPDATE_QUESTION_MC = host+':8080/API/quiz/questions/updateMultichoice/'; // se le pega el id de la pregunta 

URL_CREATE_ANSWER_MC = host+':8080/API/quiz/questions/createAnswerMultichoice';
URL_CREATE_MULTIPLE_ANSWER_MC = host+':8080/API/quiz/questions/createMultipleAnswerMultichoice';
URL_UPDATE_MULTIPLE_ANSWER_MC = host+':8080/API/quiz/questions/updateMultipleAnswerMultichoice';
URL_GET_ALL_ANSWER_MC = host+':8080/API/quiz/questions/MultichoiceAnswerList/'; // se le pega el id de la MC del q se quiere buscar las respuestas

URL_DETAIL_QUESTION = host+':8080/API/quiz/questions/detail/';// se le pega el id de la question

// category of the evaluations 
URL_CREATE_CATEGORY = host+':8080/API/quiz/category/createCategory';
URL_GET_ALL_CATEGORY = host+':8080/API/quiz/category/listCategory';
URL_UPDATE_CATEGORY = host+':8080/API/quiz/category/updateCategory/'; // se le pega el id de la Categoria 

URL_CREATE_SUBCATEGORY = host+':8080/API/quiz/category/createSubcategory';
URL_GET_ALL_SUBCATEGORY = host+':8080/API/quiz/category/listSubcategory';
URL_UPDATE_SUBCATEGORY = host+':8080/API/quiz/category/updateSubCategory/'; // se le pega el id de la Categoria 

// Quiz
URL_CREATE_QUIZ = host+':8080/API/quiz/%slug%/createQuiz';
URL_GET_ALL_QUIZ = host+':8080/API/quiz/listQuiz';
URL_GET_QUIZ_BY_CATEGORY = host+':8080/API/quiz/listQuizbyCategory/'; // se le pega el nombre de la categoria al final
URL_DETAIL_QUIZ = host+':8080/API/quiz/detail/'; // se le pega el id del quiz al final 


URL_QUALIFY_QUIZ = host+':8080/API/quiz/qualify';
URL_CHANGE_QUALIFY_QUIZ = host+':8080/API/quiz/changeQualify'; 
URL_CHECK_PASSED_QUIZ = host+':8080/API/quiz/checkPassed';


URL_CREATE_SITTING = host+':8080/API/quiz/sitting/'; // se le pega el id del quiz al final 
URL_UPDATE_SITTING = host+':8080/API/quiz/%slug%/updateSitting/'; // se le pega el id del sitting al final 
URL_ALL_SITTING = host+':8080/API/quiz/allSitting';
URL_MARKING_QUIZ = host+':8080/API/quiz/marking';
URL_MARKING_DETAIL_QUIZ = host+':8080/API/quiz/marking/detail/'; // se le pega el id del sitting al final 

URL_PROGRESS_QUIZ = host+':8080/API/quiz/progress';
URL_PROGRESS_EXAMS_QUIZ = host+':8080/API/quiz/progress/exams/'; // se le pega el id del usuario al final 


//Activitie

URL_CREATE_ACTIVITIE_PARENT = host+':8080/API/activitie/%slug%/parent/new'
URL_ALL_ACTIVITIE_PARENT = host+':8080/API/activitie/parent/all'
URL_RETREIVE_ACTIVITIE_PARENT = host+':8080/API/activitie/parent/'

URL_CREATE_ACTIVITIE_CHILD = host+':8080/API/activitie/'

URL_ALL_ACTIVITIE_CHILD = host+':8080/API/activitie/all/%id%'
URL_CHECK_ACTIVITIE_CHILD = host+':8080/API/activitie/%slug%/check/%id%'


//Notification

URL_ALL_NOTIFICATION = host+':8080/API/inbox/notifications/all';
URL_UNREAD_NOTIFICATION = host+':8080/API/inbox/notifications/unread';

URL_MARK_ALL_READ_NOTIFICATION = host+':8080/API/inbox/notifications/mark-all-as-read';

URL_MARK_AS_UNREAD_NOTIFICATION = host+':8080/API/inbox/notifications/mark-as-unread/%id%/';
URL_MARK_AS_READ_NOTIFICATION = host+':8080/API/inbox/notifications/mark-as-read/%id%/';

URL_DELETE_NOTIFICATION = host+':8080/API/inbox/notifications/delete/%id%/';


// Gamificaion

URL_CREATE_BADGE = host+':8080/API/gamification/badge'
URL_ALL_BADGE = host+':8080/API/gamification/badge/all'


URL_GET_AWARDS_USER = host+':8080/API/gamification/award/all/'
URL_GET_PROGRESS_GAMIFICATION = host+':8080/API/gamification/badge/progress/detail/'

URL_SCORES = host + ':8080/API/gamification/scores/'

//Votes 
URL_GIVE_VOTE = host + ':8080/API/gamification/vote';
URL_LIST_VOTE = host + ':8080/API/gamification/vote/detail/%id%';

//Modules
URL_ALL_MODULES = host + ':8080/API/module/all';
URL_CREATE_MODULE = host + ':8080/API/module/new';
URL_UPDATE_MODULE = host + ':8080/API/module/new/%slug%';
URL_RETRIEVE_MODULE = host + ':8080/API/module/detail/%slug%';
//forum
URL_CREATE_ASK_FORO_MODULE = host+":8080/API/module/%slug%/forum/new";
URL_ALL_ASK_MODULE = host + ':8080/API/module/%slug%/forum/all';
//wiki
URL_CREATE_PAGE_WIKI_MODULE = host + ':8080/API/module/%slug%/wiki/new';
URL_REQUEST_PAGE_WIKI_MODULE = host + ':8080/API/module/%slug%/wiki/requests';
URL_HISTORY_PAGE_WIKI_MODULE = host + ':8080/API/module/%slug%/wiki/history';
URL_PUBLISHED_PAGE_WIKI_MODULE = host + ':8080/API/module/%slug%/wiki/published';
//Activitie
URL_CREATE_ACTIVITIE_MODULE = host + ':8080/API/module/%slug%/activitie/new';
URL_ALL_ACTIVITIE_MODULE = host + ':8080/API/module/%slug%/activitie/all';