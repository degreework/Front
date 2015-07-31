var ForumView = {};

// -------------------
// :::: ASKS ::::
// -------------------

ForumView.initialize = function(form, editor)
{
	
	ForumView.form_create = form;
	ForumView.editor = editor;

	create_form(
		URL_CREATE_ASK_FORO,
		ForumView.form_create,
		'OPTIONS',
		ForumView.succes_create_form
	);

	

	ForumView.form_create.submit(function (e) {
		e.preventDefault();
		ForumService.create_ask(ForumView.form_create, URL_CREATE_ASK_FORO);
	})
}

ForumView.succes_create_form = function()
{
	MarkupEditor.load(ForumView.editor);

	
	ForumView.hidde_input_text($("#id_text"));

	//4 - Show form
	debug_info("3.4 - Show form")
	ForumView.form_create.show();
	fill();
}

ForumView.hidde_input_text = function(input)
{
	//set listener
	//append editor content to raw input
	
	$('textarea').keyup(function(e){
		$(input).val(ForumView.editor.val());
    });
	input.hide();

}

ForumView.create_ask_succes = function(response){
	location.href =  host+":"+location.port+"/forum/detail/"+response.id
	form.trigger("reset");
	Notify.show_success("OK", "Pregunta creada");
}

function fill(){
	//get content of current comment
	var current_question = $(".ask_summary").text();
	var current_title = $(".ask_title").text();
	
	var input = $("#form_ask_edit_foro").find('#id_title')[0]; $(input).val(current_title)
	var input = $("#form_ask_edit_foro").find('#id_text')[0]; $(input).val(current_question)
	$('#id_textarea_ask').text(current_question)

} 
ForumView.edit_ask = function(e){
	
	/*
	*when edit (a tag) is clicked, do many things here like create form and set an event handler
	*/
	//get div parent
	var parent = $('.content_ask');
	
	//get id from div parent
	var target_id = parent.attr("id");
	$(".ask_title").text('edita tu respuesta');

	//remove all elements of parent
	$(parent).children().hide();

	//change comment form location
	ForumView.initialize($("#form_ask_edit_foro"), $("#id_textarea_ask"));

	new_form = $('#form_ask_edit_foro')	

	//Se obtiene el id de la pregunta para pasarlo en el formulario 
	var id_ask = location.pathname.split("/");
	id_ask = id_ask[id_ask.length-1];

	
	// se llena el formulario q esta escondido :) 
	//ForumView.handle(new_form, id_ask)
	/**/
	new_form.submit(ForumView.callUpdateAsk);

}

ForumView.callUpdateAsk = function(e)
{
	// se obtiene el id de la respuesta para colocarlo en la url 
	e.preventDefault();
	var splited = e.target.id.split('-');
	var id = splited[splited.length-1]

	ForumService.updateAsk(e.target, URL_CREATE_ASK_FORO+id, ForumView.updated_ask);
}


ForumView.render_list_ask = function(response){
	// se pasa a arreglo la respuesta 
		//

		response = response.results;
		for (i = 0; i < response.length; i++) { 
			
			// se crea el html     		
			var container = document.createElement("div");
			container.className = 'question';
			var link = document.createElement("a");
			var id = response[i].id;
			$(link).attr('href', host+":"+location.port+"/forum/detail/"+id);
			var titles = document.createElement("h3");
			var summarys = document.createElement("span");
			//summarys.className = 'pull-right';
			var author = document.createElement("span");
			var count = document.createElement("span");
			count.className= "count-answer pull-right number_answer";

			
			//se asigna el texto 
			$(count).text('Respuestas: '+ response[i].count)
			$(titles).text(response[i].title)
			$(summarys).text(jQuery.timeago(response[i].added_at))
			$(author).text(response[i].author+', ')
			
			//se pega a los contenedores 
			author.appendChild(summarys)
			link.appendChild(titles);
			container.appendChild(link);
			//container.appendChild(summarys);
			container.appendChild(author);
			container.appendChild(count);
			
			$('.asks').prepend(container);
		}
}


