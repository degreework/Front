var CommentView = {};

/*
*
* Callbacks
*
*/


CommentView.updated = function (response, form)
{
	/*
	* - set new content
	* - remove form
	* - show div
	*/
	var parent = $(form).parents('.comments');
	var parent_id = parent.attr("id");
	$("#"+parent_id+">p").text(response.text);
	$(form).remove();
	$(parent).children().show();
}

CommentView.delete = function(response, div)
{
	/*
	*remove comment's div
	*/
	div.fadeOut();
}


CommentView.append_comment = function(response)
{
	/*
	*append a list of comments (or only one)
	*/
	for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			container.className = 'comments';
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', "url_del_perfil_del_autor");
			container.id = 'cmt-'+id;
			var text = document.createElement("p");
			var author = document.createElement("span");

			
			//se asigna el texto 
			$(text).text(response[i].text+"")
			$(author).text(response[i].author)

			//if isAuthor
			CommentView.appentOptions(container)
				
			//se pega a los contenedores 
			link.appendChild(author);
			container.appendChild(link);
			container.appendChild(text);
			//container.appendChild(document.createElement("hr"));
			

			$('#list-comment').append(container);
		}
}


/*
*
* EVENTS HANDLERS 
*
*/

CommentView.callUpdate = function(e)
{
	e.preventDefault();
	var splited = e.target.id.split('-');
	var id = splited[splited.length-1]
	CommentService.update(e.target, URL_CREATE_COMMENT+id, CommentView.updated);
}

CommentView.edit = function(e)
{
	/*
	*when edit (a tag) is clicked, do many things here like create form and set an event handler
	*/
	//get div parent
	var parent = $(e.target).parents('.comments');
	//get id from div parent
	var target_id = parent.attr("id");
	//get content of current comment
	var current_comment = $("#"+target_id+">p").text();
	//remove all elements of parent
	$(parent).children().hide();

	//change comment form location
	var new_form = $("#form-comment").clone()
	$(new_form).attr('id', 'edit_comment_form_'+target_id);

	$(new_form).appendTo('#'+target_id);
	//set current content of comment to form
	$($("#edit_comment_form_"+target_id+" input")[0]).val(current_comment);
	//show form
	$(new_form).fadeIn()

	new_form.submit(CommentView.callUpdate);
}

CommentView.remove = function(e)
{
	/*
	* when x (button) is clicked then call to Service to remove
	*/

	notify = Notify.show_confirm('comentario');

	$('#erase').click(function(){
		// se obtiene el id del comentario para colocarlo en la url 
		var id = $(e.target).parents('.comments').attr("id");
		var splited = id.split('-');
		id = splited[splited.length-1];

		CommentService.delete_($(e.target).parents('.comments'), URL_CREATE_COMMENT+id, CommentView.delete);
		notify.close()	
	})

	$('#cancel').click(function(){
		
		notify.close()
	
	})
}


CommentView.appentOptions = function(div_contenedor){

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
	edit.addEventListener('click', CommentView.edit, false);

	item1.appendChild(edit)
	//eliminar answer
	var item2 = document.createElement("li");

	var del = document.createElement("a");
	var del_msg = document.createElement("span");
	del_msg.className = 'glyphicon glyphicon-remove'
	$(del_msg).text(' eliminar')
	del.appendChild(del_msg);
	del.addEventListener('click', CommentView.remove, false);
	
	item2.appendChild(del)

	dropdown_menu.appendChild(item1)
	dropdown_menu.appendChild(item2)


	div_dropdown.appendChild(div_dropdow_toggle)
	div_dropdown.appendChild(dropdown_menu)

	div_contenedor.appendChild(div_dropdown)


}
