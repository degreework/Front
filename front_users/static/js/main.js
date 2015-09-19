var main = function(){
	UserView.verify();
	$("#preloader_2").hide();

	//notifications every page reload
	var s = StorageClass.getInstance();
	var notifications = s.storage.get("notifications");
	if (notifications){
		NotificationView.render_notifications(notifications, true);
	}
};

$(document).ready(main);
