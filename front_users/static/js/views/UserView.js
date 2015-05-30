var UserView = {};


UserView.showCurrentUser = function ()
{
	console.log("verifico")
	//si el usuario esta autenticado
	if (UserService.isAutenticated()) {
		console.log("hay user")
		$("#div_form_login").hide();

		$("#introduction").hide();
		$("#register").hide();
		

		$("#user_resume").show();
		$(".resume_name").text(JSON.parse($.session.get('user')).first_name +" "+JSON.parse($.session.get('user')).last_name);	
		$(".pic_resume").attr("src",'http://127.0.0.1:8080'+JSON.parse($.session.get('user')).thumb);
		
		//$(".resume_profile").text(""+jQuery.parseJSON($.cookie("username")).first_name+' '+jQuery.parseJSON($.cookie("username")).last_name);		
	}
	else
	{
		console.log("no hay user")
		$('#form_login').trigger("reset");
		$("#user_resume").hide();
		$("#div_form_login").show();
	}
}
