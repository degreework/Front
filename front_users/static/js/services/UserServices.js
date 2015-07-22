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
	        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
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
	$("#loader").show();

	formSerialized = form.serialize()
	data = new FormData(form.get(0));
	remove_all_errors(formSerialized);
	
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
		processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
	    	}

	})
	.done(function(response){
		
		$('#id_photo').remove();
		$('#id_password').remove();
		//fill the information of user in the input 
		/*$.each(response, function(key, value) {
			$('#id_'+key).attr('placeholder', $('#id_'+key).attr('placeholder') +': '+value);
			if('id_'+key === 'id_plan'){
				$('#id_'+key).val(value); 			
			}
		});*/

		console.log(response)
		UserService.get_mini_user(URL_CURRENT_USER);
		UserView.showCurrentUser();
		Notify.show_success("OK", "La info ha sido actualizada");
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
		$("#loader").hide();
	});
}


// trae la informacion para crear la sesion  (id, nicname, foto, nombre, apellido) de dropdowm
UserService.get_mini_user = function (url) {
	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		console.log(response)
		$.session.remove('user');
		$.session.set('user', JSON.stringify(response));
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
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		// se pasa a arreglo la respuesta 
		console.log(response);
		$('.resume_user_profile').text(response.first_name + " " + response.last_name);
		$('.pic_user_profile').attr("src",'http://127.0.0.1:8080'+response.thumb[1]);
		//console.log(response[0].id)
		//console.log("id sesion: "+JSON.parse($.session.get('user')).id);

		
		// se crea el html     		
		/*var container = document.createElement("div");
		var link = document.createElement("a");
		var id = response[i].id;
		$(link).attr('href', host+":"+location.port+"/users/detail/"+id);
		var name = document.createElement("h4");
		
		//se asigna el texto 
		$(name).text(response[i].first_name + " " + response[i].last_name);
		
		//se pega a los contenedores 
		link.appendChild(name);
		container.appendChild(link);

		$('.listUsers').prepend(container);*/
		
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
UserService.get_users = function () {


	$.ajax({
		type: 'GET',
		url: URL_BRING_ALL_USERS,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		// se pasa a arreglo la respuesta 
		response = response.results;
		//console.log(response[0].id)
		//console.log("id sesion: "+JSON.parse($.session.get('user')).id);

		for (i = 0; i < response.length; i++) { 

			if( JSON.parse($.session.get('user')).id != response[i].id){
				
				// se crea el html     		
				var container = document.createElement("div");
				var link = document.createElement("a");
				var id = response[i].id;
				$(link).attr('href', host+":"+location.port+"/users/detail/"+id);
				var name = document.createElement("h4");
				
				//se asigna el texto 
				$(name).text(response[i].first_name + " " + response[i].last_name);
				
				//se pega a los contenedores 
				link.appendChild(name);
				container.appendChild(link);
				$('.listUsers').prepend(container);
			}
			
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
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
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
		$("#loader").hide();
	});

}





UserService.isAutenticated = function ()
{

	if($.session.get('user'))
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
	$("#loader").show();
	
	$.ajax({
		type: 'POST',
		url: url,
		data: 'token='+JSON.parse($.session.get("Token"))+'&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Logout succesful, then do anything
		*/
		$.session.remove('user');
		$.session.remove('Token');
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
		$("#loader").hide();
	});
}


UserService.recovery_password = function(url, form)
{
	$("#loader").show();

	var data = $(form).serialize();

	console.log(data)

	$.ajax({
		type: 'POST',
		url: url,
		data: data
	})
	.done(function(response){
		console.log(response)
		if (callback) {
			callback();
		};
		Notify.show_success("OK", "Revise su correo");
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
		$("#loader").hide();
	});
}
