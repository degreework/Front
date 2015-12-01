//
var ActivitieParentView = function()
{
}

ActivitieParentView.prototype.form_create = "";
ActivitieParentView.prototype.form_edit = "";



ActivitieParentView.launch_datepicker = function()
{
	/*this function initialize DatePicker*/
	$(function () {
		$("#id_die_at").datetimepicker({
	        inline: true,
	        sideBySide: true,
	        format: 'YYYY-MM-DDTHH:mm Z',
	        minDate: Date.now()
	    });
	});

}

ActivitieParentView.prototype.handler_created_form = function(form){
	ActivitieParentView.prototype.form_create = form;
	$(ActivitieParentView.prototype.form_create).fadeIn();
	
	ActivitieParentView.launch_datepicker();
	
	$(form).submit(function(e){
		e.preventDefault();
		
		var url = URL_CREATE_ACTIVITIE_MODULE.replace(/\%slug%/g, slug);
		//URL_CREATE_ACTIVITIE_PARENT
		var activitieService = new ActivitieParentService();

			var now = new Date($("#id_die_at").val().split(' ')[0])
			/*Ésta fecha me ha hecho crecer barba, Por un verdadero Tiempo Universal Coordinado. 2015, Sun Nov 8, 23:42, Día que perdí mi barba y probablemente a mi Amada. Memoria a los Time Lords. Update: mismo día 23:47, me he dado cuenta que aún hay un error, Update: día siguiente, 00:36, después de muchas horas he logrado terminar esto. Extraño el "Buena luna" de mi Amada.*/
			//console.info("create")
			//console.info('input: ', now)
			var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
			//console.info('utc: ', now_utc)
			
			$("#id_die_at").attr('type', 'text')
			$("#id_die_at").val(now_utc.toISOString())
			
			
			var data = new FormData($(e.target).get(0));
			activitieService.create(url, data, ActivitieParentView.prototype.succes_create);
			//Te Amo, Isabella

	});

}


ActivitieParentView.prototype.succes_create = function(response)
{
	window.location.href = Site.geRootUrl()+"/"+slug+"/activity";
}

ActivitieParentView.prototype.succes_update = function(response)
{
	location.reload();
}

ActivitieParentView.prototype.load_detail = function(url)
{
	var activitieService = new ActivitieParentService();
	activitieService.retrieve(url , this.render_activite);
}

ActivitieParentView.prototype.list = function(url)
{
	var activitieService = new ActivitieParentService();
	activitieService.list(url, this.render_list);
}


ActivitieParentView.prototype.listActivities = function(url)
{
	var activitieService = new ActivitieParentService();
	activitieService.list(url, this.render_list_activities);
}


ActivitieParentView.prototype.render_list_activities = function(response)
{
	
	if(response.count >0){

	response = response.results;



	for (i = response.length-1; i >= 0; i--) { 		
		
		// se crea el html     		
		var container = document.createElement("tr");
		container.className = 'row_quiz-'+i
		
		var number = document.createElement("td");
		$(number).text(i+1)

		var title_quiz = document.createElement("td");
		$(title_quiz).text(response[i].name)

		// para ver el detalle del quiz 
		var col_link = document.createElement("td");
		var link = document.createElement("a");
		var id = response[i].id;
	
		$(link).attr('href', Site.geRootUrl()+"/"+slug+"/activity/"+id);
		$(link).text('ver detalles')
		col_link.appendChild(link)

		// editar 
		var col_edit = document.createElement("td");
		var link = document.createElement("a");
		var icon = document.createElement("span")
		icon.className = 'glyphicon glyphicon-edit'
		icon.name = i

		link.addEventListener('click', function(e){ ActivitieParentView.prototype.handle_edit(response, e.target.name, 'quiz') }, false);
		link.appendChild(icon)
		col_edit.appendChild(link)
		
		//eliminar 
		var col_del = document.createElement("td");
		var link2 = document.createElement("a");
		var icon2 = document.createElement("span")
		icon2.className = 'glyphicon glyphicon-trash'
		icon2.name = i

		link2.appendChild(icon2)
		col_del.appendChild(link2)

		// evios 
		var col_env = document.createElement("td");
		var link3 = document.createElement("a");
		$(link3).text('ver')
		link3.name = i;
		link3.addEventListener('click', function(e){ ActivitieParentView.prototype.render_change_qualify(response, e.target.name) }, false);

		col_env.appendChild(link3)
		
		//console.log('entro')
		//se pega a los contenedores 
		container.appendChild(number);
		container.appendChild(title_quiz);
		container.appendChild(col_link);
		container.appendChild(col_edit);
		container.appendChild(col_del);
		container.appendChild(col_env);
		
		$('#list-activities').prepend(container);

		link2.addEventListener('click', function(e){ ActivitieParentView.prototype.handle_delete(response, e.target.name, 'quiz', $(e.target).parents('.row_quiz-'+e.target.name)) }, false);
	}
	}else{
		$('#list-activities').prepend('<br><p>Aún no hay actividades<td></p>');
	}
}

