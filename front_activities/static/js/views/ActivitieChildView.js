var ActivitieChildView = function()
{
}

ActivitieChildView.prototype.handler_created_form = function(form){
	$($("#id_parent")[0]).val(ACTIVITIE_ID);
	$($("#id_parent")[0]).hide();

	$("#send_activitie").fadeIn();

	$(form).submit(function(e){
		e.preventDefault();
		
		var data = new FormData($(e.target).get(0));
		var activitieService = new ActivitieChildService();
		activitieService.create(URL_CREATE_ACTIVITIE_CHILD, data, ActivitieChildView.prototype.succes_create);
	});

}

ActivitieChildView.prototype.succes_create = function(response)
{
	$("#send_activitie").fadeOut();
	$("#msg_succes").show();
}

/*
ActivitieChildView.prototype.load = function(id)
{
	var activitieService = new ActivitieChildService();
	var url = URL_CREATE_ACTIVITIE_Child+id;
	activitieService.retrieve(url , this.render_activite);
}

ActivitieChildView.prototype.render_activite = function(response)
{
	$("<p id='id_name'>"+response.name+"</p>" ).appendTo( "#activitie" );
	$("<p id='id_description'>"+response.description+"</p>" ).appendTo( "#activitie" );
	$("<p id='id_die_at'>"+response.die_at+"</p>" ).appendTo( "#activitie" );
	$("#activitie").fadeIn();

	$("#btn_active_send").click(function(e){
		console.log("click")
	})
}

*/
var ActivitieChildForm = function(form){
	create_form(
		URL_CREATE_ACTIVITIE_CHILD,
		form,
		'OPTIONS',
		ActivitieChildView.prototype.handler_created_form
	);
}