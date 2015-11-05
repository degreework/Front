var EvaluationsView = {};

// resetea formularios 
// trigger("reset");

//inicializa los formularios 
EvaluationsView.initialize = function(form, url, callback)
{
	console.log('entro')
	/*
	* 1 - Set form name
	* 2 - Get form from service
	*/

	// 1 - Set form name
	debug_info("1 - Set form name")
	EvaluationsView.form_create = form;


	//2 - Get form from service
	debug_info("2 - Get form from service")
	
	create_form(
		url,
		EvaluationsView.form_create,
		'OPTIONS',
		callback
	);

	debug_info("3.4 - Show form")
	EvaluationsView.form_create.show();

}


// cambia el valor de ON por un True en un campo tipo boolean 
EvaluationsView.change_boolean = function(data){
	
	for (i = 0; i < $(data).find('input').length; i++) {
		if($(data).find('input')[i].type === 'checkbox'){

			$(data).find('input')[i].value = $($(data).find('input')[i]).is(':checked') 			
		}
	}
	return data
}

//---------------
// QUIZ
//---------------
EvaluationsView.create_quiz = function(form)
{
	//console.info('create_quiz')

	form.submit(function (e) {
			e.preventDefault();
			//Selecciona todas las opciones del contendor 
			$("#id_quiz option").attr("selected","selected"); 

			var quizService = new QuizService();
			var formu = EvaluationsView.change_boolean(($(e.target).get(0)))
			var data = new FormData(formu);
			var url = URL_CREATE_QUIZ_MODULE.replace(/\%slug%/g, slug);
			quizService.create(url, data, EvaluationsView.notifify_create_quiz)
	})
	
}

EvaluationsView.notifify_create_quiz = function(){

	location.href =  Site.geRootUrl()+"/"+slug+"/evaluations/list/"; 
}


EvaluationsView.get_all_Quiz = function()
{
	var url = URL_ALL_QUIZ_MODULE.replace(/\%slug%/g, slug);;
	//URL_GET_ALL_QUIZ
	var quizService = new QuizService();
	quizService.retrieve(url, EvaluationsView.render_all_quiz)	
}

EvaluationsView.render_all_quiz = function (response)
{	
	EvaluationsView.render_list_quiz($('#list-quiz'), response);
}

EvaluationsView.render_list_quiz = function(parent_container, response)
{
	response = response.results;

	for (i = response.length-1; i >= 0; i--) { 		
		
		// se crea el html     		
		var container = document.createElement("tr");
		container.className = 'row_quiz-'+i
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var title_quiz = document.createElement("td");
		$(title_quiz).text(response[i].title)

		// para ver el detalle del quiz 
		var col_link = document.createElement("td");
		var link = document.createElement("a");
		var id = response[i].id;
	
		$(link).attr('href', Site.geRootUrl()+"/"+slug+"/evaluations/detail/"+id);
		$(link).text('ver detalles')
		col_link.appendChild(link)

		// editar 
		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i

		link.addEventListener('click', function(e){ EvaluationsView.handle_edit(response, e.target.name, 'quiz') }, false);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		//eliminar 
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'
		icon2.name = i

		link2.appendChild(icon2)
		col_del.appendChild(link2)
		
		//console.log('entro')
		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_quiz);
		container.appendChild(col_link);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);

		link2.addEventListener('click', function(e){ EvaluationsView.handle_delete(response, e.target.name, 'quiz', $(e.target).parents('.row_quiz-'+e.target.name)) }, false);
	}
}

EvaluationsView.get_all_Quiz_Users = function()
{
	var url = URL_ALL_QUIZ_MODULE.replace(/\%slug%/g, slug);
	//URL_GET_ALL_QUIZ
	var quizService = new QuizService();
	quizService.retrieve(url, EvaluationsView.render_every_quiz)	
}

