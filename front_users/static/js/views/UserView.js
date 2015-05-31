var UserView = {};


UserView.showCurrentUser = function ()
{
	//si el usuario esta autenticado
	if (UserService.isAutenticated())
	{
		$("#introduction").hide();
		$('#form_login').hide();
		$('#register').hide();
	
		$("#user_resume").show();
		$(".resume_name").text(JSON.parse($.session.get('user')).first_name +" "+JSON.parse($.session.get('user')).last_name);	
		$(".pic_resume").attr("src",'http://127.0.0.1:8080'+JSON.parse($.session.get('user')).thumb);
	}
	else
	{
		$('#form_login').trigger("reset");
		$("#div_form_login").show();
		$("#register").show();
	}
}
