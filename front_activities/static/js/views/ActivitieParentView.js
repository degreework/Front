//
var ActivitieParentView = function()
{
}

ActivitieParentView.prototype.form_create = "";
ActivitieParentView.prototype.form_edit = "";


ActivitieParentView.prototype.handler_created_form = function(form){
	ActivitieParentView.prototype.form_create = form;
	$(ActivitieParentView.prototype.form_create).fadeIn();
	
	$(form).submit(function(e){
		e.preventDefault();
		
		var now = new Date($("#id_die_at").val())
		var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
		
		$("#id_die_at").attr('type', 'text')
		$("#id_die_at").val(now_utc.toISOString())
		



		var data = new FormData($(e.target).get(0));
		var url = URL_CREATE_ACTIVITIE_MODULE.replace(/\%slug%/g, slug);
		var activitieService = new ActivitieParentService();
		//URL_CREATE_ACTIVITIE_PARENT
		activitieService.create(url, data, ActivitieParentView.prototype.succes_create);
		//Te Amo, Isabella
	});

}

ActivitieParentView.prototype.handler_edit_form = function(form){
	ActivitieParentView.prototype.form_edit = form;
	$(ActivitieParentView.prototype.form_edit).fadeIn();
	$("#btn_active_send").fadeOut()

	//obtiene los valores de los atributos de la atividad
	var cont_id = $("#activitie").find("#activitie_id")[0];
	var cont_name = $("#activitie").find("#id_name")[0];
	var cont_desc = $("#activitie").find("#id_description")[0];
	var cont_die = $("#activitie").find("#id_die_at")[0];


	var _activitie_id = $(cont_id).val()
	var _activitie_name = $(cont_name).text()
	var _activitie_desc = $(cont_desc).text()
	//var _activitie_die = $(cont_die).text()
	var _activitie_die = $(cont_die).attr('value')

	//se crea la url
	var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
	url = url+"/"+_activitie_id;

	//asigna los atributos al formulario
	$($(form).find("#id_name")[0]).val(_activitie_name)
	$($(form).find("#id_description")[0]).val(_activitie_desc)
	

	//var now = new Date(_activitie_die)
	//console.info(now)
	//var now_utc = now.getFullYear()+'-'+ now.getMonth()+'-0'+now.getDate()+'T0'+now.getHours()+':0'+now.getMinutes()+':00';
	_activitie_die = _activitie_die.replace('Z', '')
	//console.info(_activitie_die)

	//console.info(now_utc)
	//_activitie_die	= now_utc.toLocaleDateString()
	//console.info(_activitie_die)
	//console.info(_activitie_die.toLocaleString())
	//_activitie_die = "11/01/2015, 03:00 AM"

	$($(form).find("#id_die_at")[0]).val(_activitie_die)
	
	$("#activitie").fadeOut();

	$(form).submit(function(e){
		e.preventDefault();
		
		var data = new FormData($(e.target).get(0));
		var activitieService = new ActivitieParentService();
		activitieService.update(url, data, ActivitieParentView.prototype.succes_update);
	});

}

ActivitieParentView.prototype.succes_create = function(response)
{
	$(ActivitieParentView.prototype.form_create).fadeOut();
	var url = Site.geRootUrl()+"/"+slug+ActivitieParentModel.get_detail_url(response.id);
	$("#msg_succes")
	.append(
		"<span>La actividad ha sido publicada <a href='"+url+"'>aqui</a></span>")
	$("#msg_succes").fadeIn()

}