EvaluationsView.render_every_quiz = function(response)
{
	//console.log('entro')
	//console.log(response)
	response = response.results;

	for (i = response.length-1; i >= 0; i--) { 		
		
		var div_quiz = document.createElement('div')
		div_quiz.className = 'col-md-4'

		var div_title = document.createElement('div')
		div_title.className = 'col-md-12'
		title = document.createElement('h2')
		$(title).text(response[i].title)
		div_title.appendChild(title)


		var div_description = document.createElement('div')
		div_description.className = 'col-md-12'
		description = document.createElement('p')
		$(description).text(response[i].description)
		div_description.appendChild(description)

		var div_enlance = document.createElement('div')
		div_enlance.className = 'col-md-12'

		var start_link = document.createElement('a')
		start_link.className = 'btn-create'
		start_link.id = 'btn-'+response[i].id
		$(start_link).text('Empieza')

		div_enlance.appendChild(start_link)


		div_quiz.appendChild(div_title)
		div_quiz.appendChild(div_description)
		div_quiz.appendChild(div_enlance)
		$('.container_quiz').prepend(div_quiz)
		
		$('#btn-'+response[i].id).click(function (e){
			id = e.target.id
			id = id.split("-");
			id = id[1]

			e.preventDefault();
			var quizService = new QuizService();
			var data = JSON.parse(localStorage.getItem('user'))
			quizService.dispatch(URL_CREATE_SITTING+id+'/', data, EvaluationsView.create_sitting_session)
		})
	}
}



EvaluationsView.update_quiz = function(form, id)
{

	form.submit(function (e) {
			e.preventDefault();
			
			//Selecciona todas las opciones del contendor 
			$("#id_quiz option").attr("selected","selected"); 

			var quizService = new QuizService();
			var form = EvaluationsView.change_boolean(($(e.target).get(0)))
			var data = new FormData(form);
			
			data.append("exam_paper", $('#id_exam_paper').val());
			data.append("random_order", $('#id_random_order').val());
			data.append("answers_at_end", $('#id_answers_at_end').val());
			data.append("single_attempt", $('#id_single_attempt').val());
			data.append("correct", $('#id_draft').val());

			var url = URL_DETAIL_QUIZ.replace(/\%slug%/g, slug);;
			quizService.update(url+id+'/', data, EvaluationsView.redirect_Categories)
	})
}

EvaluationsView.create_sitting_session = function(response){
	//console.log(response)
	sessionStorage.setItem('sitting', JSON.stringify(response));
	$(location).attr('href', Site.geRootUrl()+"/"+slug+"/evaluations/take/"+response.quiz); 
}

EvaluationsView.get_Quiz = function(){
	
	var id = location.pathname.split("/");
	id = id[id.length-1];

	$('.btn-create').click(function(e){
		e.preventDefault();
		var quizService = new QuizService();
		var data = JSON.parse(localStorage.getItem('user'))

		quizService.dispatch(URL_CREATE_SITTING+id+'/', data, EvaluationsView.create_sitting_session)
	})

	var quizService = new QuizService();
	var url = URL_DETAIL_QUIZ.replace(/\%slug%/g, slug);;
	quizService.retrieve(url+id+'/', EvaluationsView.render_quiz)	
}


EvaluationsView.render_quiz = function(response){
	
	$('.titulos').text(response.title)
	//$('.category').text('Categoria: '+response.category.nombre)
	$('.description').text('Descripción: '+response.description)
}

//------------------
//  TAKE QUiZ 
//------------------

// renderiza el formulario con las opciones de respuesta de una pregunta multichoice 
EvaluationsView.render_answer_mc = function(answers){
	
	var field_div = document.createElement("div");
	field_div.className = 'form-group';

	for (i = 0; i < answers.length; i++) {
		
		answer = answers[i]
		answer = JSON.parse(answer)
		console.log(answer)

		var ul = document.createElement("ul");
		ul.className = 'list-group'

		//verdadero
		var li = document.createElement("li");
		li.className = 'list-group-item'

		var label = document.createElement("spam");
		$(label).text(' '+answer.content)

		var input = document.createElement("input");
		input.type = 'radio';
		input.name = 'answered';
		input.value = answer.id;

		li.appendChild(input)
		li.appendChild(label)
		ul.appendChild(li)
		
		field_div.appendChild(ul)
	}

	// se pega al template
	$('#question_form').append(field_div)

}

