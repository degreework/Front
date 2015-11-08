var Notify = {};


Notify.show_success = function(title, message)
{
	console.log("Show_success: "+message)
	$.notify({
		title: title,
		message: message
	},{
	// settings
		type: 'success',
		offset: 0,
		placement: {
		from: 'bottom',
		align: 'left'
		},
		offset:{
			x: 50,
			y: 50
		},
	});
}


Notify.show_confirm = function(section)
{

	var notify = $.notify({
		message: "<div class='col-md-4 col-md-offset-4 confirmation-delete'><div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'>Eliminar "+section+"</h3></div><div class='panel-body'>Seguro que quiere eliminar "+section+"<br><br><a id='cancel' class='btn btn-default pull-right' style='color:inherit; text-decoration:none' href='#'>cancelar</a><a id='erase' style='margin-right:5px; color:inherit; text-decoration:none' class='btn btn-default pull-right' href='#'>eliminar</a></div></div></div></div>"
	},{
	// settings
		type: 'none',
		offset: 0,
		allow_dismiss: false,
		delay: 0,
		placement: {
		from: 'bottom',
		align: 'left'
		},
		offset:{
			x: 460,
			y: 200
		},
	});
	return notify
}


Notify.show_error = function(title, message)
{
	$.notify({
		title: title,
		message: message
	},{
	// settings
		type: 'danger',
		offset: 0,
		placement: {
		from: 'bottom',
		align: 'left'
		},
		offset:{
			x: 50,
			y: 50
		},
	});
}