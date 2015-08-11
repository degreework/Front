var EvaluationsView = {};

//inicializa los formularios 
EvaluationsView.initialize = function(form, url)
{
	
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
		'OPTIONS'
	);

	debug_info("3.4 - Show form")
	EvaluationsView.form_create.show();

}

// cambia el valor de ON por un True en un campo tipo boolean 
EvaluationsView.change_boolean = function(formSerialized){

	number = formSerialized.split('=on').length-1
	
	for (i = 0; i < number; i++) {
		formSerialized = formSerialized.replace('=on','=True')
	}
	return formSerialized
}


//---------------
// QUESTIONS
//---------------

EvaluationsView.create_essay = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			EvaluationsService.create_question(form,URL_CREATE_QUESTION_ESSAY);
	})
	
}

EvaluationsView.create_mc = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			EvaluationsService.create_question(form, URL_CREATE_QUESTION_MC);;
	})
	
}

EvaluationsView.create_tf = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			EvaluationsService.create_question(form, URL_CREATE_QUESTION_TF);
	})
	
}

EvaluationsView.notifify_create_question = function(){
	Notify.show_success("question create", "the question was create succesful");
}

//---------------
// CATEGORY
//---------------
EvaluationsView.create_category = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			EvaluationsService.create_category(form, URL_CREATE_CATEGORY);
	})
	
}

EvaluationsView.get_all_Categories = function()
{
	EvaluationsService.get_list_categories(URL_GET_ALL_CATEGORY, EvaluationsView.render_all_categories);
}

EvaluationsView.render_all_categories = function (response)
{	
	EvaluationsView.render_list_categories($('#list-categories'), response);
}

EvaluationsView.render_list_categories = function(parent_container, response)
{
	for (i = 0; i < response.length; i++) { 

		var container = document.createElement("tr");
		
		var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text('1')

		var title_category = document.createElement("td");
		$(title_category).text(response[i].category)


		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'


		//$(link).attr('href', host+":"+location.port+"/evaluations/detail/"+id);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'


		//$(link2).attr('href', host+":"+location.port+"/evaluations/detail/"+id);
		link2.appendChild(icon2)
		col_del.appendChild(link2)

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_category);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);		
	}
}

EvaluationsView.create_subcategory = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			EvaluationsService.create_category(form,URL_CREATE_SUBCATEGORY);
	})
	
}

EvaluationsView.get_all_subCategories = function()
{
	EvaluationsService.get_list_categories(URL_GET_ALL_SUBCATEGORY, EvaluationsView.render_all_subcategories);
}

EvaluationsView.render_all_subcategories = function (response)
{	
	EvaluationsView.render_list_subcategories($('#list-subcategories'), response);
}

EvaluationsView.render_list_subcategories = function(parent_container, response)
{
	for (i = 0; i < response.length; i++) { 

		var container = document.createElement("tr");
		
		var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text('1')

		var title_subcategory = document.createElement("td");
		$(title_subcategory).text(response[i].sub_category)

		var title_category = document.createElement("td");
		$(title_category).text(response[i].category)

		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'


		//$(link).attr('href', host+":"+location.port+"/evaluations/detail/"+id);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'


		//$(link2).attr('href', host+":"+location.port+"/evaluations/detail/"+id);
		link2.appendChild(icon2)
		col_del.appendChild(link2)

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_subcategory);
		container.appendChild(title_category);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);		
	}
}

EvaluationsView.notifify_create_category = function(){
	Notify.show_success("create", "it was create succesful");
}

//---------------
// QUIZ
//---------------
EvaluationsView.create_quiz = function(form)
{
	form.submit(function (e) {
			e.preventDefault();
			EvaluationsService.create_quiz(form, URL_CREATE_QUIZ);
	})
	
}

EvaluationsView.notifify_create_quiz = function(){
	Notify.show_success("quiz create", "the quiz was create succesful");
}


EvaluationsView.get_all_Quiz = function()
{
	EvaluationsService.get_list_quiz(URL_GET_ALL_QUIZ, EvaluationsView.render_all_quiz);
}

EvaluationsView.render_all_quiz = function (response)
{	
	EvaluationsView.render_list_quiz($('#list-quiz'), response);
}

EvaluationsView.render_list_quiz = function(parent_container, response)
{
	for (i = 0; i < response.length; i++) { 		
		
		// se crea el html     		
		var container = document.createElement("tr");
		
		var number = document.createElement("td");
		$(number).text('1')

		var title_quiz = document.createElement("td");
		$(title_quiz).text(response[i].title)


		var col_link = document.createElement("td");
		var link = document.createElement("a");
		var id = response[i].id;
		console.log(id)
		$(link).attr('href', host+":"+location.port+"/evaluations/detail/"+id);
		$(link).text('ver detalles')
		col_link.appendChild(link)
		
		

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_quiz);
		container.appendChild(col_link);
		
		parent_container.prepend(container);
	}
}


EvaluationsView.get_Quiz = function(){
	
	var id = location.pathname.split("/");
	id = id[id.length-1];
	console.log(id)
	EvaluationsService.get_quiz(URL_DETAIL_QUIZ+id+'/', EvaluationsView.render_quiz);
}


EvaluationsView.render_quiz = function(response){
	console.log('render_quiz')
	console.log(response)
	$('.titulos').text(response.title)
	$('.category').text('Categoria: '+response.category)
	$('.description').text('Descripción: '+response.description)
}