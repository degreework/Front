var AnswerView = function(ask)
{
	//console.log("AnswerView:instance created")	
	this.ask = ask;
	this.service = new AnswerService();
}

AnswerView.prototype.container_list_answers = '.answer';
AskView.prototype.next_page = null;

/*
* Service request functions
*/
AnswerView.prototype.list = function (url) {
	//console.log('AnswerView:list');
	this.service.list(url,this.render_list);
}


AnswerView.prototype.set_scroll_list = function(url){
	//console.log("AnswerView:set_scroll_list")

	var paginator_next = "#answer_next";
	var paginator = new NonPaginator(paginator_next, this);
		
	if(AnswerView.prototype.next_page)
	{
		//console.log("There is not more Answers")
		paginator.disable();
	}
	else
	{
		//console.log("There is more Answers")
		//console.log(AnswerView.prototype.next_page);
	}
}

var NonPaginator = function (btn_next, view) {
	console.log('Paginator:instance created');
	this.btn_next = btn_next;

	$(this.btn_next).click(function(e){
		e.preventDefault();
		//console.log("paginator_next:clicked")
		view.list(AnswerView.prototype.next_page);
	});
};

NonPaginator.prototype.disable = function()
{
	//console.log('Paginator:disable');
	$(this.btn_next).remove();
}

/*
AnswerView.prototype.retrieve = function (url) {
	console.log('AnswerView:retrieve');
	this.service.retrieve(url,this.render_ask);
}
*/

/*
* View render manager functions
*/
AnswerView.prototype.render_list = function (data){
	//console.log('AnswerView:render_list');
	//console.log(data)

	var data_list_asks = data.results;
	var to_comment = [];

	//votes
	var voteManager = new VoteView();
	//end votes

	for (i=0, len=data_list_asks.length; i < len; i++) {

		// se crea el html
		var container = document.createElement("div");
		container.className = 'col-md-12 response';
		var id = data_list_asks[i].id;
		container.id = 'ans-'+id;

		
		//informacion de la persona q creo la respuesta
		var info_user = document.createElement("div");
		info_user.className = "col-md-2";
		var link = document.createElement("a");
		var date = document.createElement("p");
		var autor = document.createElement("p");
		
		$(autor).text(data_list_asks[i].author.name)
		$(link).attr('href', UserView.getUrl(data_list_asks[i].author.id));
		$(date).text(""+jQuery.timeago(data_list_asks[i].added_at))

		// opciones editar y eliminar 
		var options = document.createElement("div");
		options.className = "col-md-1";

		link.appendChild(autor);
		info_user.appendChild(link);
		info_user.appendChild(date);
		AnswerView.prototype.appentOptions(options);
	
		//repuesta como tal 
		var summarys = document.createElement("div");
		summarys.className = "col-md-9"
		

		content_summary = document.createElement("div");
		content_summary.className = "col-md-12"
		content_summary.id = "textAnswer-ans-"+id
		$(content_summary).html(markdown.toHTML(data_list_asks[i].text))
		summarys.appendChild(content_summary)	

		//comentarios 
		var div_comments = document.createElement("div");
		div_comments.className = "col-md-10 col-sm-offset-1 comment-answer"
		
		// contenedor para listar los comentarios 
		var list_comments = document.createElement("div");
		$(list_comments).attr('id', 'list-comment-ans-'+id)

		list_comments.appendChild(div_comments)

		summarys.appendChild(list_comments)



		//se pega a los contenedores 
		container.appendChild(summarys);
		container.appendChild(info_user);
		container.appendChild(options);
		

		$(AnswerView.prototype.container_list_answers).append(container);

		to_comment.push(container);

		//votes
		///#### vote
		voteManager.render_btn(container, id);
		voteManager.render_votes(container, id);
		//## end vote

	}

	//console.log("render comment")
	AnswerView.prototype.render_count_answer(data.count)
	//$('.count-answer').text()
	

	AnswerView.prototype.next_page = data.next;

	//load comments
	$(to_comment).each(function(index, value)
	{
		console.log(value)
		var thread = $(value).attr("id").split('-')[1]
		var container_comment = $(value).find(".comment-answer")[0]

		var form = $("#form-comment-clone").clone();
		$(form).attr('id', "form-comment-ans-"+thread);

		$(container_comment).append(form);

		//link to load
		var div_load_comments = document.createElement("div");
		var load_comments_a = document.createElement("a");
		
		div_load_comments.className = 'load-comment-ans-'+thread;
		$(load_comments_a).text("Ver más comentarios")
		div_load_comments.appendChild(load_comments_a)

		container_comment.appendChild(div_load_comments);


		//load comments
		var container_list_comments = document.createElement("div");

		var comentariosAnswer = new CommentView(
			thread,
			form,
			container_list_comments,
			$(div_load_comments)
		);
		comentariosAnswer.load();
		comentariosAnswer.load_create_comment(thread);
		
		//link to load
		container_comment.appendChild(container_list_comments)

	});

}
/*

AnswerView.prototype.render_answer = function (data){
	console.log('AnswerView:render_answer');
	console.log(data)

}
*/

