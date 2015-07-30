var ForumService = {};

// --------------------------------
// ::::Services for Ask ::::
// --------------------------------


ForumService.create_ask = function(form, url){
	$("#preloader_2").show();

	formSerialized = form.serialize()
	formData = new FormData($(form).get(0))

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formData,
    	processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		/*
		Register succesful, then do anything
		*/
		ForumView.create_ask_succes(response)
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
		$("#preloader_2").hide();
	});

}

// trae las preguntas hechas en el foro 
ForumService.get_Asks = function () {

	$("#preloader_2").show();

	$.ajax({
		type: 'GET',
		url: URL_BRING_ASKS_FORO,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){

		ForumView.render_list_ask(response)
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
	$("#preloader_2").show();
	
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
		ForumView.render_ask_detail(response)
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


// --------------------------------
// :::: Services for Answers ::::
// --------------------------------


// get answer list from a ask at forum
ForumService.get_Answers = function (url, callback) {

	$("#preloader_2").show();
	$.ajax({
		type: 'GET',
		url: url+'/'+id+'/',
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if(callback)
		{
			callback(response.count, response.next, response.previus);
		}
		// se pasa a arreglo la respuesta 
		response = response.results;
		ForumView.append_answer_to_ask(response, $('.answer'))		
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


ForumService.create_answer = function (form, url, callback)
{

	formSerialized = form.serialize();
	formData = new FormData($(form).get(0));

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
		
		if(callback)
		{
			callback([response]);
		}

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
		$("#preloader_2").hide();
	});

}

ForumService.updateAnswer = function(form, url, callback)
{
//	$("#loader").show();
	formData = new FormData($(form).get(0))

	//remove all errors from before
	remove_all_errors($(form).serialize());

	$.ajax({
		type: 'PUT',
		url: url,
		data: formData,
    	processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		/*
		Comment succesful, then do anything
		*/
		callback(response, form);
		Notify.show_success("OK", "Respuesta actualizado");

	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
		}
		//if UNAUTHORIZED -> show error response in fields form
		else if(401 == error.status)
		{
			show_errors(formSerialized, error.responseJSON);
			Error.UNAUTHORIZED();
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
		//$("#loader").hide();
	});
}


ForumService.delete_answer = function(div, url, callback)
{
//	$("#loader").show();

	$.ajax({
		type: 'DELETE',
		url: url,
		async: true,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Comment succesful, then do anything
		*/
		if(callback)
		{
			callback(response, div);
		}

		ForumView.update_count_delete_answer()

		Notify.show_success("OK", "Respuesta eliminada");

	})
	.fail(function(error){		
		console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
	
		}
		//if UNAUTHORIZED -> show error response in fields form
		else if(401 == error.status)
		{
			Error.UNAUTHORIZED();
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
		//$("#loader").hide();
	});
}


//----------------
// FUNTIONS 
//----------------

function show_detail_answers (count, next, previus) {
	//show answer count
	if(count)
	{
		count += ' ';  
	}
	else
	{
		count = '0 ';
	}

	if(count == '1 '){
		$(".count-answer").text(count + 'Respuesta')
	}else{
		$(".count-answer").text(count + 'Respuestas')	
	}


	//show link to load more answer
	if(next)
	{
		var link = document.createElement("a");
		//s$(link).attr('href', next);
		var message = document.createElement("span");
		$(message).text("Ver más respuestas")
		link.appendChild(message);
		$(".load-answer").append(link)	
		$(link).click(function(e){
			e.preventDefault();
			$(link).remove()
			ForumService.get_Answers(next);
		});
	}
	
}

function show_detail_comments (count, next, previus) {
	
	//show link to load more answer
	if(next)
	{
		var link = document.createElement("a");
		//$(link).attr('href', next);
		var message = document.createElement("span");
		$(message).text("Ver más comentarios")
		link.appendChild(message);
		$(".load-comment").append(link)					
		$(link).click(function(e){
			e.preventDefault();
			$(link).remove()
			CommentService.get_Comments(next);
		});
	}
}


