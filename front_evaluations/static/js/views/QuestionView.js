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
	console.log(response[0].clase)
	if (response[0].clase === 'True/False Question') {
		console.log('entro')
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
		
		//var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var content = document.createElement("td");
		$(content).text(response[i].content)


		var category = document.createElement("td");
		$(category).text(response[i].category)

		var subcategory = document.createElement("td");
		$(subcategory).text(response[i].sub_category)


		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'


		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'


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
	}
}