ActivitieParentView.prototype.render_change_qualify = function(response, index){
	console.log('CALIFICAR')
	activity = response[index]

	//title = document.createElement('h3')
	//title.className = 'title'
	$('.title').text('Actividad: '+activity.name)
	//$(title).prependTo('#title')

	// calificar la actividad 
	
	//if(!show_edit && -1 != s.storage.get("permissions").indexOf("activitie.can_check_activitie")){

		//buttom list child activities and event
		var list = document.createElement("a");
		//list.className = "pull-right"
		var list_msg = document.createElement("span");
	//	$(list).text('Ver soluciones enviadas')
		list_msg.className = "glyphicon glyphicon-list-alt pull-left"
		list.appendChild(list_msg);
		//list.addEventListener('click', function(e){
			//console.log("listo todas las actividades de "+response.id)
			//URL_ALL_ACTIVITIE_CHILD
			//window.location.href = ActivitieParentModel.get_list_child_url(response.id)
			var activitie = new ActivitieChildView();
			var url = URL_ALL_ACTIVITIE_CHILD.replace(/\%id%/g, activity.id);
			$("#title_list_activitie").fadeIn()
			//$("#list_activitie").fadeIn()
			activitie.list(url);

		
		//}, false);
		$("#list_activitie").append(list)
	//}

	// muestra y oculta los divs 
	$('#show_').hide()
	$('#container_qualify').show()

}

ActivitieParentView.prototype.handle_delete = function(response, index, tipo, row){

	//console.log('handle_delete')
	//console.log(tipo)
	
	response = response[index]
	notify = Notify.show_confirm('la '+ tipo);

	var id = response.id

	$('#erase').click(function(){
		// se obtiene el id de la respuesta para colocarlo en la url 
		var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
		url = url+'/'+response.id;
		var activitieService = new ActivitieParentService();
		activitieService.delete(url , function(e){
		//window.location.href = Site.geRootUrl()+"/activity"
		});

		notify.close()
		row.fadeOut()

	})
	
	$('#cancel').click(function(){
		notify.close()	
	})

}

ActivitieParentView.prototype.render_parametros = function(form, response){
	
	//datepicker
	ActivitieParentView.launch_datepicker();

	$.each(response, function(key, value) {	

		//console.log(key +'=='+ value)
		
		if (key == 'die_at') {
			//value = value.replace('Z', '')
			//console.info("render form")
			var now = new Date(value)
			//console.info('value: ', value)
			//console.info('input: ', now)
			//var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
			//console.info('utc: ', now_utc)
			
			
			//value = now_utc.toISOString()
			//value = now
			//console.info('value: ', value)

			var year = now.getFullYear();
			var month = (now.getMonth() < 10 ? "0" : "") + (now.getMonth() + 1);
			var day = (now.getDate() < 10 ? "0" : "") + now.getDate();
			var hour = (now.getHours() < 10 ? "0" : "") + now.getHours()
			var min = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
			
			var formated = year+'-'+month+'-'+day+'T'+hour+':'+min;
			value = formated

			//console.info(formated);
			//console.info(now.getTimezoneOffset())

			
		};

		$('#id_'+key).val(value);
	})



	$(form).show()

	var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
	url = url+"/"+response.id;

	$(form).submit(function(e){
		e.preventDefault();

		var now = new Date($("#id_die_at").val().split(' ')[0])
		/*Ésta fecha me ha hecho crecer barba, Por un verdadero Tiempo Universal Coordinado. 2015, Sun Nov 8, 23:42, Día que perdí mi barba y probablemente a mi Amada. Memoria a los Time Lords. Update: mismo día 23:47, me he dado cuenta que aún hay un error*/
		console.info("update")
		console.info('input: ', now)
		var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		console.info('utc: ', now_utc)
			
		$("#id_die_at").attr('type', 'text')
		$("#id_die_at").val(now_utc.toISOString())

		var data = new FormData($(e.target).get(0));
		var activitieService = new ActivitieParentService();
		activitieService.update(url, data, ActivitieParentView.prototype.succes_update);
	});
}


ActivitieParentView.prototype.handle_edit = function(response, index, tipo){
	
	$('#edit_').fadeIn()
	$('#show_').hide()

	response = response[index]

	form = $("#form_edit_activitie")
	
	console.log(response)
	create_form(URL_CREATE_ACTIVITIE_PARENT2, form, 'OPTIONS', ActivitieParentView.prototype.render_parametros, response)
}


