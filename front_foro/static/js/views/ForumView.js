var ForumView = {};

ForumView.delete = function(response, div)
{
	/*
	*remove comment's div
	*/
	div.fadeOut();
	$('.count-answer').val();
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



/*
ForumView.editAnswer = function(e)
{
	/*
	*when edit (a tag) is clicked, do many things here like create form and set an event handler
	*/
	//get div parent
/*	var parent = $(e.target).parents('.comments');
	//get id from div parent
	var target_id = parent.attr("id");
	//get content of current comment
	var current_comment = $("#"+target_id+">p").text();
	//remove all elements of parent
	$(parent).children().hide();

	//change comment form location
	var new_form = $("#form_answer_foro").clone()
	$(new_form).attr('id', 'edit_comment_form_'+target_id);

	$(new_form).appendTo('#'+target_id);
	//set current content of comment to form
	$($("#form_answer_foro_"+target_id+" input")[0]).val(current_comment);
	//show form
	$(new_form).fadeIn()

	new_form.submit(CommentView.callUpdate);
}*/