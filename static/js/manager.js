function show_errors (data, response) {
	fields = data.split('&');
			
	for (i=0, size=fields.length; i < size; i++) {
		input = fields[i].split('=');
		field = input[0];
		msg = response[field];
		$("#id_"+field).parent().prepend(msg);
	};
}



function create_form(url, form)
{
	
	$.ajax({
		type: 'OPTIONS',
		url: url,
	})
	.done(function(response){
		/*
		Register succesful, then do anything
		*/
		console.log(response);
		console.log(response.actions.POST);
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