// renderiza el formulario con las opciones de respuesta 
EvaluationsView.render_form_question = function(question){

	// se obtiene el tipo de pregunta 
	clase = question.clase

	// div base 
	var field_div = document.createElement("div");
	field_div.className = 'form-group container_answers';

	//campos id y tipo de pregunta para poder verificar 
	input_id = document.createElement("input");
	input_id.type = "hidden"
	input_id.value = question.id
	input_id.name = 'id'
	
	input_clase = document.createElement("input");
	input_clase.type = "hidden"
	input_clase.name = 'clase'

	// pregunta tipo ensayo 
	if(clase === 'Essay style question'){
		
		var input = document.createElement("input");	
		input.type = 'text';
		input.name = "answered"
		input.className = "form-control";
		input.maxLength = 100000
		//input.required=true
		//$(input).attr('placeholder' ,  '')
		field_div.appendChild(input)

		
		input_clase.value = question.clase
	}

	// pregunta tipo opcion multiple
	if(clase === 'Multiple Choice Question'){
		
		var quizService = new QuizService();

		//quizService.retrieve(URL_GET_ALL_ANSWER_MC+question.id+'/', EvaluationsView.render_answer_mc)
		EvaluationsView.render_answer_mc(question.answers)
		input_clase.value = question.clase

	}

	// pregunta tipo Verdadero/Falso
	if(clase === 'True/False Question'){
		
		var ul = document.createElement("ul");
		ul.className = 'list-group'

		//verdadero
		var li_true = document.createElement("li");
		li_true.className = 'list-group-item'

		var label_true = document.createElement("spam");
		$(label_true).text(' Verdadero ')

		var input = document.createElement("input");
		input.type = 'radio';
		input.name = 'answered';
		input.value = 'True';

		li_true.appendChild(input)
		li_true.appendChild(label_true)
		ul.appendChild(li_true)
		
		field_div.appendChild(ul)

		//falso
		var ul = document.createElement("ul");
		ul.className = 'list-group'

		var li_false = document.createElement("li");
		li_false.className = 'list-group-item'

		var label_false = document.createElement("spam");
		$(label_false).text('  Falso')

		var input2 = document.createElement("input");
		input2.type = 'radio';
		input2.name = 'answered';
		input2.value = 'False';

		li_false.appendChild(input2)
		li_false.appendChild(label_false)
		ul.appendChild(li_false)

		field_div.appendChild(ul)

		input_clase.value = question.clase
	}

	// se pega al template
	$('#question_form').append(field_div)

	$('#question_form').append(input_id)
	$('#question_form').append(input_clase)


}

//renderiza contenido e imagen de la pregunta 
EvaluationsView.render_question = function(question){
	
	$('#img-question').attr('src','http://127.0.0.1:8080'+question.figure)
	$('#question_content').text(question.content)
	console.log(question)
	EvaluationsView.render_form_question(question)	

	
	// si la pregunta es tipo ensayo 
	if (question.clase === 'Essay style question') {
		
		$('#btn-check').text('guardar')
		$('#essay_explication').text('Esta es una pregunta abierta, guarda tu respuesta para que la califique el docente')
		$('#container-check').css('border', '1px solid #ccc')
	};
}

