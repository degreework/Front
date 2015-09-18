function register(form, url)
{
	$("#preloader_2").show();

	formSerialized = form.serialize()
	
	console.log(formSerialized)
	//formData = new FormData($("#form_register").get(0))
	formData = new FormData(form.get(0))
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
		Register succesful, then do anything
		*/
		console.log(response)
		form.trigger("reset");
		Notify.show_success("OK", "Has sido registrado");
	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
		$("#preloader_2").hide();
	});

}