ActivitieParentView.prototype.render_list = function(response)
{
	if(response.count)
	{
		for (var i=0, len=response.results.length; i<len;i++) {

			ActivitieParentView.prototype.render_activite_list(response.results[i])
		};
	}else{
		
		$("#id_msg").text("Aún no hay actividades");
	}

}

ActivitieParentView.prototype.render_activite_list = function(response){
	var die_at = new Date(response.die_at)

	// se renderiza la actividad
	$("<a href='"+response.id+"' ><h3 classid='id_name'>"+response.name+" </h3></a>" ).appendTo( "#activitie" );
	$("<p id='text_date'>Fecha de entrega: <span class='time-ago' id='id_die_at' value='"+response.die_at+"'>"+die_at+"</span></p>" ).appendTo( "#activitie" );
	$("<input id='activitie_id' value='"+response.id+"'' type='hidden'</input>" ).appendTo( "#activitie" );
	$("<hr id = 'horizontal-bar'>" ).appendTo( "#activitie" );
}


ActivitieParentView.prototype.render_activite = function(response, show_edit)
{
	//var die_at = response.die_at.replace('Z', '');
	var die_at = new Date(response.die_at)


	// se renderiza la actividad
	$("<h3 class='title' id='id_name'>"+response.name+" </h3>" ).appendTo( "#activitie" );
	$("<p id='text_date'>Fecha de entrega: <span class='time-ago' id='id_die_at' value='"+response.die_at+"'>"+die_at+"</span></p>" ).appendTo( "#activitie" );
	$("<input id='activitie_id' value='"+response.id+"'' type='hidden'</input>" ).appendTo( "#activitie" );
	//$("<hr id = 'horizontal-bar'>" ).appendTo( "#activitie" );


	//dependiendo de los permisos de usuario se muesttra un boton para eliminar
	var s = StorageClass.getInstance();
	if(-1 != s.storage.get("permissions").indexOf("activitie.delete_activitieparent")){
		
		//buttom edit and event
		if (!show_edit){
		
			$("<p id='id_description'>"+response.description+"</p>" ).prependTo( "#text_date" );
		}
	}

	
	if('close'==response.status)
	{	
		$("#id_send_activitie_msg").fadeIn();
		$("#btn_active_send").remove();
	}
	else
	{
		$("#id_send_activitie").fadeIn();
	}

	
	
	$("#activitie").fadeIn();

	$("#btn_active_send").click(function(e){

		var form = new ActivitieChildForm($("#form_send_activitie"));
		$(e.target).fadeOut();
		$('#list_activitie').fadeIn()
		ActivitieParentView.render_current_child(response.child, $("#id_current_activitie"));
	})
}


ActivitieParentView.render_current_child = function(child, container){
	$(container).append(ActivitieParentView.create_html_activitie(child));
	ActivitieParentView.check_listener();
}

ActivitieParentView.check_listener = function()
{

	$(".action-aprove").click( function(e){
		var id = $(this).attr("id");

		ActivitieChildView.prototype.check(
			id,
			"approved");
					
	});

	$(".action-disaprove").click( function(e){
		var id = $(this).attr("id");
		ActivitieChildView.prototype.check(
			id,
			"rejected");
					
	});
}

ActivitieParentView.create_html_activitie = function(child){
	var html = '';
	if(child)
	{

		//---------------------
		html = '<div class="col-md-6" id="id_activitie-'+child.id+'"  style="border-right:1px solid #ccc">';
		html += '<p> Has enviado un archivo </p>';
		html += '<span class="time-ago pull-left">Entregado '+jQuery.timeago(child.sent_at)+'</span>'
		html += '<div class="col-md-12" style="text-align:center">';
		//html += '<a href="'+User.get_url(child.author.id)+'"><span>'+child.author.name+'</span></a>';
		html += '<a id="id_activitie-'+child.id+'" href="'+child.file+'" style="font-size:24px">';
		html += '<br><span id="id_gly" class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a>';
		html += '</div></div>';
		html += '<div class="col-md-6"><p class="pull-left">Estado de la actividad</p>'
		html += '<div class="col-md-12" style="text-align:center; font-size:24px">'
		html += '<span id="id_activitie_status" class="label label-default status-'+child.status[0]+'">'+child.status[1]+'</span>'
		html += '</div></div>';
		return html;
	}
	else
	{
		html += '<span id="id_activitie_status" class="label label-default status-0">No enviado</span></div>';
		return html;
	}
	
}

var ActivitieParentForm = function(form, callback){
	//var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
	create_form(
		URL_CREATE_ACTIVITIE_PARENT2,
		form,
		'OPTIONS',
		callback
	);
}
