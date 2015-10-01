var main = function(){
	UserView.verify();
	$("#preloader_2").hide();

	if(User.exist())
	{
		NotificationView.get_notifications();

		window.setInterval(
			function(){
				console.log("exe")
				NotificationView.get_notifications();
			}, 5*60*1000);
		//(min) * (seconds) * (milliseconds)
		//this case 5*60*1000 = 5 min
	}

	/*//notifications every page reload
	var s = StorageClass.getInstance();
	var notifications = s.storage.get("notifications");
	if (notifications){
		NotificationView.render_notifications(notifications, true);
	}*/
};

$(document).ready(main);
