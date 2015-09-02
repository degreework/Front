//---------------
// CATEGORY
//---------------
EvaluationsView.create_category = function(form)
{
	form.submit(function (e) {
			e.preventDefault();

			var questionService = new QuestionService();
			var data = new FormData(($(e.target).get(0)));
			questionService.create(URL_CREATE_CATEGORY, data, EvaluationsView.notifify_create_question)
	})
	
}

EvaluationsView.get_all_Categories = function()
{
	var categoryService = new CategoryService();
	categoryService.retrieve(URL_GET_ALL_CATEGORY, EvaluationsView.render_all_categories)	
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

			var questionService = new QuestionService();
			var data = new FormData(($(e.target).get(0)));
			questionService.create(URL_CREATE_SUBCATEGORY, data, EvaluationsView.notifify_create_question)
	})
	
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
