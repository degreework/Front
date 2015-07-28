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
		
		console.log(response)
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
			var summarys = document.createElement("span");
			//summarys.className = 'pull-right';
			var author = document.createElement("span");
			var count = document.createElement("span");
			count.className= "count-answer pull-right number_answer";

			
			//se asigna el texto 
			$(count).text('Respuestas: '+ response[i].count)
			$(titles).text(response[i].title)
			$(summarys).text(jQuery.timeago(response[i].added_at))
			$(author).text("Autor apellido - ")
			
			//se pega a los contenedores 
			author.appendChild(summarys)
			link.appendChild(titles);
			container.appendChild(link);
			//container.appendChild(summarys);
			container.appendChild(author);
			container.appendChild(count);
			
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

ForumService.append_answer_to_ask = function(response, div_container)
{
	for (i = 0; i < response.length; i++) { 
		
		// se crea el html     		
		var container = document.createElement("div");
		container.className = 'col-md-12 response';
		var id = response[i].id;
		container.id = 'cmt-'+id;

		
		//informacion de la persona q creo la respuesta
		var info_user = document.createElement("div");
		info_user.className = "col-md-2";
		var link = document.createElement("a");
		var date = document.createElement("p");
		var autor = document.createElement("p");
		
		$(autor).text("Nombre del autor")
		$(date).text(""+jQuery.timeago(response[i].added_at))

		var options = document.createElement("div");
		options.className = "col-md-1";

		//aqui iban editar y eliminar 
		//$(info_user).append(del)
		//$(info_user).append('<br>')
		//$(info_user).append(edit)

		link.appendChild(autor);
		info_user.appendChild(link);
		info_user.appendChild(date);
		ForumView.appentOptions(options)
	
		//repuesta como tal 
		var summarys = document.createElement("div");
		summarys.className = "col-md-9"
		

		content_summary = document.createElement("div");
		content_summary.className = "col-md-12"
		content_summary.id = "textAnswer"
		$(content_summary).text(response[i].text)
		summarys.appendChild(content_summary)	

		//comentarios 
		var div_comments = document.createElement("div");
		div_comments.className = "col-md-10 col-sm-offset-1"
		
		// contenedor para listar los comentarios 
			var list_comments = document.createElement("div");
			$(list_comments).attr('id', 'list-comment')
		
		// contenedor para el "ver mas" de los comentarios 
			var div_load_comments = document.createElement("div");
			var load_comments = document.createElement("span");
			load_comments.className = 'load-comment'
			div_load_comments.appendChild(load_comments)

		div_comments.appendChild(list_comments)
		div_comments.appendChild(div_load_comments)
		summarys.appendChild(div_comments)

		//enlace para comentar 
		var div_link_comment = document.createElement("div");
		div_link_comment.className = "col-md-10 col-sm-offset-1 link_comment"
			var link_comment = document.createElement("a");
			link_comment.className = "btn-create pull-right"
			$(link_comment).attr('id', 'a-comment')
			$(link_comment).text("agrega un comentario")
		div_link_comment.appendChild(link_comment)

		summarys.appendChild(div_link_comment)

		//formulario para comentar 
		var div_form_comment = document.createElement("div");
		div_form_comment.className = "col-md-10 col-sm-offset-1"
			var form_comment = document.createElement("form");
			$(form_comment).attr('id', 'form-comment')
			$(div_form_comment).hide()
				var button = document.createElement("button");
				button.className = "btn btn-default pull-right"
				$(button).attr('id', 'btn-comment')
				$(button).attr('type', 'submit')
				$(button).attr('name', 'action')
				$(button).text('comentar')

		form_comment.appendChild(button)
		div_form_comment.appendChild(form_comment)

		summarys.appendChild(div_form_comment)

		//se pega a los contenedores 
		container.appendChild(summarys);
		container.appendChild(info_user);
		container.appendChild(options);


		$(div_container).append(container);

	}

}

// get answer list from a ask at forum
ForumService.get_Answers = function (url, callback) {

	$("#loader").show();
	console.log(id)
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
		ForumService.append_answer_to_ask(response, $('.answer'))

		//height div info
		//var height = $('.content_ask').innerHeight()
		//$('.info_ask').css('height',height);
		
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
		$("#loader").hide();
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

		// contador de las repuestas 
		count = $('.count-answer').text();
		count.split(' ');
		count = count[0]
		count = count-1+" ";

		if(count == '1 '){
		$(".count-answer").text(count + 'Respuesta')
		}else{
		$(".count-answer").text(count + 'Respuestas')	
		}

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



// get all comments
ForumService.get_Comments = function (url, callback) {

	//$("#loader").show();

	$.ajax({
		type: 'GET',
		url: url,
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

		response = response.results;
		CommentView.append_comment(response);	
		
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

/*----------------*/

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
			ForumService.get_Comments(next);
		});
	}
}


