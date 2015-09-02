var EvaluationsService = {};

//---------------
// QUESTIONS
//---------------
EvaluationsService.create_question = function(form, url){

	$("#preloader_2").show();
	
	formSerialized = form.serialize();
	formSerialized = EvaluationsView.change_boolean(formSerialized)

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formSerialized,
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Create succesful, then do anything
		*/
		EvaluationsView.notifify_create_question()

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
			Error.BAD_REQUEST();
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


EvaluationsService.get_question_detail = function(url,callback){
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
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
		else if(400 == error.status)
		{
		}
		else if(401 == error.status)
		{
			
		}
		// if UNAUTHORIZED ->
		else if(403 == error.status)
		{
			Error.UNAUTHORIZED()
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

EvaluationsService.get_answer_multichoice = function(url,callback){
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
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
		else if(400 == error.status)
		{
		}
		else if(401 == error.status)
		{
			
		}
		// if UNAUTHORIZED ->
		else if(403 == error.status)
		{
			Error.UNAUTHORIZED()
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

//---------------
// CATEGORY
//---------------

EvaluationsService.create_category = function(form, url){

	$("#preloader_2").show();

	formSerialized = form.serialize();

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formSerialized,
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Create succesful, then do anything
		*/
		EvaluationsView.notifify_create_category()

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
			Error.BAD_REQUEST();
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


EvaluationsService.get_list_categories = function (url, callback) {

	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if (callback) {callback(response)};			
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
		else if(401 == error.status)
		{
			
		}
		// if UNAUTHORIZED ->
		else if(403 == error.status)
		{
			Error.UNAUTHORIZED()
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

//---------------
// QUIZ
//---------------

EvaluationsService.create_quiz = function(form, url){

	$("#preloader_2").show();

	formSerialized = form.serialize();
	formSerialized = EvaluationsView.change_boolean(formSerialized)
	console.log(formSerialized)

	//remove all errors from before
	remove_all_errors(formSerialized);

	$.ajax({
		type: 'POST',
		url: url,
		data: formSerialized,
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Create succesful, then do anything
		*/
		EvaluationsView.notifify_create_category()

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
			Error.BAD_REQUEST();
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

EvaluationsService.get_list_quiz = function (url, callback) {

	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if (callback) {callback(response)};			
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
		else if(401 == error.status)
		{
			
		}
		// if UNAUTHORIZED ->
		else if(403 == error.status)
		{
			Error.UNAUTHORIZED()
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

EvaluationsService.get_quiz = function (url, callback) {

	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if (callback) {callback(response)};			
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
		else if(401 == error.status)
		{
			
		}
		// if UNAUTHORIZED ->
		else if(403 == error.status)
		{
			Error.UNAUTHORIZED()
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

/*
	TAKE QUIZ
*/
EvaluationsService.create_sitting = function(url){

	$("#preloader_2").show();

	formSerialized = JSON.parse($.session.get('user'))

	$.ajax({
		type: 'POST',
		url: url,
		data:formSerialized,
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		/*
		Create succesful, then do anything
		*/
		sessionStorage.setItem('sitting', JSON.stringify(response));
		$(location).attr('href', host+":"+location.port+"/evaluations/take/"+response.quiz); // esto va en el servicio 
		
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
			//show_errors(formSerialized, error.responseJSON);
			Error.BAD_REQUEST();
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

EvaluationsService.update_sitting = function(sitting, url, callback)
{
	$.ajax({
		type: 'PUT',
		url: url,
		data: sitting,
    	//processData: false, // tell jQuery not to process the data
    	//contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		/*
		Comment succesful, then do anything
		*/
		if(callback){callback(response)}
		

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

EvaluationsService.qualify = function(form, url, callback){

	formSerialized = form.serialize();
	console.log(formSerialized)
	if (formSerialized.search('answered') !== -1) {
		//remove all errors from before
		remove_all_errors(formSerialized);

		$.ajax({
			type: 'POST',
			url: url,
			data: formSerialized,
	    	beforeSend : function( xhr ) {
	        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
	    	}
		})
		.done(function(response){
			/*
			Create succesful, then do anything
			*/
			if (callback) {callback(response)};

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
				Error.BAD_REQUEST();
			}
			//if INTERNAL SERVER ERROR
			if(500 == error.status)
			{
				//if url is incorret
				Error.server_internal_error();
			}
		})
		.always(function(){
			console.log("always");
		});
	}else{
		Notify.show_error('titulo', 'Por favor responda la pregunta')
	}
}

//----------------
// MARKING QUIZ 
//----------------

EvaluationsService.get_marking_detail = function(url, callback){

	$("#preloader_2").show();

	$.ajax({
		type: 'GET',
		url: url,
    	beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		
		if (callback) {callback(response)};

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
			//show_errors(formSerialized, error.responseJSON);
			Error.BAD_REQUEST();
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


EvaluationsService.get_all_marking_quiz = function(url, callback){

	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
        	xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
    	}
	})
	.done(function(response){
		if (callback) {callback(response)};			
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
		else if(401 == error.status)
		{
			
		}
		// if UNAUTHORIZED ->
		else if(403 == error.status)
		{
			Error.UNAUTHORIZED()
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