// renderiza cuando califican una pregunta 
EvaluationsView.render_check = function(response){
	
	sitting = JSON.parse(sessionStorage.getItem('sitting'))

	if(response.correcta){

		$('#question-status').text('tu respuesta es correcta')
		$('#question-status').attr('class', 'text-success')

		$('#question-explication').text(response.explanation)
		$('#question-explication').attr('class', 'text-success')

		$('#container-continue').attr('class', 'col-md-12 bg-success')
			
		//actualiza puntuacion
		sitting.current_score++
		
	}else{

		if(response.clase === 'Essay style question'){
			$('#question-status').text('tu respuesta ha sido guardada')			
		}else{

			$('#question-status').text('tu respuesta es incorrecta')
			$('#question-status').attr('class', 'text-danger')
			$('#question-explication').text(response.explanation)
			$('#question-explication').attr('class', 'text-danger')
			$('#container-continue').attr('class', 'col-md-12 bg-danger')
		}
		
		sitting.incorrect_questions += response.id+','
	}

	//actualiza las respuestas del usuario 
	user_answers = JSON.parse(sitting.user_answers ) 
	
	if(response.clase === 'Multiple Choice Question'){

		//console.log(response.answerMC)
		user_answers[response.id] = response.answerMC
	}else{
		user_answers[response.id] = response.answered
	}
	user_answers = JSON.stringify(user_answers)
	sitting.user_answers = user_answers
	
	//actualiza la lista de preguntas 
	question_list = sitting.question_list
	sitting.question_list = EvaluationsView.remove_first_question(question_list)

	//se actualiza la session 
	sessionStorage.setItem('sitting', JSON.stringify(sitting));	

	$('#question_form').find('input, textarea, button, select').attr('disabled','disabled');
	
	$('#container-check').hide()
	$('#container-continue').fadeIn()

}

//eventos cuando califica una preguna 
EvaluationsView.btn_check = function(form){

	form.submit(function (e) {
			e.preventDefault()
			var quizService = new QuizService();
			var data = ($(e.target).get(0))
			data = $(data).serialize()
			if (data.search('=&') !== -1) {
				data = data.replace('answered=&','')
			};
	
			console.log(data)
			
			if (data.search('answered') !== -1) {
				
				quizService.dispatch(URL_QUALIFY_QUIZ, data, EvaluationsView.render_check)
			}
			else{
				Notify.show_error('', 'Por favor responda la pregunta')
			}
	})
}

//renderiza cuantas preguntas lleva contestadas 
EvaluationsView.current_proggres = function(user_answers, total_questions){
	
	answered = JSON.parse(user_answers)
	answered = Object.keys(answered).length+1
	$('#count_question').text( 'Pregunta: '+answered+'/'+total_questions)
}

//renderiza los puntos actuales 
EvaluationsView.get_current_score = function(current_score){
	
	$('#current_score').text( 'Puntos: '+current_score)
}

// obtiene la pregunta actual 
EvaluationsView.get_first_question = function(question_list){

	question_id = question_list.split(',', 1)
	question_id = question_id[0] 
	//console.log(question_list)

	var quizService = new QuizService();
	console.info(URL_DETAIL_QUESTION)
	quizService.retrieve(URL_DETAIL_QUESTION+question_id+'/', EvaluationsView.render_question)
}

// elimina la pregunta de la lista para seguir con la proxima
EvaluationsView.remove_first_question = function(question_list){

	question_list =  question_list.replace(question_id[0]+',', "");
	return question_list
}

//guarda el estado del quiz una vez temina
EvaluationsView.save_status_quiz = function(sitting){
	
	// retoma la lista de preguntas
	sitting.question_list = sitting.question_order

	//marca el quiz completo 
	sitting.complete = true

	//marca la fecha y hora donde termino 
	fecha = new Date();
	sitting.end = fecha.toJSON()
	
	//guarda todo el estado del quiz 
	sessionStorage.setItem('sitting', JSON.stringify(sitting));	
}

// muestra los resultados
EvaluationsView.redirect_results = function(sitting){
	
	//elimina la session del quiz 
	$.session.remove('sitting');

	// redirige a mostrar los resultados 
	location.href =  Site.geRootUrl()+"/"+slug+"/evaluations/marking/detail/"+sitting.id; 
}

