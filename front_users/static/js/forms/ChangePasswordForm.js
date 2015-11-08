ChangePasswordForm = {};

ChangePasswordForm.udpate_password = function(url, form, callback)
{
	var old_p = $(form).find('#id_old_password').val();
	var new_p = $(form).find('#id_new_password').val();
	var match_p = $(form).find('#id_match_password').val();
	
	if( new_p.length != 0 )
	{
		//fields arent empty 

		if(new_p.length != 0 && new_p == match_p)
		{
			//passwords match

			var data = {
				'old': old_p,
				'new': new_p
			}
			UserService.update_password(url, data, callback);

		}
		else
		{
			Notify.show_error("DATOS", "La contraseña nueva y la confirmación no son iguales");
			$(form).trigger("reset");
		}
	}
	else
	{
		Notify.show_error("DATOS", "Los campos no pueden estar vacíos");
	}

	

}