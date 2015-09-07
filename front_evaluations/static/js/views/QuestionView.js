//---------------
// QUESTIONS
//---------------

EvaluationsView.create_essay = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			
			var questionService = new QuestionService();
			var data = new FormData(($(e.target).get(0)));
			questionService.create(URL_CREATE_QUESTION_ESSAY, data, EvaluationsView.notifify_create_question)
	})
	
}

EvaluationsView.create_mc = function(form)
{
	form.submit(function (e) {
			e.preventDefault();

			var questionService = new QuestionService();
			var form = EvaluationsView.change_boolean(($(e.target).get(0)))
			var data = new FormData(form);
			questionService.create(URL_CREATE_QUESTION_MC, data, EvaluationsView.notifify_create_question)
	})
	
}

EvaluationsView.create_tf = function(form)
{
	form.submit(function (e) {
			e.preventDefault();

			var questionService = new QuestionService();
			var form = EvaluationsView.change_boolean(($(e.target).get(0)))
			var data = new FormData(form);
			questionService.create(URL_CREATE_QUESTION_TF, data, EvaluationsView.notifify_create_question)
	})
	
}

EvaluationsView.notifify_create_question = function(){
	Notify.show_success("question create", "the question was create succesful");
}


EvaluationsView.get_all_TFQuestions = function()
{
	var questionService = new QuestionService();
	questionService.list(URL_GET_ALL_QUESTION_TF, EvaluationsView.call_render_questions)	
}

EvaluationsView.get_all_MCQuestions = function()
{
	var questionService = new QuestionService();
	questionService.list(URL_GET_ALL_QUESTION_MC, EvaluationsView.call_render_questions)	
}

EvaluationsView.get_all_EQuestions = function()
{
	var questionService = new QuestionService();
	questionService.list(URL_GET_ALL_QUESTION_ESSAY, EvaluationsView.call_render_questions)	
}

EvaluationsView.call_render_questions = function (response)
{	
	//console.log(response[0].clase)
	if (response[0].clase === 'True/False Question') {
		//console.log('entro')
		EvaluationsView.render_list_questions($('#list-tfquestion'), response);
	};

	if (response[0].clase === 'Essay style question') {
		EvaluationsView.render_list_questions($('#list-equestion'), response);
	};

	if (response[0].clase === 'Multiple Choice Question') {
		EvaluationsView.render_list_questions($('#list-mcquestion'), response);
	};
}

EvaluationsView.render_list_questions = function(parent_container, response)
{
	
	for (i = response.length-1; i >= 0; i--) { 

		var container = document.createElement("tr");
		container.className = 'row_question-'+i
		
		//var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var content = document.createElement("td");
		$(content).text(response[i].content)


		var category = document.createElement("td");
		$(category).text(response[i].category.nombre)

		var subcategory = document.createElement("td");
		$(subcategory).text(response[i].sub_category.nombre)


		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i
		icon.id = response[i].clase
		
		link.addEventListener('click', function(e){ EvaluationsView.handle_edit(response, e.target.name, e.target.id) }, false);


		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'
		icon2.name = i
		icon2.id = response[i].clase


		link2.appendChild(icon2)
		col_del.appendChild(link2)

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(content);
		container.appendChild(category);
		container.appendChild(subcategory);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);	
		link2.addEventListener('click', function(e){ EvaluationsView.handle_delete(response, e.target.name, e.target.id, $(e.target).parents('.row_question-'+e.target.name)) }, false);	
	}
}

EvaluationsView.show_table_questions = function(){
	$('#Essay').click(function(){
				$('#table-essay').show()
				$('#table-tf').hide()
				$('#table-mc').hide()

				$('#show_').show()
				$('#edit_tf').hide()
				$('#edit_mc').hide()
				$('#edit_e').hide()
			})

			$('#TF').click(function(){
				$('#table-essay').hide()
				$('#table-tf').show()
				$('#table-mc').hide()

				$('#show_').show()
				$('#edit_tf').hide()
				$('#edit_mc').hide()
				$('#edit_e').hide()
			})

			$('#MC').click(function(){
				$('#table-essay').hide()
				$('#table-tf').hide()
				$('#table-mc').show()

				$('#show_').show()
				$('#edit_tf').hide()
				$('#edit_mc').hide()
				$('#edit_e').hide()
			})
}


EvaluationsView.update_question = function(form, id)
{
	form.submit(function (e) {
			e.preventDefault();

			var questionService = new QuestionService();

			console.log(e.target.id)
			if (e.target.id === 'form_update_tf') {
				
				var form = EvaluationsView.change_boolean(($(e.target).get(0)))
				var data = new FormData(form);
				questionService.update(URL_UPDATE_QUESTION_TF+id+'/', data, EvaluationsView.update_tf )
			}

			if (e.target.id === 'form_update_mc') {
				
				var form = EvaluationsView.change_boolean(($(e.target).get(0)))
				var data = new FormData(form);
				questionService.update(URL_UPDATE_QUESTION_MC+id+'/', data, EvaluationsView.update_mc)	
				
			}

			if (e.target.id === 'form_update_e') {
	
				var data = new FormData(($(e.target).get(0)));
				questionService.update(URL_UPDATE_QUESTION_ESSAY+id+'/', data,  EvaluationsView.update_e)	
				
			}
	})
}

EvaluationsView.update_tf = function(response){
	$('#edit_tf').hide()
	$('#list-tfquestion').empty()
	EvaluationsView.get_all_TFQuestions();
	$('#show_').show()
	$('#table-tf').show()
}

EvaluationsView.update_e = function(response){
	$('#edit_e').hide()
	$('#list-equestion').empty()
	EvaluationsView.get_all_EQuestions(); 
	$('#show_').show()
	$('#table-essay').show()
	
}

EvaluationsView.update_mc = function(response){
	$('#edit_mc').hide()
	$('#list-mcquestion').empty()
	EvaluationsView.get_all_MCQuestions();
	$('#show_').show()
	$('#table-mc').show()
}