// se ejecuta mientras hace el quiz 
EvaluationsView.take_quiz = function(btn_continue){

	sitting = JSON.parse(sessionStorage.getItem('sitting'))

	question_list = sitting.question_list
	total_questions = sitting.question_order.split(',').length-1

	

	if(sitting.question_list !== "" && sitting.question_list !== ','){

		// trae pregunta 1/n
		EvaluationsView.current_proggres(sitting.user_answers, total_questions)

		// trae la puntuacion actual de usuario 
		EvaluationsView.get_current_score(sitting.current_score)

		// trae la primera pregunta de la lista de preguntas
		EvaluationsView.get_first_question(question_list)	

		btn_continue.click(function (e) {
			e.preventDefault();
			if(sitting.question_list !== ""){		
				location.href =  window.location
			}else{
				//se guarda el resultado final en la session 
				EvaluationsView.save_status_quiz(sitting)

				//se guarda en la BD
				var quizService = new QuizService();
				var url = URL_UPDATE_SITTING.replace(/\%slug%/g, slug);
				console.log(sitting)
				quizService.update2( url+sitting.id+'/', sitting, EvaluationsView.redirect_results)
			}
		})

	}else{

		$('#container-check').hide()
		$('#without_questions').show()

		console.log('hola')
             
	}
}

//---------------
//	MARKING
//---------------

EvaluationsView.get_marking_detail = function(){

	var id = location.pathname.split("/");
	id = id[id.length-1];

	var quizService = new QuizService();
	quizService.retrieve(URL_MARKING_DETAIL_QUIZ+id+'/', EvaluationsView.render_results)
}

EvaluationsView.render_results = function(sitting){
		
	if (sitting.check_if_passed) {
		$('#titulo').text('Examen Aprobado: '+sitting.quiz)
		
	}else{
		$('#titulo').text('Examen Desaprobado '+sitting.quiz)
	}

	$('#result_message').text(sitting.result_message)	
	$('#percent').text(sitting.get_percent_correct+'%')
	$('#score').text(sitting.current_score)
	$('#finish').text(jQuery.timeago(sitting.end))

	
	total_questions = sitting.question_order.split(',').length-1

	answers = sitting.questions_with_user_answers
	//console.log(answers)
	
	user_answers = JSON.parse(sitting.user_answers)

	$.each(answers, function(key, value) {

		var container = document.createElement("tr");
		
		var question = document.createElement("td");
		$(question).text(key)

		var answered = document.createElement("td");
		$(answered).text(value)


		var qualify = document.createElement("td");
		
		// se verifica si es correcta o no la respuesta
		$.each(user_answers, function(k, v) {
			if ( v === value) {
				if (sitting.incorrect_questions.search(k) === -1) {
					$(qualify).text('correcta')
				}else{

					if (sitting.qualify.search(k) === -1) {
						$(qualify).text('incorrecta')	
					}else{
						$(qualify).text('Pendiente a calificar')	
					}
					
				}
			}
		})
	
		//se pega a los contenedores 
		container.appendChild(question);
		container.appendChild(answered);
		container.appendChild(qualify);
		
		$('#list-results').prepend(container);		
	});
}


EvaluationsView.call_render_marking = function(response){

	EvaluationsView.render_marking_quiz($('#list-marking'),response)
}

EvaluationsView.get_all_marking_quiz = function(){

	var quizService = new QuizService();
	var url = URL_MARKING_QUIZ_MODULE.replace(/\%slug%/g, slug);
	//URL_MARKING_QUIZ
	quizService.retrieve(url, EvaluationsView.call_render_marking)
}


