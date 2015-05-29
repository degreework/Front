function login(form, url)
{
	data = form.serialize();
	//remove all errors from before
	remove_all_errors(data);

	$.ajax({
		type: 'POST',
		url: url,
		data: 'grant_type=password&'+data+'&client_id=W768A6yDuxGU8nEQ3iXOvghKxFfUGOWbHPWGHXQw&client_secret=LHrwNGN13ISnvXpQAn4YW5K5eWqzasICAwsGExdT5rmFTuAAsdpC0sH2JUbuAV3Am5U8zBHWRRYDyY1Vi4yQfILTugxCdrbitubEkyVuPU0bYNbknN8WUETNqkeaCixi',
	})
	.done(function(response){
		/*
		Login succesful, then do anything
		*/
		$.cookie.json = true;
		$.cookie("Token", response, {path: '/' });
		getCurrentUser();
		isAutenticated();

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
			//create new div for error message
			div = document.createElement("div");
			
			//set id to div
			div.id = "error_username";
			
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
}