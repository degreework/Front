var ForumService = {};

// trae las preguntas hechas en el foro 
ForumService.get_Asks = function () {

	$("#loader").show();

	$.ajax({
		type: 'GET',
		url: URL_BRING_ASKS_FORO,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		// se pasa a arreglo la respuesta 
		response = response.results;
		for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			container.className = 'question';
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', host+":"+location.port+"/forum/detail/"+id);
			var titles = document.createElement("h3");
			var summarys = document.createElement("p");
			
			//se asigna el texto 
			$(titles).text(response[i].title)
			$(summarys).text(response[i].summary)
			
			//se pega a los contenedores 
			link.appendChild(titles);
			container.appendChild(link);
			container.appendChild(summarys);
			
			$('.asks').prepend(container);
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


ForumService.get_Detail_Ask = function () {
	$("#loader").show();

	//Se obtiene el id 
	var id = location.pathname;
	id = id.split("/");
	id = id[id.length-1];
	
	$.ajax({
		type: 'GET',
		url: URL_DETAIL_ASKS_FORO+id+"/",
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		//aca escriba su codigo
		$('.ask_title').text(response.title);
		$('.ask_summary').text(response.summary);
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


// get answer list from a ask at forum
ForumService.get_Answers = function () {

	$("#loader").show();

	$.ajax({
		type: 'GET',
		url: URL_GET_ANSWERS_FORUM,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){

		console.log(response)
		// se pasa a arreglo la respuesta 
		response = response.results;
		for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			container.className = '';
			var link = document.createElement("a");
			var date = document.createElement("span");
			var autor = document.createElement("span");
			var id = response[i].id;
			//$(link).attr('href', host+":"+location.port+"/forum/detail/"+id);
			var titles = document.createElement("h3");
			var summarys = document.createElement("p");
			
			//se asigna el texto 
			$(titles).text(response[i].title)
			$(summarys).text(response[i].summary)
			$(autor).text("Nombre del autor - ")
			$(date).text(jQuery.timeago(response[i].added_at))
			
			//se pega a los contenedores 
			link.appendChild(titles);
			//container.appendChild(link);
			container.appendChild(summarys);
			container.appendChild(autor);
			container.appendChild(date);

			
			$('.answer').prepend(container);
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


ForumService.create_answer = function (form, url)
{
	$("#loader").show();

	formSerialized = form.serialize()
	//formData = new FormData($("#form_ask_foro").get(0))

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
		form.trigger("reset");
		Notify.show_success("OK", "Respuesta creada");
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