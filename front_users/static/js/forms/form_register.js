function register(form, url)
{
	formSerialized = form.serialize()
	formData = new FormData($("#form_register").get(0))

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
		form.trigger("reset");
		$.notify({
				title: "OK:",
				message: "Se ha creado el usuario"
			},{
				// settings
				type: 'success',
				offset: 100,
		});

	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			console.log("can't connect to server")
			
			$.notify({
				title: "Error:",
				message: "No se pudo conectar con el servidor"
			},{
				// settings
				type: 'danger',
				offset: 100,
			});

		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
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