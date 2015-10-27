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
	var _activitie_die = $(cont_die).text()

	//se crea la url
	var url = URL_CREATE_ACTIVITIE_PARENT.replace(/\%slug%/g, slug);
	url = url+"/"+_activitie_id;

	//asigna los atributos al formulario
	$($(form).find("#id_name")[0]).val(_activitie_name)
	$($(form).find("#id_description")[0]).val(_activitie_desc)
	console.log(_activitie_die.replace('Z', ''))	
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
	console.log("lista")
	console.log(response)

	for (var i=0, len=response.results.length; i<len;i++) {
		console.log(response.results[i])
		ActivitieParentView.prototype.render_activite(response.results[i], true)

	};
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
					window.location.href = Site.geRootUrl()+"/activity"
				});
				console.log('handle_delete')
				console.log(response.id)


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

	
	$("<a href='"+response.id+"' ><h4 id='id_name'>"+response.name+" </h4></a>" ).appendTo( "#activitie" );
	$("<p id='id_description'>"+response.description+"</p>" ).appendTo( "#activitie" );
	$("<p>Fecha de entrega: <span id='id_die_at'>"+response.die_at.replace('Z', '')+"</span></p>" ).appendTo( "#activitie" );
	$("<input id='activitie_id' value='"+response.id+"'' type='hidden'</input>" ).appendTo( "#activitie" );
	$("<hr>" ).appendTo( "#activitie" );

	$("#activitie").fadeIn();

	$("#btn_active_send").click(function(e){
		var form = new ActivitieChildForm($("#form_send_activitie"));
		$(e.target).fadeOut();
	})
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
