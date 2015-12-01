var DEBUG = true;

var http = location.protocol;
var slashes = http.concat("//");
if (DEBUG) {
	var host = slashes.concat(window.location.hostname) + ':8080/';
}
else
{
	var host = slashes.concat('192.168.14.231') + ':8002/';
}
//var host = slashes.concat('api.g4.local') + ':8080/';

console.info('api', host)

//
CLIENT_ID = 'W768A6yDuxGU8nEQ3iXOvghKxFfUGOWbHPWGHXQw';
CLIENT_SECRET = 'LHrwNGN13ISnvXpQAn4YW5K5eWqzasICAwsGExdT5rmFTuAAsdpC0sH2JUbuAV3Am5U8zBHWRRYDyY1Vi4yQfILTugxCdrbitubEkyVuPU0bYNbknN8WUETNqkeaCixi';

//authentcation
URL_LOGIN = host+"API/auth/token/";
URL_LOGOUT = host+"API/auth/revoke_token/";

//user
URL_REGISTER = host+"API/users/new";
URL_CURRENT_USER = host+"API/users/me";
URL_UPDATE_USER = host+"API/users/";
URL_UPDATE_USER_PASSWORD = host+"API/users/authenticate/";
URL_BRING_ALL_USERS = host+"API/users/all";
URL_DETAIL_USERS = host+"API/users/detail/";
URL_RECOVERY_PASSWORD = host+"API/users/password/reset/";
URL_RECOVERY_PASSWORD_CONFIRM = host+"API/users/password/reset/%uidb%/%token%";

URL_STREAM_USER = host + 'API/users/wall/%id%';

//Degree == Plan
URL_GET_DEGREE = host+"API/degree/all";

//Material
URL_LIST_MATERIAL = host + "API/material/all";
URL_CREATE_MATERIAL = host + "API/material/f/new";
URL_CREATE_MATERIAL_LINK = host + "API/material/l/new";
URL_GET_MATERIAL = host + 'API/material/';

//Foro
URL_CREATE_ASK_FORO = host+"API/forum/ask/";
URL_LIST_ASKS_FORO = host+"API/forum/ask/all";
URL_DETAIL_ASKS_FORO = host+"API/forum/ask/detail/";

URL_CREATE_ANSWER_FORO = host+"API/forum/answer/";
URL_GET_ANSWERS_FORUM = host+"API/forum/answer/all/";


//Wiki
URL_CREATE_PAGE_WIKI = host+"API/wiki/new";
URL_UPDATE_PAGE_WIKI = host+"API/wiki/%slug%/edit";
URL_GET_ALL_PAGES = host+"API/wiki/v0/all";
URL_GET_LIST_APPROVED_PAGES = host+"API/wiki/published";
URL_DETAIL_ONE_PAGE = host+"API/wiki/";
URL_VERSION_PAGE = host+"API/wiki/%slug%/version/%version%/";

URL_GET_ALL_WIKI_REQUEST = host+"API/wiki/request/all";
URL_APPROVE_REQUEST = host+"API/wiki/request/approve/%slug%..%version%";

URL_GET_ALL_WIKI_HISTORY = host+'API/wiki/history/all';


//Comments
URL_CREATE_COMMENT = host+'API/comment/';
URL_GET_COMMENTS = host+'API/comment/all/%thread%';


//Evaluations 

// question of evaluations 
URL_CREATE_QUESTION_TF = host+'API/quiz/questions/createTrueFalse';
URL_GET_ALL_QUESTION_TF = host+'API/quiz/questions/listTrueFalse';
URL_UPDATE_QUESTION_TF = host+'API/quiz/questions/updateTrueFalse/'; // se le pega el id de la pregunta 

URL_CREATE_QUESTION_ESSAY = host+'API/quiz/questions/createEssay';
URL_GET_ALL_QUESTION_ESSAY = host+'API/quiz/questions/listEssay';
URL_UPDATE_QUESTION_ESSAY = host+'API/quiz/questions/updateEssay/'; // se le pega el id de la pregunta 

URL_CREATE_QUESTION_MC = host+'API/quiz/questions/createMultichoice';
URL_GET_ALL_QUESTION_MC = host+'API/quiz/questions/listMultichoice';
URL_UPDATE_QUESTION_MC = host+'API/quiz/questions/updateMultichoice/'; // se le pega el id de la pregunta 

URL_CREATE_ANSWER_MC = host+'API/quiz/questions/createAnswerMultichoice';
URL_CREATE_MULTIPLE_ANSWER_MC = host+'API/quiz/questions/createMultipleAnswerMultichoice';
URL_UPDATE_MULTIPLE_ANSWER_MC = host+'API/quiz/questions/updateMultipleAnswerMultichoice';
URL_GET_ALL_ANSWER_MC = host+'API/quiz/questions/MultichoiceAnswerList/'; // se le pega el id de la MC del q se quiere buscar las respuestas

URL_DETAIL_QUESTION = host+'API/quiz/questions/detail/';// se le pega el id de la question

// category of the evaluations 
URL_CREATE_CATEGORY = host+'API/quiz/category/createCategory';
URL_GET_ALL_CATEGORY = host+'API/quiz/category/listCategory';
URL_UPDATE_CATEGORY = host+'API/quiz/category/updateCategory/'; // se le pega el id de la Categoria 

