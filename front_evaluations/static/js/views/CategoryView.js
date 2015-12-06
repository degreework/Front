
EvaluationsView.redirect_Categories = function(response){

	location.reload();
}

EvaluationsView.render_form_answerMC = function(answers){
	
	

	for (i = 0; i < answers.length; i++) {
		
		// se convierte la respuesta a Json 
		answer = answers[i]
		answer = JSON.parse(answer)

		// se crea el formulario de las respuestas con los valores actuales 
		form_div = document.createElement('div')
		form_div.className = 'list_answer row'

		form = document.createElement('form')

		content_div = document.createElement('div')
		content_div.className = 'form-group col-md-8'
		content_input = document.createElement('input')
		content_input.className = 'form-control'
		content_input.id = 'content_ans'
		content_input.type = 'text'
		content_input.value = answer.content
		content_input.name = answer.id
		content_div.appendChild(content_input)


		correct_div = document.createElement('div')
		correct_div.className = 'checkbox col-md-4'
		$(correct_div).css('text-align', 'center')
		correct_input = document.createElement('input')
		correct_input.id = 'id_correct'
		correct_input.type = 'radio'
		correct_input.name = 'verdict'
		correct_div.appendChild(correct_input)

		if (answer.correct == 'True') {
			$(correct_input).prop('checked', true);
		};

		form_div.appendChild(content_div)
		form_div.appendChild(correct_div)
		$("#form_mc_answer").prepend(form_div);
	}

}

EvaluationsView.render_parametros = function(form, response){

	var input = $(form).find("#id_url");
	input.hide();

	var input2 = $(form).find("#id_single_attempt");
	$(input2).prop("checked", "checked");
	$(input2).siblings('label').hide();
	$(input2).hide();

	$.each(response, function(key, value) {	
			
			/*
				1. verifica si el valor es true para marcarlo en el checkbox 
					1.1 marca el checbox como true
				si no 
					2. verifica si el valor es distinto de nulo para que pueda leer la propiedad nombre 
						2.1. verifica si valor tiene la propiedad nombre idefinida
							2.1.1 coloca el valor del atributo
							2.1.2 verifica si el campo es quiz para seleccionar las opciones guardadas
								selecciona las opciones guardadas
							2.1.3 verifica si la pregunta tiene respuestas (MC_QUESTION)
								llama funcion para renderizar las respuestas 
						si no 
						2.2 en el desplegable selecciona la opcion con el id del nombre 
					si no 
					3. pone valor null (foto)
				
			*/
			//console.log(key +'=='+ value)

			if (value === true) { 
				//$('#id_'+key).prop("checked", true);
				$('#id_'+key).attr('checked', 'checked')
				$('#id_'+key).val(true);
			}else{
				
				if (value !== null) {
					

					if (value.nombre === undefined) {
						$('#id_'+key).attr('value', value);
						
						// para las opciones seleccionadas en el quiz 
						if (key === 'quiz') {
							value = String(value) 
							value = value.split(',')
								
							//selecciona las opciones de el selector de disponibles						
							for (var i = 0; i < value.length; i++) {
								
								$('#id_quiz_from option[value = '+value[i]+']').prop('selected', true)

							};
							//las pasaal selector de elegidos
							$('#id_quiz_from option:selected').appendTo("#id_quiz");
						}

						if (key == 'answers') {
							//console.log('toma tus respuestas')
							EvaluationsView.render_form_answerMC(value)
						};
				
					}else{
						// desplegables categoria y sub_categoria
						$('#id_'+key).val(value.id);
							
						};	
				
				}else{
					$('#id_'+key).attr('value', value);	
				};			
			}
			
	})

	$(form).show()

	if (form.selector === '#form_update_quiz') {
		//console.log('quiz')
		EvaluationsView.update_quiz(form, response.id)
	}

	if (form.selector === '#form_update_tf') {
		EvaluationsView.update_question(form, response.id, '')
	}

	if (form.selector === '#form_update_mc') {
		EvaluationsView.update_question(form, response.id, '.list_answer')
	}

	if (form.selector === '#form_update_e') {
		EvaluationsView.update_question(form, response.id, '')
	}
	
}

EvaluationsView.handle_edit = function(response, index, tipo){
	
	$('#edit_').fadeIn()
	$('#show_').hide()

	// questions

	response = response[index]

	if (tipo == 'True/False Question') {

		$('#edit_tf').fadeIn()
		form = $("#form_update_tf")
		create_form(URL_CREATE_QUESTION_TF, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};

	if (tipo == 'Multiple Choice Question') {

		$('#edit_mc').fadeIn()
		form = $("#form_update_mc")
		create_form(URL_CREATE_QUESTION_MC, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};

	if (tipo == 'Essay style question') {
		//console.log('entro al tipo Essay')
		$('#edit_e').fadeIn()
		form = $("#form_update_e")
		create_form(URL_CREATE_QUESTION_ESSAY, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};

	if (tipo == 'quiz') {
		form = $("#form_update_quiz")		
		create_form(URL_CREATE_QUIZ, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};
}

EvaluationsView.handle_delete = function(response, index, tipo, row){
	//console.log('handle_delete')
	//console.log(tipo)
	
	response = response[index]
	notify = Notify.show_confirm('la '+ tipo);

	//console.log(row)
	var id = response.id

	$('#erase').click(function(){

		if (tipo == 'True/False Question') {
			
			var questionService = new QuestionService();
			questionService.delete(URL_UPDATE_QUESTION_TF+id+'/', row, EvaluationsView.hide_div)
			notify.close()	
		};

		if (tipo == 'Multiple Choice Question') {
			
			var questionService = new QuestionService();
			questionService.delete(URL_UPDATE_QUESTION_MC+id+'/', row, EvaluationsView.hide_div)
			notify.close()	
		};

		if (tipo == 'Essay style question') {
			
			var questionService = new QuestionService();
			questionService.delete(URL_UPDATE_QUESTION_ESSAY+id+'/', row, EvaluationsView.hide_div)
			notify.close()	
		};
		
		if (tipo == 'quiz') {
		
			var quizService = new QuizService();
			var url = URL_DETAIL_QUIZ.replace(/\%slug%/g, slug);;
			quizService.delete(url+id+'/', row, EvaluationsView.hide_div)
			notify.close()	
		}

	})
	
	$('#cancel').click(function(){
		notify.close()	
	})
}

EvaluationsView.hide_div= function(response, row){
	row.fadeOut()
}
