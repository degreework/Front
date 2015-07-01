var main = function(){
	UserView.showCurrentUser();


	//form register
	form_register = $("#form_register");
	create_form(URL_REGISTER, form_register, 'OPTIONS');
	form_register.submit(function (e) {
		e.preventDefault();
		register(form_register, URL_REGISTER);
	})

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
