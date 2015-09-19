var UserService = {};

/**
*Update user's password
*/
UserService.update_password = function(url, data, callback)
{
	
	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		console.log(response)
		Notify.show_success("OK", "La contraseña ha sido cambiada");
		if(callback())
		{
			callback();
		}
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 === error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			
		}
		// if UNAUTHORIZED -> no have permissions
		else if(401 == error.status)
		{
			Error.UNAUTHORIZED(error.responseJSON);
		}
		// if NOT FOUND -> no found url
		else if(404 == error.status)
		{
			Error.url_not_found();
		}
		//if INTERNAL SERVER ERROR
		else if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		//console.log("always");
	});
}

/**
*Update user's nick_name, first_name, last_name, email, codigo, plan
*/
UserService.update_user = function(url, form)
{
	$("#preloader_2").show();

	formSerialized = form.serialize();
	
	// se crea una copia del campo para luego colocarlo otra vez despues de ser removido 
	formCopy =  $("#id_photo")
	
	//si el usaurio no puso foto en el input, que remueva el dato del input para el envio
	if("" == $("#id_photo").val())
	{
		$("#id_photo").remove()  
	}

	data = new FormData(form.get(0));
	remove_all_errors(formSerialized);


	
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
		processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
    	beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		
		$(formCopy).appendTo('#imagen')
		UserService.get_mini_user(URL_CURRENT_USER);
		UserView.showIndexUser();
		Notify.show_success("Usuario", "La información de tu perfil ha sido actualizada");
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
			show_errors(formSerialized, error.responseJSON);
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");

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
		//console.log("always");
		$("#preloader_2").hide();
	});
}


// trae la informacion para crear la sesion  (id, nicname, foto, nombre, apellido) de dropdowm
UserService.get_mini_user = function (url) {

	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", Token.token_type() +" "+ Token.acces_token() );
    	}
	})
	.done(function(response){
		//console.log(response)

		var s = StorageClass.getInstance();
		s.storage.set("user", JSON.stringify(response));
		console.log(s.storage.get("user"));

	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 == error.status)
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

//trae la info de un solo usuario 
UserService.getUser = function(id){


	$.ajax({
		type: 'GET',
		url: URL_DETAIL_USERS+id+"/",
		async: true,
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( "Authorization", Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		console.log(response)
		$('.resume_user_profile').text(response.first_name + " " + response.last_name);
		$('.pic_user_profile').attr("src",'http://127.0.0.1:8080'+response.thumb[0]);
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 == error.status)
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
// trae todos los usuarios 
UserService.get_users = function (callback) {
	
	

	$.ajax({
		type: 'GET',
		url: URL_BRING_ALL_USERS,
		async: true,
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader(  "Authorization",Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		if (callback) {
			callback(response);
		};
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 == error.status)
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

UserService.confirmPassword = function (url,form) {

	formSerialized = form.serialize();
	formData = new FormData($(form).get(0));

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formData,//formSerialized,
    	processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
    	beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		/*
		Register succesful, then do anything
		*/
		if(response.message === 'iguales'){
			ChangePasswordForm.udpate_password(url_update, form[0]);
		}else{
			Notify.show_error("DATOS", "Digita bien tu contrasena actual");
		}
	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
		}
		//if INTERNAL SERVER ERROR
		if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		//console.log("always");
		$("#preloader_2").hide();
	});

}





UserService.isAutenticated = function ()
{

	if(User.exist())
	{
		return true;
		//showCurrentUser();
	}
	else
	{
		return false;
		//showLoginForm();
	}
}



UserService.deauthenticate = function (url) {
	$("#preloader_2").show();
	
	$.ajax({
		type: 'POST',
		url: url,
		data: 'token='+Token.exist()+'&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", Token.token_type() +" "+ Token.acces_token() );
    	}
	})
	.done(function(response){
		/*
		Logout succesful, then do anything
		*/
		var s = StorageClass.getInstance();
		s.storage.removeAll();
		
		$(location).attr('href',"/");  

	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 == error.status)
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
		//console.log("always");
		$("#preloader_2").hide();
	});
}


UserService.recovery_password = function(url, csrftoken, form, callback)
{
	$("#preloader_2").show();

	var data = $(form).serialize();

	$.ajax({
		type: 'POST',
		url: url,
		data: data,
	})
	.done(function(response){
		console.log(response)
		if (callback) {
			callback(response);
		};
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
		//console.log("always");
		$("#preloader_2").hide();
	});
}
