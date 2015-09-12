var ActivitieParentView = function()
{
}

ActivitieParentView.prototype.handler_created_form = function(form){

	$(form).submit(function(e){
		e.preventDefault();
		
		var data = new FormData($(e.target).get(0));
		var activitieService = new ActivitieParentService();
		activitieService.create(URL_CREATE_ACTIVITIE_PARENT, data, ActivitieParentView.prototype.succes_create);
	});

}

ActivitieParentView.prototype.succes_create = function(response)
{
	$("#msg_succes").show();
}

ActivitieParentView.prototype.load_detail = function(id)
{
	var activitieService = new ActivitieParentService();
	var url = URL_CREATE_ACTIVITIE_PARENT+id;
	activitieService.retrieve(url , this.render_activite);
}

ActivitieParentView.prototype.render_activite = function(response)
{
	$("<p id='id_name'>"+response.name+"</p>" ).appendTo( "#activitie" );
	$("<p id='id_description'>"+response.description+"</p>" ).appendTo( "#activitie" );
	$("<p id='id_die_at'>"+response.die_at+"</p>" ).appendTo( "#activitie" );
	$("#activitie").fadeIn();

	$("#btn_active_send").click(function(e){
		var form = new ActivitieChildForm($("#form_send_activitie"));
		$(e.target).fadeOut();
	})
}

var ActivitieParentForm = function(form){
	create_form(
		URL_CREATE_ACTIVITIE_PARENT,
		form,
		'OPTIONS',
		ActivitieParentView.prototype.handler_created_form
	);
}


ActivitieParentView.prototype.load_list = function()
{
	$(".list_activities")
	var activitieService = new ActivitieParentService();
	//var url = 
	//activitieService.retrieve(url , this.render_activite);
}