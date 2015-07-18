ChangePasswordForm = {};

ChangePasswordForm.udpate_password = function(url, form)
{
	//passwords match
	if(form[2].value == form[1].value)
	{
		UserService.update_password(url_update, form);
	}
	else
	{
		Notify.show_error("DATOS", "La contrasena nueva y la confirmacion no son iguales");
		console.log("no match")
	}

	

}