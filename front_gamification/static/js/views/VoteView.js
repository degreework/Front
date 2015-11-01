var VoteView = function()
{

}

VoteView.prototype.render_vote_votes  = function(container, thread_id)
{
	/*Render votes when is a list of ask*/
	var url = URL_LIST_VOTE.replace(/\%id%/g, thread_id);
	var service = new VoteService();
	service.list(
		url,
		function(response){
			var div = $("<span class='pull-right number_answer'></span>");
			//var div_up = $("<h5> <span class='glyphicon glyphicon-triangle-top' aria-hidden='true'>"+response[0].up_votes+"</span></h5>");
			//var div_down = $("<h5> <span class='glyphicon glyphicon-triangle-bottom' aria-hidden='true'>"+response[0].down_votes+"</span> </h5>");
			$(div).text('Votos: '+(response[0].up_votes+response[0].down_votes))

			//$(div).append(div_up)
			//$(div).append(div_down)
			$(container).append(div)
	});
}

VoteView.prototype.render_votes  = function(container, thread_id)
{
	/*Render votes when is a ask's detail */
	var url = URL_LIST_VOTE.replace(/\%id%/g, thread_id);
	var service = new VoteService();
	var _this = this;
	service.list(
		url,
		function(response){
			var div = $("<div class='col-md-12' style='text-align:center; padding-bottom:20px;'></div>");
			var div_up = $("<div class='col-md-6' style='border-right:1px solid #ccc;padding:10px;'> <span class='glyphicon glyphicon-triangle-top'><br><span id='id_"+thread_id+"' class='up-vote'>"+response[0].up_votes+"</span></span></div>");
			var div_down = $("<div class='col-md-6' style='padding:10px;'><span class='glyphicon glyphicon-triangle-bottom'><br><span id='id_"+thread_id+"' class='down-vote'>"+response[0].down_votes+"</span></span></div>");

			$(div).append(div_up)
			$(div).append(div_down)
			$(container).append(div)

			$(div_up).click(function(e){
				console.log("click up")
				_this.do_vote({'thread':thread_id, 'vote':0})
				$(this).off()
			})
			$(div_down).click(function(e){
				console.log("click down")
				_this.do_vote({'thread':thread_id, 'vote':1})
				$(this).off()
			})
	});


}

/*
VoteView.prototype.render_btn = function(container, thread_id)
{

	var div_up = $("<span id='id_"+thread_id+"' class='glyphicon glyphicon-triangle-top' aria-hidden='true'></span>");
	var div_down = $("<span id='id_"+thread_id+"' class='glyphicon glyphicon-triangle-bottom' aria-hidden='true'></span>");

	var _this = this;
	$(div_up).click(function(e){
		console.log("click up")
		_this.do_vote({'thread':thread_id, 'vote':0})
		$(this).off()
	})
	$(div_down).click(function(e){
		console.log("click down")
		_this.do_vote({'thread':thread_id, 'vote':1})
		$(this).off()
	})
	var div = $("<div></div>");


	$(div).append(div_up)
	$(div).append(div_down)

	$(container).append(div)
}
*/
VoteView.prototype.do_vote  = function(data)
{
	var url = URL_GIVE_VOTE;
	
	var service = new VoteService();
	service.give(
		url,
		data,
		function(response){
			console.log(response)
			if(403 == response.status)
			{
				Notify.show_error("VOTO", "No puedes emitir dos votos en una misma publicación");
			}

			if(0 == response.vote)
			{
				//si el usuario ha emitido un voto anteriormente, entonces decrementar el contador
				if(1 == response.previous)
				{
					var element = $("#id_"+response.thread+".down-vote")[0]
					element.innerHTML = 1*element.innerHTML - 1;
				}
				//aumenta el contador
				var element = $("#id_"+response.thread+".up-vote")[0]
				element.innerHTML = 1*element.innerHTML + 1;
			}
			else if(1 == response.vote)
			{
				//si el usuario ha emitido un voto anteriormente, entonces decrementar el contador
				if(0 == response.previous)
				{
					var element = $("#id_"+response.thread+".up-vote")[0]
					element.innerHTML = 1*element.innerHTML - 1;
				}
				//aumenta el contador
				var element = $("#id_"+response.thread+".down-vote")[0]
				element.innerHTML = 1*element.innerHTML + 1;
			}

		});
}