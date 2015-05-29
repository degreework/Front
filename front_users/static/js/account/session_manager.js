function showCurrentUser()
{
	$("#form_login").hide();

	//set atributes
	//....
	//
	//$("#")$.cookie("username");
	$("#user_resume").show();	
}

function showLoginForm()
{
	$('#form_login').trigger("reset");
	$("#user_resume").hide();
	$("#form_login").show();
}

function isAutenticated()
{
	if($.cookie("username"))
	{
		showCurrentUser();
	}
	else
	{
		showLoginForm();
	}
}

function getCurrentUser () {

		$.ajax({
			type: 'GET',
			url: "http://127.0.0.1:8080/API/users/me",
			beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", $.cookie("Token").token_type +" "+ $.cookie("Token").access_token );
	    	}
		})
		.done(function(response){
			/*
			Login succesful, then do anything
			*/

			console.log(response)
			$.cookie("username", response, {path: '/'})
			showCurrentUser();

		})
		.fail(function(error){		
			console.log(error);
			//if status ==0  -> can't connect to server
			if(0 == error.status)
			{
				console.log("can't connect to server")
			}

			//if BAD REQUEST -> show error response in fields form
			if(400 == error.status || 401 == error.status)
			{
				
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

function deautenticateUser () {

		$.ajax({
			type: 'POST',
			url: "http://127.0.0.1:8080/API/auth/revoke_token/",
			data: 'token='+$.cookie("Token")+'&client_id=W768A6yDuxGU8nEQ3iXOvghKxFfUGOWbHPWGHXQw&client_secret=LHrwNGN13ISnvXpQAn4YW5K5eWqzasICAwsGExdT5rmFTuAAsdpC0sH2JUbuAV3Am5U8zBHWRRYDyY1Vi4yQfILTugxCdrbitubEkyVuPU0bYNbknN8WUETNqkeaCixi',
			beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", $.cookie("Token").token_type +" "+ $.cookie("Token").access_token );
	    	}
		})
		.done(function(response){
			/*
			Logout succesful, then do anything
			*/
			$.removeCookie("username", {path: '/'});
			$.removeCookie("Token", {path: '/'});
			showLoginForm();

		})
		.fail(function(error){		
			console.log(error);
			//if status ==0  -> can't connect to server
			if(0 == error.status)
			{
				console.log("can't connect to server")
			}

			//if BAD REQUEST -> show error response in fields form
			if(400 == error.status || 401 == error.status)
			{
				
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