URL_CREATE_SUBCATEGORY = host+'API/quiz/category/createSubcategory';
URL_GET_ALL_SUBCATEGORY = host+'API/quiz/category/listSubcategory';
URL_UPDATE_SUBCATEGORY = host+'API/quiz/category/updateSubCategory/'; // se le pega el id de la Categoria 

// Quiz
URL_CREATE_QUIZ = host+'API/quiz/createQuiz';
URL_GET_ALL_QUIZ = host+'API/quiz/listQuiz';
URL_GET_QUIZ_BY_CATEGORY = host+'API/quiz/listQuizbyCategory/'; // se le pega el nombre de la categoria al final
URL_DETAIL_QUIZ = host+'API/quiz/%slug%/detail/'; // se le pega el id del quiz al final 


URL_QUALIFY_QUIZ = host+'API/quiz/qualify';
URL_CHANGE_QUALIFY_QUIZ = host+'API/quiz/%slug%/changeQualify'; 
URL_CHECK_PASSED_QUIZ = host+'API/quiz/checkPassed';


URL_CREATE_SITTING = host+'API/quiz/sitting/'; // se le pega el id del quiz al final 
URL_UPDATE_SITTING = host+'API/quiz/%slug%/updateSitting/'; // se le pega el id del sitting al final 
URL_ALL_SITTING = host+'API/quiz/allSitting';
URL_MARKING_QUIZ = host+'API/quiz/marking';
URL_MARKING_DETAIL_QUIZ = host+'API/quiz/marking/detail/'; // se le pega el id del sitting al final 

URL_PROGRESS_QUIZ = host+'API/quiz/progress';
URL_PROGRESS_EXAMS_QUIZ = host+'API/quiz/progress/exams/'; // se le pega el id del usuario al final 


//Activitie

URL_CREATE_ACTIVITIE_PARENT = host+'API/activitie/parent/%slug%/new'
URL_CREATE_ACTIVITIE_PARENT2 = host+'API/activitie/parent/new'
URL_ALL_ACTIVITIE_PARENT = host+'API/activitie/parent/all'
URL_RETREIVE_ACTIVITIE_PARENT = host+'API/activitie/parent/'

URL_CREATE_ACTIVITIE_CHILD = host+'API/activitie/'

URL_ALL_ACTIVITIE_CHILD = host+'API/activitie/all/%id%'
URL_CHECK_ACTIVITIE_CHILD = host+'API/activitie/%slug%/check/%id%'


//Notification

URL_ALL_NOTIFICATION = host+'API/inbox/notifications/all';
URL_UNREAD_NOTIFICATION = host+'API/inbox/notifications/unread';

URL_MARK_ALL_READ_NOTIFICATION = host+'API/inbox/notifications/mark-all-as-read';

URL_MARK_AS_UNREAD_NOTIFICATION = host+'API/inbox/notifications/mark-as-unread/%id%/';
URL_MARK_AS_READ_NOTIFICATION = host+'API/inbox/notifications/mark-as-read/%id%/';

URL_DELETE_NOTIFICATION = host+'API/inbox/notifications/delete/%id%/';


// Gamificaion
URL_ALL_BADGE = host+'API/gamification/badge/all'


URL_GET_AWARDS_USER = host+'API/gamification/award/all/' // trae las medallas del usuario para el perfil si se le pega el id, si no trae todos los awards

URL_GET_PROGRESS_GAMIFICATION = host+'API/gamification/badge/progress/detail/'// se le pega el id del usuario por el q se pide el progreso

URL_SCORES = host + 'API/gamification/scores/'
URL_SCORES_ALL = host + 'API/gamification/scores/all'

//Votes 
URL_GIVE_VOTE = host + 'API/gamification/vote';
URL_LIST_VOTE = host + 'API/gamification/vote/detail/%id%';

//Modules
URL_ALL_MODULES = host + 'API/module/all';
URL_CREATE_MODULE = host + 'API/module/new';
URL_UPDATE_MODULE = host + 'API/module/new/%slug%';
URL_RETRIEVE_MODULE = host + 'API/module/detail/%slug%';
//forum
URL_CREATE_ASK_FORO_MODULE = host+"API/module/%slug%/forum/new";
URL_ALL_ASK_MODULE = host + 'API/module/%slug%/forum/all';
//wiki
URL_CREATE_PAGE_WIKI_MODULE = host + 'API/module/%slug%/wiki/new';
URL_REQUEST_PAGE_WIKI_MODULE = host + 'API/module/%slug%/wiki/requests';
URL_HISTORY_PAGE_WIKI_MODULE = host + 'API/module/%slug%/wiki/history';
URL_PUBLISHED_PAGE_WIKI_MODULE = host + 'API/module/%slug%/wiki/published';
//Activitie
URL_CREATE_ACTIVITIE_MODULE = host + 'API/module/%slug%/activitie/new';
URL_ALL_ACTIVITIE_MODULE = host + 'API/module/%slug%/activitie/all';
//Evaluations
URL_CREATE_QUIZ_MODULE = host + 'API/module/%slug%/quiz/new';
URL_ALL_QUIZ_MODULE = host + 'API/module/%slug%/quiz/all';
URL_MARKING_QUIZ_MODULE = host + 'API/module/%slug%/quiz/marking';
//Material
URL_LIST_MATERIAL_MODULE = host + "API/module/%slug%/material/all";
URL_CREATE_MATERIAL_MODULE = host + "API/module/%slug%/material/new";
