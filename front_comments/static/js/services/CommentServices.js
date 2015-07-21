var CommentService = {};


CommentService.create =function(form, url, callback)
{
//	$("#loader").show();

	formSerialized = form.serialize()
	formData = new FormData($(form).get(0))

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formData,
    	processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		/*
		Comment succesful, then do anything
		*/
		if (callback) {
			callback([response]);
		};
		form.trigger("reset");
		Notify.show_success("OK", "Comentario creado");

	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
		}
		//if UNAUTHORIZED -> show error response in fields form
		else if(401 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Error.UNAUTHORIZED();
		}
		//if INTERNAL SERVER ERROR
		if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		//console.log("always");
		//$("#loader").hide();
	});
}


CommentService.update = function(form, url, callback)
{
//	$("#loader").show();
	formData = new FormData($(form).get(0))

	//remove all errors from before
	remove_all_errors($(form).serialize());

	$.ajax({
		type: 'PUT',
		url: url,
		data: formData,
    	processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		/*
		Comment succesful, then do anything
		*/
		callback(response, form);
		Notify.show_success("OK", "Comentario actualizado");

	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
		}
		//if UNAUTHORIZED -> show error response in fields form
		else if(401 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Error.UNAUTHORIZED();
		}
		//if INTERNAL SERVER ERROR
		if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		//console.log("always");
		//$("#loader").hide();
	});
}


CommentService.delete_ = function(div, url, callback)
{
//	$("#loader").show();

	$.ajax({
		type: 'DELETE',
		url: url,
	})
	.done(function(response){
		/*
		Comment succesful, then do anything
		*/
		if(callback)
		{
			callback(response, div);
		}
		Notify.show_success("OK", "Comentario eliminado");

	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
	
		}
		//if UNAUTHORIZED -> show error response in fields form
		else if(401 == error.status)
		{
			Error.UNAUTHORIZED();
		}
		//if INTERNAL SERVER ERROR
		if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		//console.log("always");
		//$("#loader").hide();
	});
}