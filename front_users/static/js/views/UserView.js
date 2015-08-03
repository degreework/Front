var UserView = {};

UserView.initializeRegister = function(div_register)
{
	UserView.form_register = div_register.find("form");
}

UserView.verify = function ()
{
	UserView.form_login = $('#form_login')
	/*
	* THIS FUNCTION MUST BE CALLED IN EVERY PAGE
	* This function show login form when user is not authenticated
	* and show user info when is logged
	*
	*/

	if (UserService.isAutenticated())
	{
		UserView.showLoggedUser();		
	}
	else
	{
		UserView.showLoginForm();
	}
}


UserView.showIndexUser = function ()
{
	//si el usuario esta autenticado
	if (UserService.isAutenticated())
	{
		$("#introduction").hide();
		$('#form_login').hide();
		$('#register').hide();
		$('#resume-profile').show();
		$('.icon-menu').show();
		$('.consult-user').show();
		$('.menu').show();
		$(".pic_profile").attr("src",'http://127.0.0.1:8080'+JSON.parse($.session.get('user')).thumb[1]);

		UserView.showLoggedUser();
	}
	else
	{
		UserView.showRegisterForm();
	}
}

UserView.showLoggedUser = function () {
	$("#user_resume").show();
	$(".resume_name").text(JSON.parse($.session.get('user')).first_name +" "+JSON.parse($.session.get('user')).last_name);	
	$(".resume_profile").text(JSON.parse($.session.get('user')).first_name +" "+JSON.parse($.session.get('user')).last_name);	
	$(".pic_resume").attr("src",'http://127.0.0.1:8080'+JSON.parse($.session.get('user')).thumb[0]);

	//action event to logout
	$("#button_logout").click(function(e){
		e.preventDefault();
		UserService.deauthenticate(URL_LOGOUT);
		UserView.showCurrentUser();
	});
}

UserView.showLoginForm = function()
{
	/*
	* Reset and show login Form
	*/
	UserView.form_login.trigger("reset");
	
	$('#form_login').show();

	//form login
	UserView.form_login.submit(function (e) {
		e.preventDefault();
		Login.login(UserView.form_login, URL_LOGIN, UserView.loginCallback);
	})
}

UserView.showRegisterForm = function()
{
	/*
	*Load, render and show Register user Form
	*/
	create_form(URL_REGISTER, UserView.form_register, 'OPTIONS');
		
	UserView.form_register.submit(function (e) {
		e.preventDefault();
		register(UserView.form_register, URL_REGISTER);
	})
	$("#register").show();
}

UserView.loginCallback = function ()
{
	UserService.get_mini_user(URL_CURRENT_USER);
	UserView.showIndexUser();
}


UserView.showSetting = function (url)
{
	
	console.log("Info load")
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
	    	}
	})
	.done(function(response){
		//fill the information of user in the input 
		$.each(response, function(key, value) {	
			//$('#id_'+key).attr('placeholder', $('#id_'+key).attr('placeholder') +': '+value);
			$('#id_'+key).attr('value', value);

			if(key === 'plan'){
				$('#id_'+key).val(value); 			
			}
		});
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 === error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status || 401 == error.status)
		{

		}
		// if UNAUTHORIZED ->
		else if(401 == error.status)
		{
		
		}
		//if INTERNAL SERVER ERROR
		else if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		console.log("always");
	});
}
