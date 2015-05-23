function login(form, url)
{
	data = form.serialize();

	$.ajax({
		type: 'POST',
		url: url,
		data: 'grant_type=password&'+data+'&client_id=W768A6yDuxGU8nEQ3iXOvghKxFfUGOWbHPWGHXQw&client_secret=LHrwNGN13ISnvXpQAn4YW5K5eWqzasICAwsGExdT5rmFTuAAsdpC0sH2JUbuAV3Am5U8zBHWRRYDyY1Vi4yQfILTugxCdrbitubEkyVuPU0bYNbknN8WUETNqkeaCixi',
	})
	.done(function(response){
		/*
		Login succesful, then do anything
		*/

		console.log(response)
	})
	.fail(function(error){		
		console.log(error);

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			$("#form_login").prepend(error.responseJSON.error_description);
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