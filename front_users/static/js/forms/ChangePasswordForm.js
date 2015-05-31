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
		console.log("no match")
	}

	

}