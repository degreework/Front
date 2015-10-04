var CommentView = function (thread, form, container, container_load_more) {
	this.thread = thread;
	this.form = form;
	this.form_edit = $(form).clone();
	this.container_list = container;
	this.container_load_more = container_load_more;

	/*para mostar el link para comentar*/
	this.container_show_comment = document.createElement("a");
	this.container_show_comment.text = "Comentar";
};

/*
*
* Callbacks
*
*/

CommentView.prototype.load = function()
{
	var self = this;
	var url = URL_GET_COMMENTS.replace(/\%thread%/g, this.thread);
	
	CommentService.get_Comments(
		url,
		function(response){		
			self.append_comment(response.results)
			self.there_are_more_comments(response.count, response.next, response.previus);
		}
	);
	
	//set listener to link to load more comments
	this.container_load_more.find("a").click(function(e){
		e.preventDefault();
		CommentService.get_Comments(
			self.next,
			function(response){
				self.append_comment(response.results)
				self.there_are_more_comments(
					response.count,
					response.next,
					response.previus);
			}
		);
	});
}

CommentView.prototype.append_comment = function(response)
{
	console.log("CommentView:append")
	console.log(response)
	/*
	*append a list of comments (or only one)
	*/
	for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			container.className = 'comments';
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', UserView.getUrl(response[i].author.id));
			container.id = 'cmt-'+id;
			var text = document.createElement("p");
			var author = document.createElement("span");

			
			//se asigna el texto 
			$(text).text(response[i].text+"")
			$(author).text(response[i].author.name)

			//if isAuthor
			if (response[i].author.id == User.get_id())
			{
				this.appentOptions(container)		
			}
			//se pega a los contenedores 
			link.appendChild(author);
			container.appendChild(link);
			container.appendChild(text);
			//container.appendChild(document.createElement("hr"));
			
			$(this.container_list).append(container);
		}
}

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

/*
*
* EVENTS HANDLERS 
*
*/

CommentView.prototype.handler_edit = function(e)
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
	
	//this.load_create_comment(target_id)
	//var new_form = $(this.form).clone()
	var new_form = this.form_edit.clone();
	/*create_form(URL_CREATE_COMMENT, new_form, 'OPTIONS', function(){
		$(new_form.find("#id_parent")[0]).attr('value', target_id);
		$(new_form.find("#id_parent")[0]).hide()

		$(new_form.find("#id_text")[0]).val(current_comment);
	});*/

	$(new_form).attr('id', 'edit_comment_form_'+target_id);

	$(new_form).appendTo('#'+target_id);
	//set current content of comment to form
	$($("#edit_comment_form_"+target_id+" input")[0]).val(current_comment);
	//show form
	$(new_form).fadeIn()

	new_form.submit(function(e)
		{
			e.preventDefault();
			var splited = e.target.id.split('-');
			var id = splited[splited.length-1]
			CommentService.update(e.target, URL_CREATE_COMMENT+id, CommentView.updated);
		});
}

CommentView.remove = function(e)
{
	/*
	* when x (button) is clicked then call to Service to remove
	*/

	notify = Notify.show_confirm('el comentario');

	$('#erase').click(function(){
		// se obtiene el id del comentario para colocarlo en la url 
		var id = $(e.target).parents('.comments').attr("id");
		var splited = id.split('-');
		id = splited[splited.length-1];

		CommentService.delete_(
			$(e.target).parents('.comments'),
			URL_CREATE_COMMENT+id,
			function(response, div)
			{
				div.fadeOut();
			});
		notify.close()	
	})

	$('#cancel').click(function(){
		
		notify.close()
	
	})
}

CommentView.prototype.load_create_comment = function (parent) {
	var form = this.form;
	
	var container_parent = $(form).parent();

	
	this.container_show_comment.id = $(form).attr('id');

	container_parent.append(this.container_show_comment);
	
	this.container_show_comment.addEventListener("click", function(e){
		$(e.target).fadeOut();
		$(form).fadeIn();

	});

	
	$(form.find("#id_parent")[0]).attr('value', parent);
	//

	var self = this;
	
	form.submit(function(e){
		console.log("submit")
		e.preventDefault();

			CommentService.create(
				$(e.target),
				URL_CREATE_COMMENT,
				function(response)
				{
					self.append_comment(response);
					$(e.target).fadeOut();
					$(self.container_show_comment).fadeIn()
				}
			);

			//$(e.target).parent().fadeOut("slow");
			//$(e.target).parents().find('.link_comment').fadeIn('slow');
		});
}


CommentView.prototype.appentOptions = function(div_contenedor){

	// div del desplegable 
	var div_dropdown = document.createElement("div");
	div_dropdown.className = "dropdown pull-right";

	// donde va el icono  despliega el menu 
	var div_dropdow_toggle = document.createElement("div");
	div_dropdow_toggle.className = "dropdown-toggle"
		$(div_dropdow_toggle).attr('type', 'button')
		$(div_dropdow_toggle).attr('id', 'dropdownMenu2')
		$(div_dropdow_toggle).attr('data-toggle', 'dropdown')
		$(div_dropdow_toggle).attr('aria-expanded', 'true')

	//icono
	var icon = document.createElement('span')
	icon.className = 'glyphicon glyphicon-cog' 

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
	edit_msg.className = "glyphicon glyphicon-edit"
	$(edit_msg).text(' editar')
	edit.appendChild(edit_msg);
	var self = this;
	edit.addEventListener(
		'click',
		function(e){

			self.handler_edit(e);
		},
		false);

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

CommentView.prototype.there_are_more_comments = function (count, next, previus) {
	//show link to load more answer
	var self = this;
	if(next)
	{
		self.next = next;
		self.container_load_more.show();
	}
	else
	{
		self.container_load_more.hide();
	}

}