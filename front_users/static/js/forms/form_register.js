function register(form, url)
{
	data = form.serialize();

	//remove all errors from before
	remove_all_errors(data);

	$.ajax({
		type: 'POST',
		url: url,
		data: data
	})
	.done(function(response){
		/*
		Register succesful, then do anything
		*/
	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			console.log("can't connect to server")
		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			show_errors(data,error.responseJSON);
		}
		//if INTERNAL SERVER ERROR
		if(500 == error.status)
		{
			//if url is incorret
		}
	})
	.always(function(){
		console.log("always");
	});

}