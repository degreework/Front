var main = function(){
	UserView.verify();
	$("#preloader_2").hide();

	if(User.exist())
	{
		
		NotificationView.get_notifications();

		// progreso de la medalla del usuario 
		//user = JSON.parse(localStorage.getItem('user'))
		//var gamificationView = new GamificationView();
		//gamificationView.get_progress_user(user.id)


		window.setInterval(
			function(){
				console.log("exe")
				NotificationView.get_notifications();
			}, 5*60*1000);
		//(min) * (seconds) * (milliseconds)
		//this case 5*60*1000 = 5 min

		/*
		CHAT
		*/

		//ChatSocked.prototype.socked.emit('listChatUpdate');
		
		// trae los usuarios conectados al servidor del chat 
		chatSocked.listen();

	}

	/*//notifications every page reload
	var s = StorageClass.getInstance();
	var notifications = s.storage.get("notifications");
	if (notifications){
		NotificationView.render_notifications(notifications, true);
	}*/



	(function () {
  		$('[data-toggle="popover"]').popover();
	})
	();


};

