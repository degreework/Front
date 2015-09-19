var Login = {};

Login.login = function (form, url, callback)
{
	$("#preloader_2").show();
	
	data = form.serialize();
	//remove all errors from before
	remove_all_errors(data);

	$.ajax({
		type: 'POST',
		url: url,
		async: false,
		data: 'grant_type=password&'+data+'&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET,
	})
	.done(function(response){
		/*
		Login succesful, then do anything
		*/
		//$.session.set("Token", JSON.stringify(response) );
		
		var s = StorageClass.getInstance();
		s.storage.set("token", JSON.stringify(response));
		console.log(s.storage.get("token"));
		NotificationView.get_notifications();

		
		$.ajax({
			type: 'POST',
			url: "http://127.0.0.1:8000/p",
			data: {"Token": s.storage.get("token").access_token},
		})
		.done(function (response) {
			console.log("response get Permissions")
			//console.log(response)
			//var s = new Storage();
			//s.save("permissions", response)
			//console.log(s.get("permissions"))
			var s = StorageClass.getInstance();
			s.storage.set("permissions", response);
			//console.log(s.storage.get("permissions"));

		})
		if(callback)
		{
			callback();	
		}
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 === error.status)
		{
			Error.server_not_found();
		}
		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("Login", "Campos incompletos");
		}
		else if (401 == error.status)
		{
			Notify.show_error("Login", "El usuario o la contraseña son incorrectos");
		}
	})
	.always(function(){
		$("#preloader_2").hide();
	});
}