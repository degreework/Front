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