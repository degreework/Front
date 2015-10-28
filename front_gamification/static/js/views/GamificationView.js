var GamificationView = function()
{
}

//--------------------------------------------------------------
// VARIOS 

GamificationView.render_parametros = function(form, response){
	console.log('gamification render_parametros')
	console.log(form)
	console.log(response)
}

GamificationView.prototype.handle_edit = function(response, index, tipo){
	
	$('#edit_').fadeIn()
	$('#show_').hide()

	response = response[index]

	if (tipo == 'medalla') {

		form = $("#form_update_badge")
		create_form(URL_SCORES, form, 'OPTIONS', GamificationView.render_parametros, response)
	};
}


GamificationView.prototype.hide_div= function(response, row){
	row.fadeOut()
}


//---------------
// BADGES
//---------------

GamificationView.prototype.get_all_badges = function()
{
	var gamificationService = new GamificationService();
	gamificationService.list(URL_ALL_BADGE, GamificationView.prototype.render_all_badges)	
}

GamificationView.prototype.render_all_badges = function (response)
{	
	GamificationView.prototype.render_list_badges($('#list-badges'), response);
}

GamificationView.prototype.render_list_badges = function(parent_container, response)
{
	
	for (i = response.length-1; i >= 0; i--) { 

		var container = document.createElement("tr");
		container.className = 'row_badge-'+i
		
		var id = response[i].id;		
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var title = document.createElement("td");
		$(title).text(response[i].title)

		var description = document.createElement("td");
		$(description).text(response[i].description)

		/*
		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i


		link.addEventListener('click', function(e){ GamificationView.prototype.handle_edit(response, e.target.name, 'medalla') }, false);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'
		icon2.name = i

		link2.appendChild(icon2)
		col_del.appendChild(link2)*/

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title);
		container.appendChild(description);
		//container.appendChild(col_edit);
		//container.appendChild(col_del);
		
		parent_container.prepend(container);		

		//link2.addEventListener('click', function(e){ GamificationView.prototype.handle_delete(response, e.target.name, 'medalla', $(e.target).parents('.row_badge-'+e.target.name)) }, false);
	}
}


GamificationView.prototype.redirect_badges = function(response){
	location.reload();
}

//---------------
// AWARD
//---------------

// trae los awards del usuario para el perfil
GamificationView.prototype.get_all_award_user = function(send, id_user){

	
	var id = id_user;

	if (send === 'profile') {
		user = JSON.parse(localStorage.getItem('user'))
		id = user.id
	};

	var gamificationService = new GamificationService();
	gamificationService.retrieve(URL_GET_AWARDS_USER+id, GamificationView.prototype.render_awards)
}

GamificationView.prototype.get_all_award = function(){

	var gamificationService = new GamificationService();
	gamificationService.retrieve(URL_GET_AWARDS_USER, GamificationView.prototype.render_awards_admin)
}


GamificationView.prototype.render_awards = function(response){
	
	for (var i = 0; i < response.length; i++) {
		
		var container = document.createElement('div')
		container.className = 'col-md-4'
		var title_award = document.createElement('h4')
		$(title_award).text(response[i].badge.title)
		var pic_award = document.createElement('img')
		$(pic_award).attr('src' , 'http://127.0.0.1:8080'+response[i].badge.img)
		pic_award.className = 'img-circle img-responsive'
		

		container.appendChild(title_award)
		container.appendChild(pic_award)
		$('.container_awards').append(container)
	};
}

GamificationView.prototype.render_awards_admin = function(response){
	console.log(response)
	for (var i = 0; i < response.length; i++) {

		var container = document.createElement("tr");
		container.className = 'row_award-'+i
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var user = document.createElement("td");
		$(user).text(response[i].user)

		var badge = document.createElement("td");
		$(badge).text(response[i].badge.title)

		container.appendChild(number);
		container.appendChild(user);
		container.appendChild(badge);
	
		$('#list-award').prepend(container);		


	}
}


//---------------
// SCORES
//---------------

GamificationView.prototype.get_progress_user = function(id_user){
	console.log('get_progress_user')
	var gamificationService = new GamificationService();
	gamificationService.retrieve(URL_GET_PROGRESS_GAMIFICATION+id_user, GamificationView.prototype.setSession)
}

GamificationView.prototype.setSession = function(response){
	console.log('setSession')
	var s = StorageClass.getInstance();
	s.storage.set("badgeProgress", JSON.stringify(response));
	console.log(s.storage.get("badgeProgress"));

	gamification = JSON.parse(localStorage.getItem('badgeProgress'))
	$('.progress-bar').text(gamification.percent+'%')
	$('.progress-bar').css('width',gamification.percent+'%')
	$('#badge').text(gamification.badge.title)
	$('#badge_pic').attr('src', 'http://127.0.0.1:8080'+gamification.badge.img)
}


GamificationView.prototype.get_scores = function()
{
	var gamificationService = new GamificationService();
	gamificationService.retrieve(URL_SCORES_ALL, GamificationView.prototype.render_scores)

}

GamificationView.prototype.render_scores = function(response){
	console.log(response)
	for (var i = 0; i < response.length; i++) {
		
		var container = document.createElement("tr");
		container.className = 'row_award-'+i

		var number = document.createElement("td");
		$(number).text(i+1)

		var name = document.createElement("td");
		$(name).text(response[i].id_event)

		var score = document.createElement("td");
		$(score).text(response[i].score)

		
		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i

		var tipo = ''
		if (response[i].event === 'Activity') {
			tipo = 'Activity'
		}else{
			tipo = 'Quiz'
		}

		link.addEventListener('click', function(e){ GamificationView.prototype.handle_edit(response, e.target.name, 'medalla') }, false);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(name);
		container.appendChild(score);
		container.appendChild(col_edit);
		//container.appendChild(col_del);
		
		if (response[i].event === 'Activity') {
			$('#list-tfquestion').prepend(container);		
		};

		if (response[i].event === 'Quiz') {
			$('#list-equestion').prepend(container);		
		};
	}

}

GamificationView.prototype.show_table_questions = function(){

	button = document.createElement('button')
	$(button).attr('type','submit')
	$(button).attr('name','action')
	$(button).text('Actualizar')
	button.className = 'btn btn-default pull-right' 

	$('#Essay').click(function(){
				$('#table-essay').show()
				$('#table-tf').hide()
				//$('#table-mc').hide()

				$('#show_').show()
				$('#edit_tf').hide()
				//$('#edit_mc').hide()
				$('#edit_e').hide()

				$('#form_update_tf').empty()
				//$('#form_update_mc').empty()
				//$('#form_mc_answer').empty()
				$('#form_update_e').empty()
				$('#form_update_e').append(button)
			})

			$('#TF').click(function(){
				$('#table-essay').hide()
				$('#table-tf').show()
				//$('#table-mc').hide()

				$('#show_').show()
				$('#edit_tf').hide()
				//$('#edit_mc').hide()
				$('#edit_e').hide()

				$('#form_update_tf').empty()
				//$('#form_update_mc').empty()
				//$('#form_mc_answer').empty()
				$('#form_update_e').empty()
				$('#form_update_tf').append(button)
			})

			/*$('#MC').click(function(){
				$('#table-essay').hide()
				$('#table-tf').hide()
				$('#table-mc').show()

				$('#show_').show()
				$('#edit_tf').hide()
				$('#edit_mc').hide()
				$('#edit_e').hide()

				$('#form_update_tf').empty()
				$('#form_update_mc').empty()
				$('#form_mc_answer').empty()
				$('#form_update_e').empty()
				

			})*/
}