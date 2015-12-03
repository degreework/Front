function remove_all_errors (data) {
	/*
	Remove all error message divs from form
	*/

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
	fields = []
	try{	
		fields = data.split('&');
	}catch(err)
	{
		if (data instanceof FormData) {
   			$.each(response, function(k, v){
   				fields.push(k+'=')
   			})
		}
	}

	//remove error mesagges if there are
	remove_all_errors(fields)


			
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

			//console.log(value)
			//console.log(value.type)
			
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
				else if( 'datetime' == value.type)
				{
					input.type = "text";
					
				}
				else if('choice' == value.type || 'plan' == key )
				{

					console.log(key)
					//creat label for input
					var label = document.createElement("label");
					//set text to label
					
					//field_div.appendChild(label);

					//create a input select 
					input = document.createElement("select");
					input.className = "form-control";

					//create default option
					var option = document.createElement("option");
					option.selected = "selected";
					option.value = ''//option.disabled = true;
					

					if(key === "answer_order"){
						option.textContent = "Orden de las respuestas";
						label.appendChild(document.createTextNode('Orden de las respuestas'));
					}
						
					
					
					//add option to selectable
					input.add(option);

					if('plan' == key)
					{
						label.appendChild(document.createTextNode('Selecciona un programa'));
						option.textContent = "Selecciona un programa";
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
					label.id = 'imagen'
					//set text to label
					console.log(value)
					label.appendChild(document.createTextNode('Selecciona una foto'));
					field_div.appendChild(label);
					
					input.type = 'file';

					//set max length to input
					input.maxLength = null
					input.className = null;
				}
				else if('file upload' == value.type)
				{

					//creat label for input
					var label = document.createElement("label");
					label.id = 'file'
					//set text to label
					label.appendChild(document.createTextNode('Selecciona un archivo'));
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
					input.value = false;

					//set max length to input
					//input.maxLength = 100
				}
				else if('field' == value.type){
					
					input = document.createElement("select");
					input.className = "form-control";

					if (key ==='quiz' || key === 'prerequisites') {
						
						// etiqueta
						var label = document.createElement("label");					
						$(label).text("Selecciona las "+value.label);
						field_div.appendChild(label);
					
						//salto
						var br = document.createElement("br");	
						field_div.appendChild(br);

						//selector donde se cargan las preguntas
						input1 =  document.createElement("select");
						input1.className = "form-control";
						$(input1).attr('multiple', 'multiple')
						input1.id = 'id_quiz_from'

						//segundo selector donde se colocan las q se van a guardar
						$(input).attr('multiple', 'multiple')
				
						//teclas para mover de un selector a otro
						up = document.createElement('strong')
						a = document.createElement('a')
						a.className = "glyphicon glyphicon-circle-arrow-up"
						
						down = document.createElement('strong')
						$(down).css('margin-right', '20px')
						a2 = document.createElement('a')
						a2.className = "glyphicon glyphicon-circle-arrow-down"
						
						up.appendChild(a)
						down.appendChild(a2)

						// div de las teclas para mover
						teclas = document.createElement('div')
						teclas.className = "col-md-12"
						teclas.appendChild(down);
						teclas.appendChild(up);
						$(teclas).css('font-size', '25px')
						$(teclas).css('margin-top', '10px')					
						$(teclas).css('text-align', 'center')						

						//titulos de los selectores
						title2 = document.createElement('spam')
						$(title2).text('elegidos')

						title1 = document.createElement('spam')
						$(title1).text('disponibles')

						// se pegan las opciones en el selector disponible
						for (var i = 0, size=this.choices.length; i < size; i++) {
							option = document.createElement("option");
							option.value =  value.choices[i].value;
							option.textContent = value.choices[i].display_name;
							input1.add(option);					
						}

						// se pegan los elementos al contenedor
						field_div.appendChild(title1)
						field_div.appendChild(input1)
						field_div.appendChild(teclas);
						field_div.appendChild(title2);


						// eventos para mover las opciones de un selector a otro 
						$(a).click(function(){
							$('#id_quiz option:selected').appendTo("#id_quiz_from");
							$('#id_prerequisites option:selected').appendTo("#id_quiz_from");
						})

						$(a2).click(function(){
							$('#id_quiz_from option:selected').appendTo("#id_quiz");
							$('#id_quiz_from option:selected').appendTo("#id_prerequisites");
						})

					}else
					{
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
					};



						
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
	        xhr.setRequestHeader( "Authorization", Token.token_type() +" "+ Token.acces_token() );
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
	var url2 = String(url)
	console.log(url2)
    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');

    $('ul.nav a').filter(function() {
        
        if ($(this).text().indexOf('Material') !== -1 && url2.indexOf('material') !== -1) {
        	$(this).parent().addClass('active')
        };

        if ($(this).text().indexOf('Wiki') !== -1 && url2.indexOf('wiki') !== -1) {
        	$(this).parent().addClass('active')
        };

        if ($(this).text().indexOf('Foro') !== -1 && url2.indexOf('forum') !== -1) {
        	$(this).parent().addClass('active')
        };

        if ($(this).text().indexOf('Actividades') !== -1 && url2.indexOf('activity') !== -1) {
        	$(this).parent().addClass('active')
        };

        if ($(this).text().indexOf('Quices') !== -1 && url2.indexOf('evaluations') !== -1) {
        	$(this).parent().addClass('active')
        };

        return this.href == url;
    }).parent().addClass('active');


}

