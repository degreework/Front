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

EvaluationsView.render_parametros = function(form, response){

	$.each(response, function(key, value) {	
			
			if (value === true) { 
				$('#id_'+key).prop("checked", true);
			}else{
				$('#id_'+key).attr('value', value);	
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
	
}

EvaluationsView.handle_edit = function(response, index, tipo){
	
	$('#edit_').fadeIn()
	$('#show_').hide()	
	response = response[index]
	
	//console.log('tipo= '+ tipo)

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
	//console.log('entro')
	location.href =  host+":"+location.port+"/evaluations/subcategory"; 
}


EvaluationsView.handle_delete = function(response, index, tipo, row){
	//console.log('handle_delete')
	//console.log(response)
	
	response = response[index]
	notify = Notify.show_confirm('la '+ tipo);

	//console.log(row)
	var id = response.id

	$('#erase').click(function(){
		
		
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
		$(title_category).text(response[i].category)

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


