function remove_all_errors (data) {
	/*
	Remove all error message divs from form
	*/
	fields = data.split('&');
			
	for (i=0, size=fields.length; i < size; i++) {
		input = fields[i].split('=');
		field = input[0];
		$("#error_"+field).remove();
	}

}


function show_errors (data, response) {
	/*
	Create error message div for each field form, only there is any
	*/
	fields = data.split('&');
			
	for (i=0, size=fields.length; i < size; i++) {
		input = fields[i].split('=');
		field = input[0];
		msg = response[field];

		//if there is any message for this field
		if(undefined !== msg)
		{		

			//create new div for error message
			div = document.createElement("label");
			
			//set id to div
			div.id = "error_"+field;
			div.className = 'control-label';
			
			//set class to div
			//div.className = 

			//append error message to div
			div.appendChild(document.createTextNode(msg));

			//append error message div to field
			$("#id_"+field).parent().addClass('has-error')
			$("#id_"+field).parent().prepend(div);
		}
		
	}
}


function render_form(method, form , response, callback, params)
{

		if ('PUT' == method)
		{
			fields = response.actions.PUT;
		}
		else if ('OPTIONS' == method)
		{
			fields = response.actions.POST;
		};
				
		var container = document.createElement("div");

		$.each(fields, function(key, value) {

			if(value.read_only == false){
				var field_div = document.createElement("div");
	  			field_div.className = 'form-group';

	  			var row_div = document.createElement("div");
	  			row_div.className = 'col-md-8';

	  			//create a input
	  			var input = document.createElement("input");

	  			// set the CSS class
				input.className = "form-control";

				//set max length to input
				input.maxLength = value.max_length;
				input.autocomplete = "off";

	  			//set type to input
	  			
				if ('string' == value.type) 
				{
					input.type = 'text';
					input.maxLength = 100000
				}
				else if ('integer' == value.type)
				{
					input.type = 'text';
					//set max length to input
					input.maxLength = 10;
				}
				else if('choice' == value.type || 'plan' == key )
				{

					//creat label for input
					var label = document.createElement("label");
					//set text to label
					label.appendChild(document.createTextNode('Selecciona un programa'));
					field_div.appendChild(label);

					//create a input select 
					input = document.createElement("select");
					input.className = "form-control";

					//create default option
					var option = document.createElement("option");
					option.selected = "selected";
					option.disabled = true;
					option.textContent = "Selecciona un programa";
					
					//add option to selectable
					input.add(option);

					if('plan' == key)
					{
						//option = document.createElement("option");
						//input.add(option);					
						$.getJSON( URL_GET_DEGREE , function( data ) {
							$.each( data, function( key, val ) {
						  		option = document.createElement("option");
								option.value =  val.code;
								option.textContent = val.name;
								input.add(option);					
						  	});
						});
					}
					else
					{
						//create options
						for (var i = 0, size=this.choices.length; i < size; i++) {
							option = document.createElement("option");
							option.value =  value.choices[i].value;
							option.textContent = value.choices[i].display_name;
							input.add(option);					
						}
						
					}


				}
				else if('image upload' == value.type)
				{
					//creat label for input
					var label = document.createElement("label");
					//set text to label
					label.appendChild(document.createTextNode('Selecciona una foto de perfil'));
					field_div.appendChild(label);
					
					input.type = 'file';
					//set max length to input
					input.maxLength = null
					input.className = null;
				}
				else if('boolean' == value.type)
				{
					var label = document.createElement("label");
					//var br = document.createElement("br");

					$(label).text(value.label)
					field_div.appendChild(label);
					//field_div.appendChild(br);
					input.type = 'checkbox';
					input.className = 'pull-right';

					//set max length to input
					//input.maxLength = 100
				}
				else if('field' == value.type){
					//var label = document.createElement("label");
					//set text to label
					//label.appendChild(document.createTextNode(value.label));
					//field_div.appendChild(label);
					//console.log(this.choices)
					input = document.createElement("select");
					input.className = "form-control";

					var option = document.createElement("option");
					option.selected = "selected";
					option.disabled = true;
					option.textContent = value.label;
					input.add(option);

					for (var i = 0, size=this.choices.length; i < size; i++) {
						option = document.createElement("option");
						option.value =  value.choices[i].value;
						option.textContent = value.choices[i].display_name;
						input.add(option);					
					}
				}
				else
				{
					input.type = value.type;
					
				}

				//if is a password input
				if('password' == key)
				{
					input.type = 'password';
				}


				//set id to input
				input.id = 'id_'+key;

				//set name to input
				input.name = key;
				input.placeholder = value.label;
	/*
				//if field is required
				if (value.required) {
					input.required = true;
				};
	*/
				//creat label for input
				//var label = document.createElement("label");
				//set text to label
				//label.appendChild(document.createTextNode(value.label));

				//append input to div
				field_div.appendChild(input);
				//append input to div
				//field_div.appendChild(label);
				//append to row
				row_div.appendChild(field_div);

				//append div to container
				container.appendChild(field_div);
				//$('.formulario').prepend(container);
			}


		});

		//append inputs to form
		form.prepend(container);
		if(callback)
		{
			//callback();
			callback(form, params);
		}
}


function create_form(url, form, method, callback, params)
{
	/*implement cache*/
	/*
	var doc = $(document);
	var cache = doc.data( "cache" );

	 
	 if( cache ) {
        render_form(method, form, cache, callback);
        return true;
    
    }
    */
	
	if (UserService.isAutenticated()) {
		$.ajaxSetup({
	    	beforeSend: function(xhr, settings) {
	        xhr.setRequestHeader( "Authorization", JSON.parse($.session.get("Token")).token_type +" "+ JSON.parse($.session.get("Token")).access_token );
	    	}
		});
	};
	$.ajax({
		type: 'OPTIONS',
		url: url,
		cache: true
	})
	.done(function(response){
		/*
		Create form
		*/
		//doc.data("cache", response);
		render_form(method, form, response, callback, params);
		
	})
	.fail(function(error){		
		console.log("error");
		//console.log(error);

		//if status ==0  -> can't connect to server
		if(0 == error.status)
		{
			console.log("can't connect to server")
		}
		//if BAD REQUEST -> show error response
		else if(400 == error.status)
		{
			
		}
		//if INTERNAL SERVER ERROR
		else if(500 == error.status)
		{
			//if url is incorret
		}
	})
	.always(function(){
		console.log("always");
	});
}


//active foro
var active = function()
{
	var url = window.location;
    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
    $('ul.nav a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
}

