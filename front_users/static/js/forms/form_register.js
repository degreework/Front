function register(form, url)
{
	data = form.serialize();

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