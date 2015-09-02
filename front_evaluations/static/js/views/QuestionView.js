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
