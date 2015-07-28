function login(form, url)
{
	$("#preloader_2").show();
	data = form.serialize();
	//remove all errors from before
	remove_all_errors(data);

	$.ajax({
		type: 'POST',
		url: url,
		data: 'grant_type=password&'+data+'&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET,
	})
	.done(function(response){
		/*
		Login succesful, then do anything
		*/
		$.session.set("Token", JSON.stringify(response) );
		UserService.get_mini_user(URL_CURRENT_USER);
		UserView.showCurrentUser();
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
			Notify.show_error("OK", "credenciales invalidas");

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
			Error.server_internal_error();
		}
	})
	.always(function(){
		console.log("always");
		$("#preloader_2").hide();
	});

}

/*
function get_account_info(access_token)
{
	console.log("get_account_info()");
	$.ajax( {
    	url: 'http://127.0.0.1:8080/API/users/1/',
    	type: 'GET',
   		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", "Bearer " + access_token );
    	}
	})
	.done(function(response){
		console.log(response);
	});
}*/