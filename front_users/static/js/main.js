var main = function(){
	UserView.showCurrentUser();

	//form login
	form_login = $("#form_login");
	form_login.submit(function (e) {
		e.preventDefault();
		login(form_login, URL_LOGIN);
	})

	//action event to logout

	$("#button_logout").click(function(e){
		e.preventDefault();
		UserService.deauthenticate(URL_LOGOUT);
		UserView.showCurrentUser();
	});
	$("#loader").hide();

};

	
$(document).ready(main);
