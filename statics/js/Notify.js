var Notify = {};


Notify.show_success = function(title, message)
{
	$.notify({
		title: title,
		message: message
	},{
	// settings
		type: 'success',
		offset: 0,
	});
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
	});
}