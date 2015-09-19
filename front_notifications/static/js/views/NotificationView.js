var NotificationView = function()
{
	
}

NotificationView.get_notifications = function()
{
	var service = new NotificationService();
	service.list(URL_UNREAD_NOTIFICATION, this.render_notifications)
}

NotificationView.render_notifications = function(notifications, saved)
{

		var s = StorageClass.getInstance();
		s.storage.set("notifications", JSON.stringify(notifications));
	
	console.log(notifications)

	$("#user-bell-notify").append(notifications.count)

	for (var i=0, len=notifications.results.length; i<len;i++) {
		NotificationView.render(notifications.results[i]);
	}


}

NotificationView.render = function(notification)
{
	console.log(notification)

	var li = $("<li></li>");

	$("<a href='"+User.get_url(notification.actor.id)+"'><span>"+notification.actor.name+"</span></a>").appendTo(li);
	$("<span>"+notification.verb+"</span>").appendTo(li)


	if("Request" == notification.target.type)
	{
		var url = WikiModel.generate_url_request(notification.target.detail.page.slug, notification.target.detail.page.commit)
		console.log(url)
		$("<a href='"+url+"'><span>Aquí</span></a>" ).appendTo(li);
	}
	
	//$("<p id='id_die_at'>"+response.die_at+"</p>" ).appendTo( "#activitie" );

	$(li).appendTo($("#user-notify"))

}