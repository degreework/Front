//---------------
// CATEGORY
//---------------
EvaluationsView.create_category = function(form)
{
	form.submit(function (e) {
			e.preventDefault();

			var questionService = new QuestionService();
			var data = new FormData(($(e.target).get(0)));
			questionService.create(URL_CREATE_CATEGORY, data, EvaluationsView.notifify_create_category)
	})
	
}

EvaluationsView.notifify_create_category = function(response){

	location.href =  host+":"+location.port+"/evaluations/category"; 
}

EvaluationsView.get_all_Categories = function()
{
	var categoryService = new CategoryService();
	categoryService.list(URL_GET_ALL_CATEGORY, EvaluationsView.render_all_categories)	
}

EvaluationsView.render_all_categories = function (response)
{	
	//console.log(response)
	EvaluationsView.render_list_categories($('#list-categories'), response);
}

EvaluationsView.render_list_categories = function(parent_container, response)
{
	
	for (i = response.length-1; i >= 0; i--) { 

		var container = document.createElement("tr");
		container.className = 'row_category-'+i
		
		var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var title_category = document.createElement("td");
		$(title_category).text(response[i].category)


		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i

		link.addEventListener('click', function(e){ EvaluationsView.handle_edit(response, e.target.name, 'category') }, false);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'
		icon2.name = i

		link2.appendChild(icon2)
		col_del.appendChild(link2)

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_category);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);		

		link2.addEventListener('click', function(e){ EvaluationsView.handle_delete(response, e.target.name, 'categoria', $(e.target).parents('.row_category-'+e.target.name)) }, false);
	}
}

EvaluationsView.update_categories = function(form, id)
{
	form.submit(function (e) {
			e.preventDefault();

			var categoryService = new CategoryService();
			var data = new FormData(($(e.target).get(0)));
			categoryService.update(URL_UPDATE_CATEGORY+id+'/', data, EvaluationsView.redirect_Categories)
	})
}

EvaluationsView.redirect_Categories = function(response){

	//Notify.show_success("categoria", "la categoria fue editada con exito");
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
			console.log(key +'=='+ value)

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
							console.log('toma tus respuestas')
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

	if (form.selector === '#form_update_category') {
		EvaluationsView.update_categories(form, response.id)
	}

	if (form.selector === '#form_update_subcategory') {
		EvaluationsView.update_subCategories(form, response.id)
	}

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
		$('#edit_e').fadeIn()
		form = $("#form_update_e")
		create_form(URL_CREATE_QUESTION_ESSAY, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};


	if (tipo == 'category') {

		form = $("#form_update_category")
		create_form(URL_CREATE_CATEGORY, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};


	if (tipo == 'subcategory') {

		form = $("#form_update_subcategory")		
		create_form(URL_CREATE_SUBCATEGORY, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};


	if (tipo == 'quiz') {
		form = $("#form_update_quiz")		
		create_form(URL_CREATE_QUIZ, form, 'OPTIONS', EvaluationsView.render_parametros, response)
	};
}

EvaluationsView.create_subcategory = function(form)
{
	form.submit(function (e) {
			e.preventDefault();

			var questionService = new QuestionService();
			var data = new FormData(($(e.target).get(0)));
			questionService.create(URL_CREATE_SUBCATEGORY, data, EvaluationsView.notifify_create_subcategory)
	})
	
}

EvaluationsView.notifify_create_subcategory = function(response){
	location.href =  host+":"+location.port+"/evaluations/subcategory"; 
}


EvaluationsView.handle_delete = function(response, index, tipo, row){
	console.log('handle_delete')
	console.log(tipo)
	
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
		
		
		if (tipo == 'categoria') {

			var categoryService = new CategoryService();
			categoryService.delete(URL_UPDATE_CATEGORY+id+'/', row, EvaluationsView.hide_div)
			notify.close()	
		}

		if (tipo == 'subcategoria') {

			var categoryService = new CategoryService();
			categoryService.delete(URL_UPDATE_SUBCATEGORY+id+'/', row, EvaluationsView.hide_div)
			notify.close()	
		}

		if (tipo == 'quiz') {
		
			var quizService = new QuizService();
			quizService.delete(URL_DETAIL_QUIZ+id+'/', row, EvaluationsView.hide_div)
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


EvaluationsView.get_all_subCategories = function()
{
	var categoryService = new CategoryService();
	categoryService.retrieve(URL_GET_ALL_SUBCATEGORY, EvaluationsView.render_all_subcategories)	
}

EvaluationsView.render_all_subcategories = function (response)
{	
	EvaluationsView.render_list_subcategories($('#list-subcategories'), response);
}

EvaluationsView.render_list_subcategories = function(parent_container, response)
{
	for (i = response.length-1; i >= 0; i--) { 

		var container = document.createElement("tr");
		container.className = 'row_subcategory-'+i
		
		var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var title_subcategory = document.createElement("td");
		$(title_subcategory).text(response[i].sub_category)

		var title_category = document.createElement("td");
		$(title_category).text(response[i].category.nombre)

		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i
		link.addEventListener('click', function(e){ EvaluationsView.handle_edit(response, e.target.name, 'subcategory') }, false);


		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'
		icon2.name = i



		link2.appendChild(icon2)
		col_del.appendChild(link2)

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_subcategory);
		container.appendChild(title_category);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);

		link2.addEventListener('click', function(e){ EvaluationsView.handle_delete(response, e.target.name, 'subcategoria', $(e.target).parents('.row_subcategory-'+e.target.name)) }, false);		
	}
}

EvaluationsView.update_subCategories = function(form, id)
{
	form.submit(function (e) {
			e.preventDefault();

			var categoryService = new CategoryService();
			var data = new FormData(($(e.target).get(0)));
			categoryService.update(URL_UPDATE_SUBCATEGORY+id+'/', data, EvaluationsView.redirect_Categories)
	})
}


