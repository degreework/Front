var WikiService = {};


WikiService.create_page = function (form, url, callback)
{
	$("#loader").show();

	formSerialized = form.serialize()
	//formData = new FormData($("#form_create_wiki").get(0))

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formSerialized,
    	//processData: false, // tell jQuery not to process the data
    	//contentType: false, // tell jQuery not to set contentType
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Register succesful, then do anything
		*/
		console.log(response)
		WikiService.page = response;
		callback(response);
		//form.trigger("reset");
		//Notify.show_success("OK", "Respuesta creada");
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
		$("#loader").hide();
	});

}

WikiService.update_page = function (form, url)
{
	$("#loader").show();
	console.log("WikiService: "+WikiService)
	formSerialized = form.serialize()
	//formData = new FormData($("#form_create_wiki").get(0))

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formSerialized,
    	//processData: false, // tell jQuery not to process the data
    	//contentType: false, // tell jQuery not to set contentType
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Register succesful, then do anything
		*/
		console.log(response)
		form.trigger("reset");
		Notify.show_success("OK", "Pagina creada");
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
		$("#loader").hide();
	});

}


// bring all pages of the wiki 
WikiService.get_All_Pages = function () {

	$("#loader").show();

	$.ajax({
		type: 'GET',
		url: URL_BRING_ALL_PAGES,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			//container.className = 'question';
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', host+":"+location.port+"/wiki/detail/"+id);
			var titles = document.createElement("spam");
			
			//se asigna el texto 
			$(titles).text(response[i].title)

			//se pega a los contenedores 
			link.appendChild(titles);
			container.appendChild(link);
			
			$('.pages').prepend(container);
		}
		
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 == error.status)
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


WikiService.get_Detail_Page = function (id) {
	
	$("#loader").show();
	
	$.ajax({
		type: 'GET',
		url: URL_DETAIL_ONE_PAGE+id+"/",
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		console.log(response);
		//aca escriba su codigo
		$('.page_title').text(response.title);
		$('.page_content').text(response.raw);
	})
	.fail(function(error){		
		console.log(error);
		//if status ==0  -> can't connect to server
		if(0 == error.status)
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
