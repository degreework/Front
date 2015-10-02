var GamificationView = function()
{
}

//--------------------------------------------------------------
// VARIOS 
GamificationView.prototype.initialize = function(form, url, callback)
{
	console.log('entro')
	/*
	* 1 - Set form name
	* 2 - Get form from service
	*/

	// 1 - Set form name
	debug_info("1 - Set form name")
	

	//2 - Get form from service
	debug_info("2 - Get form from service")
	
	create_form(
		url,
		form,
		'OPTIONS',
		callback
	);

	debug_info("3.4 - Show form")
	form.show();

}


GamificationView.render_parametros = function(form, response){

	$.each(response, function(key, value) {	
	
			console.log(key +'=='+ value)
			if (value === true) { 

				$('#id_'+key).attr('checked', 'checked')
				$('#id_'+key).val(true);
			}else{
				
				if (value !== null) {
					
						$('#id_'+key).attr('value', value);
						
						// para las opciones seleccionadas en prerequisites
						if (key === 'prerequisites') {
							console.log(value)
							value = String(value) 
							value = value.split(',')
								
							//selecciona las opciones de el selector de disponibles						
							for (var i = 0; i < value.length; i++) {
								
								$('#id_quiz_from option[value = '+value[i]+']').prop('selected', true)

							};
							//las pasaal selector de elegidos
							$('#id_quiz_from option:selected').appendTo("#id_prerequisites");
						}

						// desplegables categoria y sub_categoria
						if (key === 'creator') {
							$('#id_'+key).val(value);
						};			
				
				}else{
					$('#id_'+key).attr('value', value);	
				};			
			}
			
	})

	$(form).show()

	if (form.selector === '#form_update_badge') {
		GamificationView.prototype.update_badges(form, response.id)
	}
	
}

GamificationView.prototype.handle_edit = function(response, index, tipo){
	
	$('#edit_').fadeIn()
	$('#show_').hide()

	response = response[index]

	if (tipo == 'medalla') {

		form = $("#form_update_badge")
		create_form(URL_CREATE_BADGE, form, 'OPTIONS', GamificationView.render_parametros, response)
	};
}

GamificationView.prototype.handle_delete = function(response, index, tipo, row){
	
	console.log('handle_delete')
	response = response[index]
	notify = Notify.show_confirm('la '+ tipo);

	var id = response.id

	$('#erase').click(function(){

		
		
		if (tipo == 'medalla') {

			var gamificationService = new GamificationService();
			gamificationService.delete(URL_CREATE_BADGE+'/'+id, row, GamificationView.prototype.hide_div)
			notify.close()	
		}
	})
	
	$('#cancel').click(function(){
		notify.close()	
	})
}

GamificationView.prototype.hide_div= function(response, row){
	row.fadeOut()
}


//---------------
// BADGES
//---------------

GamificationView.prototype.create_badge = function(form)
{
	form.submit(function (e) {
			e.preventDefault();

			//Selecciona todas las opciones del contendor 
			$("#id_prerequisites option").attr("selected","selected"); 

			var gamificationService = new GamificationService();
			var data = new FormData(($(e.target).get(0)));
			gamificationService.create(URL_CREATE_BADGE, data, GamificationView.prototype.notifify_create_badge)
	})
	
}

GamificationView.prototype.notifify_create_badge = function(response){
	location.href =  host+":"+location.port+"/gamification/badges"; 
}

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
		col_del.appendChild(link2)

		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title);
		container.appendChild(description);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		
		parent_container.prepend(container);		

		link2.addEventListener('click', function(e){ GamificationView.prototype.handle_delete(response, e.target.name, 'medalla', $(e.target).parents('.row_badge-'+e.target.name)) }, false);
	}
}

GamificationView.prototype.update_badges = function(form, id)
{
	form.submit(function (e) {
			e.preventDefault();
			//Selecciona todas las opciones del contendor 
			$("#id_prerequisites option").attr("selected","selected"); 


			var gamificationService = new GamificationService();
			var data = new FormData(($(e.target).get(0)));
			gamificationService.update(URL_CREATE_BADGE+'/'+id, data, GamificationView.prototype.redirect_badges)
	})
}

GamificationView.prototype.redirect_badges = function(response){
	location.reload();
}

//---------------
// AWARD
//---------------


GamificationView.prototype.get_all_award = function()
{

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
	$('#badge_pic').attr('src', gamification.badge.img)
}


GamificationView.prototype.get_scores = function()
{
	var gamificationService = new GamificationService();
}

GamificationView.prototype.render_scores = function(response){
	console.log(response)
	$('#score_quiz').text()
	$('#score_wiki').text()
	$('#score_activity').text()
}

GamificationView.prototype.update_score = function(form){
	
	
}