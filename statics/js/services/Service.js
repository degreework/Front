var Service = function () {
	//console.log('Service:instance created');
};

Service.prototype.doGET = function(url, callback)
{
	//console.log('Service:doGET');
	
	$.ajax({
		type: 'GET',
		url: url,
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( "Authorization", Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
		}
	})
	.fail(function(error){
		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
	});
}

Service.prototype.doPOST = function(url, data, callback)
{
	//console.log('Service:doPOST');
	console.log(data)

	$.ajax({
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
    });

    console.log("do POST")
    console.log(Token.get_RequestHeader())

	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
		}
	})
	.fail(function(error){
		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
	});
}


Service.prototype.doPOST2 = function(url, data, callback)
{
	//console.log('Service:doPOST');

	$.ajax({
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
    });

	$.ajax({
		type: 'POST',
		url: url,
		data: data,
		//processData: false, // tell jQuery not to process the data
    	//contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
		}
	})
	.fail(function(error){
		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
	});
}



Service.prototype.doPUT = function(url, data, callback)
{
	//console.log('Service:doPUT');
	$.ajax({
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
    });
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
		processData: false, // tell jQuery not to process the data
    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
		}
	})
	.fail(function(error){
		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
	});
}

Service.prototype.doPUT2 = function(url, data, callback)
{
	//console.log('Service:doPUT');
	$.ajax({
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( Token.get_RequestHeader() );
    	}
    });
	$.ajax({
		type: 'PUT',
		url: url,
		data: data,
//		processData: false, // tell jQuery not to process the data
//    	contentType: false, // tell jQuery not to set contentType
	})
	.done(function(response){
		if(callback)
		{
			callback(response);
		}
	})
	.fail(function(error){
		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
	});
}

Service.prototype.doDELETE = function(url, div, callback)
{
	//console.log('Service:doDELETE');
	$.ajax({
		type: 'DELETE',
		url: url,
		beforeSend : function( xhr ) {
    		xhr.setRequestHeader( "Authorization", Token.get_RequestHeader() );
    	}
	})
	.done(function(response){
		if(callback)
		{
			callback(response, div);
		}
	})
	.fail(function(error){
		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			Error.server_not_found();
		}

		//if BAD REQUEST -> show error response in fields form
		else if(400 == error.status)
		{
			Notify.show_error("DATOS", "Los datos ingresados están incompletos");
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
	});
}