ForumView.render_ask_detail = function(response){
	
	$('.ask_title').text(response.title);
	
	//buttom edit and event
	var edit = document.createElement("a");
	edit.className = "pull-right"
	var edit_msg = document.createElement("span");
	edit_msg.className = "glyphicon glyphicon-edit"
	edit.appendChild(edit_msg);
	edit.addEventListener('click', ForumView.edit_ask, false);
	$('.ask_title').append(edit)

	var id = response.id;
	console.log(id)
	$('.content_ask').attr('id','a-'+id)

	$('.ask_summary').html(markdown.toHTML(response.text));
	$('.ask_added_at').text(jQuery.timeago(response.added_at));
	$('.ask_author').text(response.author);
	$('.ask_author_link').attr('href', "autor_link");
}



// -------------------
// :::: ANSWERS ::::
// -------------------
ForumView.create_comment_answer = function(e){
			e.preventDefault();
			console.log($(e.target))
			CommentService.create(
				$(e.target),
				URL_CREATE_COMMENT,
				CommentView.append_comment
				);
			$(e.target).parent().fadeOut("slow");
			//link.fadeIn("slow");

}




ForumView.handle = function(new_form){
	var input_text = $(new_form).get(0)[0];
	
	$(new_form).keyup(function(e){
		$(input_text).val($(e.target).val())
		//console.log($(input_text).val())
	});
}

ForumView.show_form_comment_in_answer = function(e){
	
	// se obtine el id de la pregunta donde estan los comentarios 
	var id = $(e.target).attr("id");
	var id = id.split('-');
	id = id[id.length-1];

	//se oculta el boton de 
	 var link = $(e.target)
	 link.fadeOut("slow")
	
	//se clona el formulario y se muestra
	form = $(e.target).parents('.response').find('#form-comment-ans-'+id)
	var new_form = $("#form-comment").clone()
	$(new_form).attr('id', '#form-comment-ans-'+id);
	$(new_form).appendTo('.form-comment-ans-'+id);
	$(new_form).fadeIn()
	ForumView.handle(new_form)
	//aqui servicio agregar comentario
	new_form.submit(ForumView.create_comment_answer);
	
}



ForumView.append_answer_to_ask = function(response, div_container)
{
	for (i = 0; i < response.length; i++) { 
		
		// se crea el html     		
		var container = document.createElement("div");
		container.className = 'col-md-12 response';
		var id = response[i].id;
		container.id = 'ans-'+id;

		
		//informacion de la persona q creo la respuesta
		var info_user = document.createElement("div");
		info_user.className = "col-md-2";
		var link = document.createElement("a");
		var date = document.createElement("p");
		var autor = document.createElement("p");
		
		$(autor).text(response[i].author)
		$(date).text(""+jQuery.timeago(response[i].added_at))

		// opciones editar y eliminar 
		var options = document.createElement("div");
		options.className = "col-md-1";

		link.appendChild(autor);
		info_user.appendChild(link);
		info_user.appendChild(date);
		ForumView.appentOptions(options)
	
		//repuesta como tal 
		var summarys = document.createElement("div");
		summarys.className = "col-md-9"
		

		content_summary = document.createElement("div");
		content_summary.className = "col-md-12"
		content_summary.id = "textAnswer-ans-"+id
		$(content_summary).html(markdown.toHTML(response[i].text))
		summarys.appendChild(content_summary)	

		//comentarios 
		var div_comments = document.createElement("div");
		div_comments.className = "col-md-10 col-sm-offset-1"
		
		// contenedor para listar los comentarios 
			var list_comments = document.createElement("div");
			$(list_comments).attr('id', 'list-comment')
		
		// contenedor para el "ver mas" de los comentarios 
			var div_load_comments = document.createElement("div");
			var load_comments = document.createElement("span");
			load_comments.className = 'load-comment'
			div_load_comments.appendChild(load_comments)

		div_comments.appendChild(list_comments)
		div_comments.appendChild(div_load_comments)
		summarys.appendChild(div_comments)
		

		//enlace para comentar 
		var div_link_comment = document.createElement("div");
		div_link_comment.className = "col-md-10 col-sm-offset-1 link_comment"
			var link_comment = document.createElement("a");
			link_comment.className = "btn-create pull-right"
			$(link_comment).attr('id', 'a-comment-ans-'+id)
			$(link_comment).text("agrega un comentario")
			link_comment.addEventListener('click', ForumView.show_form_comment_in_answer, false);
		div_link_comment.appendChild(link_comment)

		summarys.appendChild(div_link_comment)

		//formulario para comentar 
		var div_form_comment = document.createElement("div");
		div_form_comment.className = "col-md-10 col-sm-offset-1 form-comment-ans-"+id
		
		summarys.appendChild(div_form_comment)

		//se pega a los contenedores 
		container.appendChild(summarys);
		container.appendChild(info_user);
		container.appendChild(options);


		$(div_container).append(container);

	}

}

