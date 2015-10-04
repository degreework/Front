var AskView = function () {
	//console.log('AskView:instance created');
	this.service = new AskService();
};

/*
* Hardcoded setting to asing html containers
*/
AskView.prototype.container_list_ask = '.asks';

AskView.prototype.container_content_ask = '.content_ask';
AskView.prototype.container_title_ask = '.ask_title';
AskView.prototype.container_summary = '.ask_summary';
AskView.prototype.container_added_at = '.ask_added_at';
AskView.prototype.container_author = '.ask_author';
AskView.prototype.container_author_link = '.ask_author_link';

AskView.prototype.next_page = null;


/*
* Service request functions
*/
AskView.prototype.list = function (url) {
	//console.log('AskView:list');
	this.service.list(url,this.render_list);
}

AskView.prototype.scroll_list = function(url){
	//console.log("AskView:scroll_list")
		
	if(AskView.prototype.next_page)
	{
		console.log(AskView.prototype.next_page);
		this.list(AskView.prototype.next_page);
	}
}

AskView.prototype.retrieve = function (url) {
	//console.log('AskView:retrieve');
	this.service.retrieve(url,this.render_ask);
}


/*
* View render manager functions
*/
AskView.prototype.render_list = function (data){
	//console.log('AskView:render_list');
	//console.log(data)

	//######
	//Votes

	var voteManager = new VoteView();

	//####
	//end votes


	var data_list_asks = data.results;
	
	for (i = 0, len = data_list_asks.length; i < len; i++) { 
		// se crea el html     		
		var container = document.createElement("div");
		container.className = 'question col-md-12';

		var container2 = document.createElement("div");
		container2.className = 'col-md-11 pull-right';

		var link = document.createElement("a");
		var id = data_list_asks[i].id;
		
		

		//
		$(link).attr('href', host+":"+location.port+"/forum/detail/"+id);
		var titles = document.createElement("h3");
		var summarys = document.createElement("span");
		//summarys.className = 'pull-right';
		var author = document.createElement("a");
		$(author).attr('href', UserView.getUrl(data_list_asks[i].author.id));
		var count = document.createElement("span");
		count.className= "count-answer pull-right number_answer";

			
		//se asigna el texto 
		$(count).text('Respuestas: '+ data_list_asks[i].count)
		$(titles).text(data_list_asks[i].title)
		$(summarys).text(', '+jQuery.timeago(data_list_asks[i].added_at))
		$(author).text(data_list_asks[i].author.name)
			
		///#### vote
		voteManager.render_vote_votes(container, id);
		//## end vote

		//se pega a los contenedores 
		link.appendChild(titles);
		container2.appendChild(link);
		container2.appendChild(author);
		container2.appendChild(summarys);
		container2.appendChild(count);
		container.appendChild(container2)

		

			
		$(AskView.prototype.container_list_ask).prepend(container);
	}

	AskView.prototype.next_page = data.next;

}

AskView.prototype.render_ask = function (data){
	//console.log('AskView:render_ask');
	//console.log(data)
	
	$(AskView.prototype.container_title_ask).text(data.title);
	
	//buttom edit and event
	var edit = document.createElement("a");
	edit.className = "pull-right"
	var edit_msg = document.createElement("span");
	edit_msg.className = "glyphicon glyphicon-edit"
	edit.appendChild(edit_msg);
	edit.addEventListener('click', AskView.prototype.handle_edit, false);
	$(AskView.prototype.container_title_ask).append(edit)

	$(AskView.prototype.container_content_ask).attr('id','a-'+data.id)

	$(AskView.prototype.container_summary).html(markdown.toHTML(data.text));
	$(AskView.prototype.container_added_at).text(jQuery.timeago(data.added_at));
	$(AskView.prototype.container_author).text(data.author.name);
	$(AskView.prototype.container_author_link).attr('href', UserView.getUrl(data.author.id));

	//votes
	var vote = new VoteView();
	//vote.render_btn($('.info_ask'), data.id);

	vote.render_votes($('.info_ask'), data.id)

}


/*
* Event Handler functions
*/

AskView.prototype.handle_edit = function(e)
{
	console.log('AskView:handle_edit');

	$(e.target).hide();

	/*
	*when edit (a tag) is clicked, do many things here like create form and set an event handler
	*/
	//get div parent
	var parent = $(AskView.prototype.container_content_ask);
	
	//get id from div parent
	var target_id = parent.attr("id");

	//remove all elements of parent
	$(parent).children().hide();


	var form = new AskForm();
	
	///hide 'Ask' title
	$(".ask_title").hide();

	//show "edita tu pregunta"
	$(".ask_edit").show();


}


var AskForm = function(){
	console.log('AskForm:instance created');
	console.log($(AskForm.prototype.form))
	create_form(
		URL_CREATE_ASK_FORO,
		$(AskForm.prototype.form),
		'OPTIONS',
		AskForm.prototype.handler_created_form
	);
}

AskForm.prototype.form = "#form_ask_edit_foro";
AskForm.prototype.editor = "#id_textarea_ask";


AskForm.prototype.handler_created_form = function(){
	console.log('AskForm:handler_created_form');
	
	
	MarkupEditor.load($(AskForm.prototype.editor));


	var input = $(AskForm.prototype.form).find("#id_text");
	$('textarea').keyup(function(e){
		$(input).val($(e.target).val());
    });
	input.hide();
	

	$(AskForm.prototype.form).show();
	
	AskForm.prototype.fill();

	$(AskForm.prototype.form).submit(function(e){
		e.preventDefault();
		console.log("AskForm:submit");
		var askService = new AskService();

		var splited = e.target.parentElement.id.split('-');
		var id = splited[splited.length-1]

		var data = new FormData($(e.target).get(0))
		
		if(e.target.baseURI.indexOf("create") !== -1)
		{
			askService.create(URL_CREATE_ASK_FORO, data, AskForm.prototype.succes_create)
		}
		else
		{
			askService.update(URL_CREATE_ASK_FORO+id, data, AskForm.prototype.succes_update)
		}
	});


}

AskForm.prototype.fill = function(){
	console.log('AskForm:fill');
	
	var current_question = $(AskView.prototype.container_summary).text();
	var current_title = $(AskView.prototype.container_title_ask).text();
	
	var input_title = $(AskForm.prototype.form).find('#id_title')[0];
	$(input_title).val(current_title)
	
	var input_text = $(AskForm.prototype.form).find('#id_text')[0];
	$(input_text).val(current_question)
	
	$(AskForm.prototype.editor).text(current_question)
	

}

AskForm.prototype.succes_update = function (response, form){
	console.log('AskForm:succes_update');
	location.reload();
}

AskForm.prototype.succes_create = function(response){
	console.log('AskForm:succes_create');
	console.log(response)
	var new_url = host+":"+location.port+"/forum/detail/"+response.id;
	location.href =  new_url
}