AnswerView.prototype.appentOptions = function(div_contenedor){

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
	edit.addEventListener('click', AnswerView.prototype.handle_edit, false);

	item1.appendChild(edit)
	//eliminar answer
	var item2 = document.createElement("li");

	var del = document.createElement("a");
	var del_msg = document.createElement("span");
	del_msg.className = 'glyphicon glyphicon-remove'
	$(del_msg).text(' eliminar')
	del.appendChild(del_msg);
	del.addEventListener('click', AnswerView.prototype.handle_delete, false);
	
	item2.appendChild(del)

	dropdown_menu.appendChild(item1)
	dropdown_menu.appendChild(item2)


	div_dropdown.appendChild(div_dropdow_toggle)
	div_dropdown.appendChild(dropdown_menu)

	div_contenedor.appendChild(div_dropdown)
}
/*
* Event Handler functions
*/

AnswerView.prototype.handle_delete = function(e){
	notify = Notify.show_confirm('la respuesta');

	$('#erase').click(function(){
		// se obtiene el id de la respuesta para colocarlo en la url 
		var id = $(e.target).parents('.response').attr("id");
		var splited = id.split('-');
		id = splited[splited.length-1];
		console.log('handle_delete')
		console.log(id)
 
		var answerService = new AnswerService();
		answerService.delete(
			URL_CREATE_ANSWER_FORO+id,
			$(e.target).parents('.response'),
			function(response, div)
			{
				count = $('.count-answer').text();
				count = AnswerView.prototype.update_count_answer(count, 'disminuye');
				AnswerView.prototype.render_count_answer(count)
				div.fadeOut();
			}
		)

		notify.close()	
	})

	$('#cancel').click(function(){
		notify.close()	
	})
}