ActivitieParentView.prototype.succes_update = function(response)
{
	$(ActivitieParentView.prototype.form_edit).fadeOut();
	$("#msg_succes")
	.append(
		"<span>La actividad ha sido editada <a href='"+ActivitieParentModel.get_detail_url(response.id)+"'>aqui</a></span>")
	$("#msg_succes").fadeIn()

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

ActivitieParentView.prototype.render_list = function(response)
{
	console.info("lista")
	console.info(response)
	if(response.count)
	{
		for (var i=0, len=response.results.length; i<len;i++) {
			console.log(response.results[i])
			ActivitieParentView.prototype.render_activite(response.results[i], true)

		};
	}else{
		
		$("#id_msg").text("Aún no hay actividades");
	}

}

ActivitieParentView.prototype.render_activite = function(response, show_edit)
{
	

	//dependiendo de los permisos de usuario se muesttra un boton para eliminar
	var s = StorageClass.getInstance();
	if(-1 != s.storage.get("permissions").indexOf("activitie.delete_activitieparent")){
		
		//buttom edit and event
		if (!show_edit){
		
			var edit = document.createElement("a");
			edit.className = "pull-right"
			var edit_msg = document.createElement("span");
			edit_msg.className = "glyphicon glyphicon-edit"
			edit.appendChild(edit_msg);
			edit.addEventListener('click', function(e){			
				//console.log("edit")
				var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
				url = url+'/'+response.id;

				var formActivitie = new ActivitieParentForm(
					$("#form_edit_activitie"),
					ActivitieParentView.prototype.handler_edit_form);


			}, false);
			$("#activitie").append(edit)
		}

		//buttom delete and event
		var del = document.createElement("a");
		del.className = "pull-right"
		var del_msg = document.createElement("span");
		del_msg.className = "glyphicon glyphicon-trash"
		del.appendChild(del_msg);
		del.addEventListener('click', function(e){
			
			//console.log("del")
			notify = Notify.show_confirm('la actividad');
			

			$('#erase').click(function(){
				// se obtiene el id de la respuesta para colocarlo en la url 
				var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
				url = url+'/'+response.id;
				var activitieService = new ActivitieParentService();
				activitieService.delete(url , function(e){
					//window.location.href = Site.geRootUrl()+"/activity"
				});
				//console.log('handle_delete')
				//console.log(response.id)


				notify.close()
			})

			$('#cancel').click(function(){
				notify.close()	
			})
		}, false);
		$("#activitie").append(del)

	}

	if(!show_edit && -1 != s.storage.get("permissions").indexOf("activitie.can_check_activitie")){

		//buttom list child activities and event
		var list = document.createElement("a");
		//list.className = "pull-right"
		var list_msg = document.createElement("span");
		$(list).text('Ver soluciones enviadas')
		list_msg.className = "glyphicon glyphicon-list-alt pull-left"
		list.appendChild(list_msg);
		list.addEventListener('click', function(e){
			console.log("listo todas las actividades de "+response.id)
			//URL_ALL_ACTIVITIE_CHILD
			//window.location.href = ActivitieParentModel.get_list_child_url(response.id)
			var activitie = new ActivitieChildView();
			var url = URL_ALL_ACTIVITIE_CHILD.replace(/\%id%/g, response.id);
			$("#title_list_activitie").fadeIn()
			//$("#list_activitie").fadeIn()
			activitie.list(url);
		
		}, false);
		$("#list_activitie").append(list)
	}

	//var die_at = response.die_at.replace('Z', '');
	var die_at = new Date(response.die_at).toUTCString()
	$("<a href='"+response.id+"' ><h4 id='id_name'>"+response.name+" </h4></a>" ).appendTo( "#activitie" );
	$("<p id='id_description'>"+response.description+"</p>" ).appendTo( "#activitie" );
	$("<p>Fecha de entrega: <span id='id_die_at' value='"+response.die_at+"'>"+die_at+"</span></p>" ).appendTo( "#activitie" );
	$("<input id='activitie_id' value='"+response.id+"'' type='hidden'</input>" ).appendTo( "#activitie" );
	$("<hr>" ).appendTo( "#activitie" );

	if('close'==response.status)
	{	
		$("#id_send_activitie_msg").fadeIn();
		$("#btn_active_send").remove();
	}
	else
	{
		$("#id_send_activitie").fadeIn();
	}

	ActivitieParentView.render_current_child(response.child, $("#id_current_activitie"));
	
	$("#activitie").fadeIn();

	$("#btn_active_send").click(function(e){
		var form = new ActivitieChildForm($("#form_send_activitie"));
		$(e.target).fadeOut();
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
			response.id,
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
		html = '<div id="id_activitie-'+child.id+'">';
		html += '<a href="'+User.get_url(child.author.id)+'"><span>'+child.author.name+'</span></a>';
		html += '<a id="id_activitie-'+child.id+'" href="'+child.file+'">';
		html += '<span id="id_gly" class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a>';
		html += '<span>Entregado '+jQuery.timeago(child.sent_at)+'</span>';
		html += '<span id="id_activitie_status" class="label label-default status-'+child.status[0]+'">'+child.status[1]+'</span></div>';

		//dependiendo de los permisos de usuario se muesttra un boton para eliminar
		var s = StorageClass.getInstance();
		if(-1 != s.storage.get("permissions").indexOf("activitie.can_check_activitie")){

			html +='<a id="'+child.id+'" class="action-disaprove"><span class="glyphicon glyphicon-remove"></span></a>';
			
			html +='<a id="'+child.id+'" class="action-aprove"><span class="glyphicon glyphicon-ok"></span></a>';

		}

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
