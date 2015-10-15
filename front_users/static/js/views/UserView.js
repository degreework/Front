var UserView = {};



UserView.initializeRegister = function(div_register)
{
	UserView.form_register = div_register.find("form");
}

UserView.getUrl = function (id) {
	return host+":"+location.port+'/users/detail/'+id;
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
		user = JSON.parse(localStorage.getItem('user'))
		console.log(user)
		chatSocked.emmit('listChatUpdate',user);
		UserView.showLoggedUser();		
	}
	else
	{
		UserView.showLoginForm();
	}
}


UserView.showIndexUser = function ()
{
	console.log("UserView.showIndexUser")
	//si el usuario esta autenticado
	if (UserService.isAutenticated())
	{
		$("#introduction").hide();
		$('#form_login').hide();
		$('#register').hide();
		$('#index').show();
		$('#resume-profile').show();
		$('.icon-menu').show();
		$('.consult-user').show();
		$('.menu').show();
		$(".pic_profile").attr("src",'http://127.0.0.1:8080'+User.get_thumb(0));

		UserView.showLoggedUser();
	}
	else
	{
		UserView.showRegisterForm();
	}
}

UserView.showLoggedUser = function () {

	$("#user_resume").show();
	$(".resume_name").text(User.get_first_name() +" "+User.get_last_name() );
	$(".resume_profile").text(User.get_first_name() +" "+User.get_last_name() );	
	$(".pic_resume").attr("src",'http://127.0.0.1:8080'+User.get_thumb(0));

	//action event to logout
	$("#button_logout").click(function(e){
		e.preventDefault();
		UserService.deauthenticate(URL_LOGOUT);
		//UserView.showIndexUser();
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
		e.stopImmediatePropagation();
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

	// progreso de la medalla del usuario 
	user = JSON.parse(localStorage.getItem('user'))
	//var gamificationView = new GamificationView();
	//gamificationView.get_progress_user(user.id)

	// se conecta al servidor para el chat y agrega
	console.log('agregate omee')
	chatSocked.emmit('addUser', user)

}


UserView.showSetting = function (form, url)
{
	/*
	* @form, is  a parameter returned at manager_forms.create_form, here is not used but is requiered to do callback
	*/
	
	console.log("Info load")
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", Token.token_type() +" "+ Token.acces_token()  );
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


UserView.renderListUsers = function (response){

	// se pasa a arreglo la respuesta 
	response = response.results;
	
	for (i = response.length-1; i >= 0; i--) { 

		// para que no muestre al usuario q consulta
		//if( JSON.parse($.session.get('user')).id != response[i].id){
			
			// se crea el html     		
			var container = document.createElement("tr");

			var number = document.createElement("td");
			$(number).text(i+1)

			var col_name = document.createElement("td");
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', host+":"+location.port+"/users/detail/"+id);
			var name = document.createElement("p");
			//se asigna el nombre
			$(name).text(response[i].first_name + " " + response[i].last_name);
			link.appendChild(name);
			col_name.appendChild(link)

			var col_email = document.createElement("td");
			$(col_email).text(response[i].email)

			var col_codigo = document.createElement("td");				
			$(col_codigo).text(response[i].codigo)

			var col_plan = document.createElement("td");				
			$(col_plan).text(response[i].plan)
			


			//se pega a los contenedores 
			container.appendChild(number);
			container.appendChild(col_name);
			container.appendChild(col_email);
			container.appendChild(col_codigo);
			container.appendChild(col_plan);
			$('#listUsers').prepend(container);
		//}
			
	}

}