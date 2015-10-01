var main = function(){
	UserView.verify();
	$("#preloader_2").hide();

	if(User.exist())
	{
		NotificationView.get_notifications();

		// progreso de la medalla del usuario 
		user = JSON.parse(localStorage.getItem('user'))
		var gamificationView = new GamificationView();
		gamificationView.get_progress_user(user.id)

	}

	/*//notifications every page reload
	var s = StorageClass.getInstance();
	var notifications = s.storage.get("notifications");
	if (notifications){
		NotificationView.render_notifications(notifications, true);
	}*/
};

$(document).ready(main);
