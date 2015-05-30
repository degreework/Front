function info_user_settings()
{
	
	console.log("Info load")
	$.ajax({
		type: 'GET',
		url: "http://127.0.0.1:8080/API/users/"+jQuery.parseJSON($.cookie("username")).id,
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", $.cookie("Token").token_type +" "+ $.cookie("Token").access_token );
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
		/*
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
		}*/
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