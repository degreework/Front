var UserService = {};


/**
*Update user's password
*/
UserService.update_password = function(url, form)
{
	data = form.serialize();
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", jQuery.parseJSON($.cookie("Token")).token_type +" "+ jQuery.parseJSON($.cookie("Token")).access_token );
	    	}

	})
	.done(function(response){
		form.trigger("reset");
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
		//if INTERNAL SERVER ERROR
		else if(500 == error.status)
		{
			//if url is incorret
		}
	})
	.always(function(){
		console.log("always");
	});
}

/**
*Update user's nick_name, first_name, last_name, email, codigo, plan
*/
UserService.update_user = function(url, form)
{
	data = new FormData(form.get(0));
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
		processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", $.cookie("Token").token_type +" "+ $.cookie("Token").access_token );
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
			//create new div for error message
			div = document.createElement("div");
			
			//set id to div
			div.id = "error_login";
			
			//set class to div
			//div.className = 

			//append error message to div
			div.appendChild(document.createTextNode(error.responseJSON.error_description));
			$("#form_login").prepend(div);
		}
		
		// if UNAUTHORIZED ->
		else if(401 == error.status)
		{
			//create new div for error message
			div = document.createElement("div");
			
			//set id to div
			div.id = "error_login";
			
			//set class to div
			//div.className = 

			//append error message to div
			div.appendChild(document.createTextNode(error.responseJSON.error_description));
			$("#form_login").prepend(div);	
		}
		//if INTERNAL SERVER ERROR
		else if(500 == error.status)
		{
			//if url is incorret
		}
	})
	.always(function(){
		console.log("always");
	});
}