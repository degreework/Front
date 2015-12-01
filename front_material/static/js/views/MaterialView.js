var MaterialView = function()
{
}

MaterialView.prototype.form_create = "";
MaterialView.prototype.form_edit = "";


MaterialView.prototype.handler_created_form = function(form){
	
	MaterialView.prototype.form_create = form;
	$(MaterialView.prototype.form_create).fadeIn();
	
	$(form).submit(function(e){
		e.preventDefault();
		
		var data = new FormData($(e.target).get(0));
		var url = URL_CREATE_MATERIAL_MODULE.replace(/\%slug%/g, slug);
		var activitieService = new MaterialService();
		//URL_CREATE_MATERIAL
		activitieService.create(url, data, MaterialView.prototype.succes_create);
		//Te Amo, Isabella
		
	});


}
/*
MaterialView.prototype.handler_edit_form = function(form){
	MaterialView.prototype.form_edit = form;
	$(MaterialView.prototype.form_edit).fadeIn();
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
	var url = URL_CREATE_ACTIVITIE_PARENT+"/"+_activitie_id;

	//asigna los atributos al formulario
	$($(form).find("#id_name")[0]).val(_activitie_name)
	$($(form).find("#id_description")[0]).val(_activitie_desc)
	console.log(_activitie_die.replace('Z', ''))	
	$($(form).find("#id_die_at")[0]).val(_activitie_die)
	
	$("#activitie").fadeOut();

	$(form).submit(function(e){
		e.preventDefault();
		
		var data = new FormData($(e.target).get(0));
		var activitieService = new MaterialService();
		activitieService.update(url, data, MaterialView.prototype.succes_update);
	});

}
*/
MaterialView.prototype.succes_create = function(response)
{
	window.location.href = Site.geRootUrl()+"/"+slug+MaterialModel.get_detail_url(response.id);
	//$(MaterialView.prototype.form_create).fadeOut();

	//var url = Site.geRootUrl()+"/"+slug+MaterialModel.get_detail_url(response.id);
	
	/*$("#msg_succes").append(
		"<span>El material ha sido publicado <a href='"+url+"'>aqui</a></span>")
	
	$("#msg_succes").fadeIn()*/

}

MaterialView.prototype.succes_update = function(response)
{
	$(MaterialView.prototype.form_edit).fadeOut();
	
	$("#msg_succes").append(
		"<span>La actividad ha sido editada <a href='"+ActivitieParentModel.get_detail_url(response.id)+"'>aqui</a></span>")
	
	$("#msg_succes").fadeIn()

}

MaterialView.prototype.load_detail = function(url)
{
	var activitieService = new MaterialService();
	activitieService.retrieve(
		url,
		function  (response) {

			$("#id_title").text(response.title).fadeIn()
			$("#id_description").text(response.description).fadeIn()
			
			if("file" == response.content.type)
			{

				var ext = response.content.url.split('.').pop();
				if("png" == ext || "jpg" == ext)
				{
					<!--IMPORTANTE: la url no puede estar quemada, durante el desarrollo debe estar asi, pero para producción debe quitarse-->
					$("#id_pic").append("<img src='http://127.0.0.1:8080"+response.content.url+"' class='img-responsive' alt='"+response.title+"'>")
					$("#id_pic").fadeIn()
				}
				
				$("#id_file").attr('href', response.content.url).fadeIn();
			}

			else if("link" == response.content.type)
			{
				var index_yt = response.content.url.indexOf("//www.youtube.com/watch?v=");
				var index_vm = response.content.url.indexOf("//vimeo.com/");
				var url = '';

				//if is a video from either Youtube or Vimeo
				if(-1 != index_yt)
				{
					url = response.content.url.replace("watch?v=", "v/");
					console.info("Youtube")
				}
				else if (-1 != index_vm)
				{
					console.info("Vimeo")
					url = response.content.url;
				}//end sif is a video from either Youtube or Vimeo


				//if link is a video
				if(index_vm != -1 || index_yt != -1)
				{
					$("#id_link").text('')
					var div = '<br><div id="id_video" class="video-wrapper col-md-6 col-sm-offset-2"><div class="video-container">';
					div += '<iframe src="'+url+'" frameborder="0"></iframe>';
					div += '</div>';
					div += '</div><!-- /video-wrapper -->';

					$("#id_link").append(div).fadeIn();
				}
				//if link isn't a video
				else{
					$("#id_link_hyp").attr('href', response.content.url).fadeIn();
					$("#id_link").fadeIn();
				}
			}
		}
	);
}

MaterialView.prototype.list = function(url, container)
{
	var THIS = this;
	var activitieService = new MaterialService();
	activitieService.list(
		url,
		function (response) {
			THIS.render_list(response, container);
		
	});
}

MaterialView.prototype.render_list = function(response, container)
{
	console.log(response)
	if (response.count <= 0) {
		$(container).text('Aún no hay materiales')
	};
	for (var i=0, len=response.results.length; i<len;i++) {
		MaterialView.prototype.render_material(response.results[i], container)

	};
}

MaterialView.prototype.render_material = function(response, global_container)
{
	var container = document.createElement("div");
	container.className = "col-md-12 page_list";

	//dependiendo de los permisos de usuario se muesttra un boton para eliminar
	/*var s = StorageClass.getInstance();
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
				var url = URL_CREATE_ACTIVITIE_PARENT+'/'+response.id;

				var formActivitie = new ActivitieParentForm(
					$("#form_edit_activitie"),
					MaterialView.prototype.handler_edit_form);


			}, false);
			$("#material").append(edit)
		}

		//buttom delete and event
		
		var del = document.createElement("a");
		del.className = "pull-right"
		var del_msg = document.createElement("span");
		del_msg.className = "glyphicon glyphicon-trash"
		del.appendChild(del_msg);
		del.addEventListener('click', function(e){
			
			//console.log("del")
			notify = Notify.show_confirm('el material');
			

			$('#erase').click(function(){
				// se obtiene el id de la respuesta para colocarlo en la url 
				var url = URL_CREATE_ACTIVITIE_PARENT+'/'+response.id;
				var activitieService = new MaterialService();
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
		

	}*/

	var file = '';
	var title = "<a href='"+response.id+"' ><h4 id='id_name'>"+response.title+"</h4></a>";
	//var description = "<p id='id_description'>"+response.description+"</p>";

	/*
	if( "file" == response.content.type)
	{	
		file = '<a href="'+response.content.url+'"><span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a>';
	}*/


	var todo = title;//+description;file+
	
	$( container ).append( todo );
	$( global_container ).append(container );

}

var MaterialForm = function(form, hash ,callback){
	var url = "";
	
	if("#link" == hash)
	{
		url = URL_CREATE_MATERIAL_LINK;
	}
	else if("#file" == hash)
	{
		url = URL_CREATE_MATERIAL;
	}

	create_form(
		url,
		form,
		'OPTIONS',
		callback
	);
}
