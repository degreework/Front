var UserService = {};


/**
*Update user's password
*/
UserService.update_password = function(url, form)
{
	$("#loader").show();

	data = {'password': form[1].value};
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
	    	}

	})
	.done(function(response){
		form[0].value = "";
		form[1].value = "";
		form[2].value = "";
		Notify.show_success("OK", "La contraseña ha sido cambiada");
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
		// if UNAUTHORIZED -> no have permissions
		else if(401 == error.status)
		{
			
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
		$("#loader").show();
	});
}

/**
*Update user's nick_name, first_name, last_name, email, codigo, plan
*/
UserService.update_user = function(url, form)
{
	$("#loader").show();

	data = new FormData(form.get(0));
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
		$.each(response, function(key, value) {
			$('#id_'+key).attr('placeholder', $('#id_'+key).attr('placeholder') +': '+value);
			if('id_'+key === 'id_plan'){
				$('#id_'+key).val(value); 			
			}
		});
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


// trae la informacion  (id, nicname, foto, nombre, apellido) de dropdowm
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