//update answer
ForumView.updated_answer = function (response, form)
{
	/*
	* - set new content
	* - remove form
	* - show div
	*/
	var parent = $(form).parents('.response');
	var parent_id = parent.attr("id");
	$("#textAnswer-ans-"+response.id+">p").text(response.text);
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
	notify = Notify.show_confirm('respuesta');

	$('#erase').click(function(){
		// se obtiene el id de la respuesta para colocarlo en la url 
		var id = $(e.target).parents('.response').attr("id");
		var splited = id.split('-');
		id = splited[splited.length-1];

		ForumService.delete_answer($(e.target).parents('.response'), URL_CREATE_ANSWER_FORO+id, CommentView.delete);	
		notify.close()	
	})

	$('#cancel').click(function(){
		
		notify.close()
	
	})
}

ForumView.callUpdateAnswer = function(e)
{
	// se obtiene el id de la respuesta para colocarlo en la url 
	e.preventDefault();
	var splited = e.target.id.split('-');
	var id = splited[splited.length-1]

	//$("#id_ask").val(id_ask),

	ForumService.updateAnswer(e.target, URL_CREATE_ANSWER_FORO+id, ForumView.updated_answer);
}

ForumView.handleAnswer = function (form, id_ask){

	
	var input_ask = $(form).get(0)[0];
	
	$(input_ask).hide();
	$(input_ask).val(id_ask);


	var input_text = $(form).get(0)[1];
	$(input_text).hide()
	$('textarea').keyup(function(e){
	$(input_text).val($(e.target).val())
	});

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
	console.log(target_id)
	//get content of current comment
	var current_answer = $("#textAnswer-"+target_id+">p").text();
	//remove all elements of parent
	$(parent).children().hide();

	//change comment form location
	var new_form = $("#form_answer_foro").clone()
	$(new_form).attr('id', 'edit_answer_form_'+target_id);
	
	$(new_form).appendTo('#'+target_id);
	//set current content of comment to form
	$($("#form_answer_foro_"+target_id+" input")[0]).val(current_answer);
	$('#id_textarea').attr('id','textarea-'+target_id)
	$('#textarea-'+target_id).text(current_answer)
	//show form
	$(new_form).fadeIn()

	//Se obtiene el id de la pregunta para pasarlo en el formulario 
	var id_ask = location.pathname.split("/");
	
	id_ask = id_ask[id_ask.length-1];

	
	// se llena el formulario q esta escondido :) 
	ForumView.handleAnswer(new_form, id_ask)
	/**/
	new_form.submit(ForumView.callUpdateAnswer);
}

ForumView.update_count_delete_answer = function(){
	// contador de las repuestas 
		count = $('.count-answer').text();
		count.split(' ');
		count = count[0]
		count = count-1+" ";

		if(count == '1 '){
		$(".count-answer").text(count + 'Respuesta')
		}else{
		$(".count-answer").text(count + 'Respuestas')	
		}
}

ForumView.appentOptions = function(div_contenedor){

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
	edit_msg.className = "glyphicon glyphicon-edit"
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