AnswerView.prototype.handle_edit = function(e)
{
	//console.log('AnswerView:handle_edit');
	/*
	*when edit (a tag) is clicked, do many things here like create form and set an event handler
	*/
	//get div parent
	var parent = $(e.target).parents('.response');
	//get id from div parent
	var target_id = parent.attr("id");
	//console.log("target_id")
	//console.log(target_id)
	//get content of current comment
	var current_answer = $("#textAnswer-"+target_id+">p").text();
	//remove all elements of parent
	$(parent).children().hide();

	//change comment form location
	var new_form = $(AnswerForm.prototype.form).clone();
	$(new_form).attr('id', 'edit_answer_form_'+target_id);
	
	$(new_form).appendTo('#'+target_id);
	
	//set current content of answer to form
	//$("#edit_answer_form_"+target_id).find("#id_text").val(current_answer);

	var input_text = $("#edit_answer_form_"+target_id).find("#id_text");
	
	$('#id_textarea_answer').attr('id','textarea-'+target_id)
	
	$('#textarea-'+target_id).text(current_answer)
	//show form
	$(new_form).fadeIn()


	$(input_text).val(current_answer);

	$('textarea').keyup(function(e){
		$(input_text).val($(e.target).val());
    });

	
	new_form.submit(function(e){
		e.preventDefault();
		//console.log("AnswerView:submit_edit")
		// se obtiene el id de la respuesta para colocarlo en la url
		var splited = e.target.id.split('-');
		var id = splited[splited.length-1]

		var data = new FormData($(e.target).get(0))

		var answerService = new AnswerService();
		answerService.update(URL_CREATE_ANSWER_FORO+id, data, function(response)
		{
			$(new_form).remove();
			$("#textAnswer-ans-"+response.id+">p").text(response.text);			
			$(parent).children().fadeIn();

		})
	});


}


var AnswerForm = function(id_ask){
	//console.log('AnswerForm:instance created');
	//console.log($(AnswerForm.prototype.form))
	
	create_form(
		URL_CREATE_ANSWER_FORO,
		$(AnswerForm.prototype.form),
		'OPTIONS',
		AnswerForm.prototype.handler_created_form,
		id_ask
	);
}

AnswerForm.prototype.form = "#form_answer_foro";
AnswerForm.prototype.editor = "#id_textarea_answer";

AnswerForm.prototype.handler_created_form = function(created_form, id_ask){
	//console.log('AnswerForm:handler_created_form');

	var input_ask_id  = $(AnswerForm.prototype.form).find("#id_ask")[0];
	$(input_ask_id).hide();
	$(input_ask_id).val(id_ask);

	var input = $(AnswerForm.prototype.form).find("#id_text");
	$('textarea').keyup(function(e){
		$(input).val($(e.target).val());
    });
	input.hide();
	
	$(AnswerForm.prototype.form).show();

	$(AnswerForm.prototype.form).submit(function(e){
		e.preventDefault();
		//console.log("AnswerForm:submit");
		
		$(input_ask_id).val(id_ask);
		
		var data = new FormData($(e.target).get(0));

		var answerService = new AnswerService();
		answerService.create(URL_CREATE_ANSWER_FORO, data, AnswerForm.prototype.succes_create);

	});

}

AnswerForm.prototype.fill = function(){
	//console.log('AnswerForm:fill');
	//get content of current comment
	var current_question = $(AnswerView.prototype.container_summary).text();
	

	var input = $(AnswerForm.prototype.form).find('#id_text')[0];
	$(input).val(current_question)
	
	$(AnswerForm.prototype.editor).text(current_question)

}

AnswerForm.prototype.succes_update = function (response, form){
	//console.log('AnswerForm:succes_update');
	location.reload();
}

AnswerForm.prototype.succes_create = function(response){
	console.log('AnswerForm:succes_create');
	console.log(response)
	
	$(AnswerForm.prototype.form).trigger("reset");
	
	// contador de las repuestas 
	count = $('.count-answer').text();
	count = AnswerView.prototype.update_count_answer(count, 'aumenta');
	
	AnswerView.prototype.render_list({'count':count,'results':[response]})

}

AnswerView.prototype.update_count_answer = function(count_container, tipo){
	
	count_container = count_container.split(' ');
	count_container = parseInt(count_container[0])

	if (tipo == 'aumenta') {
		count_container = count_container+1;
	};

	if (tipo == 'disminuye') {
		count_container = count_container-1;
	};

	console.log('actualizo')
	console.log(count_container)

	return count_container
}

AnswerView.prototype.render_count_answer = function(count){

	if(count == 1){
		$(".count-answer").text(count + ' Respuesta')
	}else{
		$(".count-answer").text(count + ' Respuestas')	
	}
	//AnswerView.prototype.render_list({'results':[response]})

}