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
			var author = document.createElement("p");
			
			//se asigna el texto 
			$(titles).text(response[i].title)
			$(summarys).text(jQuery.timeago(response[i].added_at))
			$(author).text("Autor apellido")
			
			//se pega a los contenedores 
			link.appendChild(titles);
			container.appendChild(link);
			container.appendChild(summarys);
			container.appendChild(author);
			
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


ForumService.get_Detail_Ask = function (id) {
	$("#loader").show();
	
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
		$('.ask_summary').text(response.text);
		$('.ask_added_at').text(jQuery.timeago(response.added_at));
		$('.ask_author').text("Autor pendiente");
		$('.ask_author_link').attr('href', "autor_link");
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
			container.className = 'response';
			//var link = document.createElement("a");
			var date = document.createElement("span");
			var autor = document.createElement("span");
			var id = response[i].id;
			//$(link).attr('href', host+":"+location.port+"/forum/detail/"+id);
			var titles = document.createElement("h3");
			var summarys = document.createElement("p");
			
			//se asigna el texto 
			$(titles).text(response[i].title)
			$(summarys).text(response[i].text)
			$(autor).text("Nombre del autor - ")
			$(date).text(jQuery.timeago(response[i].added_at))
			
			//se pega a los contenedores 
			//link.appendChild(titles);
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

	formSerialized = form.serialize();
	formData = new FormData($(form).get(0));
	console.log(formData)

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formData,//formSerialized,
    	processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
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


ForumService.append_comment_to_ask = function(response)
{
	for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			container.className = '';
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', "url_del_perfil_del_autor");
			var text = document.createElement("p");
			var author = document.createElement("span");
			
			//se asigna el texto 
			$(text).text(response[i].text+" - ")
			//$(text).text(jQuery.timeago(response[i].added_at))
			$(author).text("Autor Pendiente")
			
			//se pega a los contenedores 
			link.appendChild(author);
			//container.appendChild(link);
			text.appendChild(link);
			container.appendChild(text);
			container.appendChild(document.createElement("hr"));
			
			$('#list-comment').prepend(container);
		}
}


// get all comments
ForumService.get_Comments = function () {

	//$("#loader").show();

	$.ajax({
		type: 'GET',
		url: URL_GET_COMMENTS,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		// se pasa a arreglo la respuesta 
		response = response.results;
		ForumService.append_comment_to_ask(response);
		
		
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