EvaluationsView.render_marking_quiz = function(parent_container, response)
{
	///console.log(response)
	for (i = 0; i < response.length; i++) { 		
		
		// se crea el html     		
		var container = document.createElement("tr");
		
		var user = document.createElement("td");
		$(user).text(response[i].user)

		var quiz = document.createElement("td");
		$(quiz).text(response[i].quiz)
				
		var score = document.createElement("td");
		$(score).text(response[i].get_percent_correct)

		var pendientes = document.createElement("td");
		console.log(response[i].qualify)
		preguntas = response[i].qualify
		

		var btn_qualify = document.createElement("td");

		if (preguntas.length > 0) {
			$(pendientes).text('si')
			
			
			content_qualify = document.createElement('a') 
			content_qualify.className = 'btn btn-default'
			$(content_qualify).text('Calificar')
			content_qualify.name = i
			content_qualify.addEventListener('click', function(e){ EvaluationsView.render_change_qualify(response, e.target.name) }, false);
			btn_qualify.appendChild(content_qualify)

		}else{
			$(pendientes).text('no')
		}
		
		//se pega a los contenedores 
		container.appendChild(user);
		container.appendChild(quiz);
		//container.appendChild(complete);
		container.appendChild(score);
		container.appendChild(pendientes)
		container.appendChild(btn_qualify)
		parent_container.prepend(container);
	}
}

EvaluationsView.render_change_qualify = function(response, index){
	sitting = response[index]
	console.log(sitting.qualify)
	preguntas = sitting.qualify
	
	user_answers = JSON.parse(sitting.user_answers)
	answers = sitting.questions_with_user_answers

	title_quiz = document.createElement('h3')
	$(title_quiz).text('Quiz: '+sitting.quiz)
	$(title_quiz).prependTo('#title')

	$.each(answers, function(key, value) {
		$.each(user_answers, function(k, v) {
			if ( v === value) {
				if (sitting.qualify.search(k) !== -1) {
					
					console.log(value)

					var div_question = document.createElement('div')
					div_question.className = 'col-md-12'
					div_question.id = 'request-'+k
					/*
					padding: 5px 5px 35px 5px;
    				border-bottom: 1px solid #ccc;
					*/
					label = document.createElement('h4')
					$(label).text('Pregunta:')
					question = document.createElement('p')
					$(question).text(key)

					label1 = document.createElement('h4')
					$(label1).text('Respuesta de ' + sitting.user)
					answer = document.createElement('p')
					$(answer).text(value)

					label2 = document.createElement('h4')
					$(label2).text('Calificar')
					btn_correct  = document.createElement('button')
					btn_correct  .className = 'btn btn-default'
					btn_correct.name = '#request-'+k
					$(btn_correct).text('correcta')
					$(btn_correct).css('margin-right', '20px')
					btn_correct.addEventListener('click', function(e){ EvaluationsView.change_qualify(sitting, e.target.name, 'correcta') }, false);
					  

					btn_incorrect = document.createElement('button')
					btn_incorrect.className = 'btn btn-default'
					btn_incorrect.name = '#request-'+k
					$(btn_incorrect).text('incorrecta')
					btn_incorrect.addEventListener('click', function(e){ EvaluationsView.change_qualify(sitting, e.target.name, 'incorrecta') }, false);

					div_question.appendChild(label)
					div_question.appendChild(question)
					div_question.appendChild(label1)
					div_question.appendChild(answer)
					div_question.appendChild(label2)
					div_question.appendChild(btn_correct)
					div_question.appendChild(btn_incorrect)
					$('#container_request').prepend(div_question)


				}
			}
		})
	})

	$('#marking').hide()
	$('#container_qualify').show()
}

EvaluationsView.change_qualify = function(sitting, div , qualify){

	id_question = div.split('-')
	id_question = id_question[1]
	console.log(id_question)

	console.log('change_qualify')
	if (qualify === 'correcta') {
		var quizService = new QuizService();
		var data = JSON.parse('{ "id_sitting":'+sitting.id+', "id_question":'+id_question+' }')
		quizService.dispatch(
			URL_CHANGE_QUALIFY_QUIZ ,
			data,
			function(response)
						{
							$(div).fadeOut()
						}
			)

		
	}else{
		console.log('incorrecta')
		$(div).fadeOut()
	};
}