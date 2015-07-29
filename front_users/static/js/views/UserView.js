var UserView = {};


UserView.showCurrentUser = function ()
{
	//si el usuario esta autenticado
	if (UserService.isAutenticated())
	{
		$("#introduction").hide();
		$('#form_login').hide();
		$('#register').hide();
		$('.icon-menu').show();
		$('.consult-user').show();
		$('.menu').show();
		

		$("#user_resume").show();
		$(".resume_name").text(JSON.parse($.session.get('user')).first_name +" "+JSON.parse($.session.get('user')).last_name);	
		$(".resume_profile").text(JSON.parse($.session.get('user')).first_name +" "+JSON.parse($.session.get('user')).last_name);	
		$(".pic_resume").attr("src",'http://127.0.0.1:8080'+JSON.parse($.session.get('user')).thumb[0]);
	}
	else
	{
		$('#form_login').trigger("reset");
		$("#div_form_login").show();
		$("#register").show();
	}
}

UserView.showSetting = function (url)
{
	
	console.log("Info load")
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
	    	}
	})
	.done(function(response){
		//fill the information of user in the input 
		$.each(response, function(key, value) {	
			//$('#id_'+key).attr('placeholder', $('#id_'+key).attr('placeholder') +': '+value);
			$('#id_'+key).attr('value', value);

			if(key === 'plan'){
				$('#id_'+key).val(value); 			
			}
		});
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 === error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status || 401 == error.status)
		{

		}
		// if UNAUTHORIZED ->
		else if(401 == error.status)
		{
		
		}
		//if INTERNAL SERVER ERROR
		else if(500 == error.status)
		{
			//if url is incorret
			Error.server_internal_error();
		}
	})
	.always(function(){
		console.log("always");
	});
}
