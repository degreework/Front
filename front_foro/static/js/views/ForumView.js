var ForumView = {};

ForumView.updated = function (response, form)
{
	/*
	* - set new content
	* - remove form
	* - show div
	*/
	


	var parent = $(form).parents('.response');
	var parent_id = parent.attr("id");
	$("#textAnswer").text(response.text);
	$(form).remove();
	$(parent).children().show();
}

ForumView.delete = function(response, div)
{
	/*
	*remove comment's div
	*/
	div.fadeOut();
}


ForumView.removeAnswer = function(e)
{
	/*
	* when x (button) is clicked then call to Service to remove
	*/
	var id = $(e.target).parents('.response').attr("id");
	var splited = id.split('-');
	id = splited[splited.length-1];
	ForumService.delete_answer($(e.target).parents('.response'), URL_CREATE_ANSWER_FORO+id, CommentView.delete);
}

ForumView.callUpdate = function(e)
{
	e.preventDefault();
	var splited = e.target.id.split('-');
	var id = splited[splited.length-1]
	console.log(id)
	ForumService.updateAnswer(e.target, URL_CREATE_ANSWER_FORO+id, CommentView.updated);
}


ForumView.editAnswer = function(e)
{
	/*
	*when edit (a tag) is clicked, do many things here like create form and set an event handler
	*/
	//get div parent
	var parent = $(e.target).parents('.response');
	//get id from div parent
	var target_id = parent.attr("id");
	//get content of current comment
	var current_answer = $("#textAnswer").text();
	console.log("current_answer: "+ current_answer)
	//remove all elements of parent
	$(parent).children().hide();

	//change comment form location
	var new_form = $("#form_answer_foro").clone()
	$(new_form).attr('id', 'edit_answer_form_'+target_id);

	$(new_form).appendTo('#'+target_id);
	//set current content of comment to form
	$($("#form_answer_foro_"+target_id+" input")[0]).val(current_answer);
	//$('#editor').markdownEditor('content').text(current_answer)
	//show form
	$(new_form).fadeIn()

	/**/

	

	new_form.submit(ForumView.callUpdate);
}


ForumView.appentOptions = function(div_contenedor){

	console.log("appentOptions")
	// div del desplegable 
	var div_dropdown = document.createElement("div");
	div_dropdown.className = "dropdown pull-right"

	// donde va el icono  despliega el menu 
	var div_dropdow_toggle = document.createElement("div");
	div_dropdow_toggle.className = "dropdown-toggle"
		$(div_dropdow_toggle).attr('type', 'button')
		$(div_dropdow_toggle).attr('id', 'dropdownMenu2')
		$(div_dropdow_toggle).attr('data-toggle', 'dropdown')
		$(div_dropdow_toggle).attr('aria-expanded', 'true')

	//icono
	var icon = document.createElement('span')
	icon.className = 'glyphicon glyphicon-triangle-bottom' 

	div_dropdow_toggle.appendChild(icon)

	//donde va el menu 
	var dropdown_menu = document.createElement("ul");
	dropdown_menu.className = 'dropdown-menu arrow-top'
		$(dropdown_menu).attr('role', 'menu')
		$(dropdown_menu).attr('aria-labelledby', 'dropdownMenu2')

	//editar answer
	var item1 = document.createElement("li");
	
	var edit = document.createElement("a");
	var edit_msg = document.createElement("span");
	edit_msg.className = "glyphicon glyphicon-pencil"
	$(edit_msg).text(' editar')
	edit.appendChild(edit_msg);
	edit.addEventListener('click', ForumView.editAnswer, false);

	item1.appendChild(edit)
	//eliminar answer
	var item2 = document.createElement("li");

	var del = document.createElement("a");
	var del_msg = document.createElement("span");
	del_msg.className = 'glyphicon glyphicon-remove'
	$(del_msg).text(' eliminar')
	del.appendChild(del_msg);
	del.addEventListener('click', ForumView.removeAnswer, false);
	
	item2.appendChild(del)

	dropdown_menu.appendChild(item1)
	dropdown_menu.appendChild(item2)


	div_dropdown.appendChild(div_dropdow_toggle)
	div_dropdown.appendChild(dropdown_menu)

	div_contenedor.appendChild(div_dropdown)


}