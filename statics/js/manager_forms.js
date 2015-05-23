function show_errors (data, response) {
	fields = data.split('&');
			
	for (i=0, size=fields.length; i < size; i++) {
		input = fields[i].split('=');
		field = input[0];
		msg = response[field];
		div = document.createElement("div");
		div.appendChild(document.createTextNode(msg));
		$("#id_"+field).parent().prepend(div);
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
		Register succesful, then do anything
		*/
		console.log(response);
		fields = response.actions.POST;
		console.log(fields);

		var container = document.createElement("div");

		jQuery.each(fields, function() {
  			//console.log( this)
  			var field_div = document.createElement("div");
  			field_div.className = 'input-field col s12'

  			var input = document.createElement("input");
			input.type = this.type;
			input.className = "validate"; // set the CSS class

			var label = document.createElement("label");
			label.for = "algo";
			label.appendChild(document.createTextNode(this.label));

			field_div.appendChild(input);
			field_div.appendChild(label);
			container.appendChild(field_div);
		});

		console.log(container);

	})
	.fail(function(error){		
		console.log(error);

		//if BAD REQUEST -> show error response in fields form
		if(400 == error.status)
		{
			show_errors(data,error.responseJSON);
		}
		//if INTERNAL SERVER ERROR
		if(500 == error.status)
		{
			//if url is incorret
		}
	})
	.always(function(){
		console.log("always");
	});

}


