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
			$(author).text("Autor Pendiente")

			//if isAuthor
				var edit = document.createElement("a");
				var edit_msg = document.createElement("span");
				$(edit_msg).text("Editar")
				edit.appendChild(edit_msg);

				edit.addEventListener('click', CommentView.edit, false);

				var del = document.createElement("button");
				var del_msg = document.createElement("span");
				$(del_msg).text('x');
				del.appendChild(del_msg);
				del.addEventListener('click', CommentView.remove, false);

				$(container).append(del)
			//end if isAuthor


			
			//se pega a los contenedores 
			link.appendChild(author);
			container.appendChild(link);
			container.appendChild(text);
			container.appendChild(edit);
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
	var id = $(e.target).parents('.comments').attr("id");
	var splited = id.split('-');
	id = splited[splited.length-1];

	CommentService.delete_($(e.target).parents('.comments'), URL_CREATE_COMMENT+id, CommentView.delete);
}
