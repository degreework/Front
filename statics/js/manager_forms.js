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
		if(undefined != msg)
		{		

			//create new div for error message
			div = document.createElement("div");
			
			//set id to div
			div.id = "error_"+field;
			
			//set class to div
			//div.className = 

			//append error message to div
			div.appendChild(document.createTextNode(msg));

			//append error message div to field
			$("#id_"+field).parent().prepend(div);
		}
		
	};
}



function create_form(url, form)
{
	
	$.ajax({
		type: 'OPTIONS',
		url: url,
	})
	.done(function(response){
		/*
		Create form
		*/
		fields = response.actions.POST;

		var container = document.createElement("div");

		$.each(fields, function(key, value) {

  			console.log( 'hola' )
  			
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

  			//set type to input
			if ('string' == value.type) 
			{
				input.type = 'text';
			}
			else if ('integer' == value.type)
			{
				input.type = 'text';
				//set max length to input
				input.maxLength = 10;
			}
			else if('choice' == value.type)
			{
				input = document.createElement("select");
				input.className = "form-control";

				//create default option
				var option = document.createElement("option");
				option.selected = "selected";
				option.disabled = true;
				option.textContent = "";
				
				//add option to selectable
				input.add(option);

				//create options
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

		});
	
		//append inputs to form
		form.prepend(container);
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