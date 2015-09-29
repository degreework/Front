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

	if(notifications.count>0)
	{
		$("#btn-mark-all").fadeIn()
	}

	$("#user-bell-notify").append(notifications.count)

	for (var i=0, len=notifications.results.length; i<len;i++) {
		NotificationView.render(notifications.results[i]);
	}

	$(".noti-action-readed").on("click", function(e){NotificationView.mark_readed_notification($(e.target).closest("li"))})
	$(".noti-action-remove").on("click", function(e){NotificationView.remove_notification($(e.target).closest("li"))})


}

NotificationView.render = function(notification)
{
	console.log(notification)

	var li = $("<li></li>");
	$("<hr>").appendTo(li);

	$("<a href='"+User.get_url(notification.actor.id)+"'><span>"+notification.actor.name+"</span></a>").appendTo(li);
	$("<span>"+notification.verb+"</span>").appendTo(li)


	if("Request" == notification.target.type)
	{
		var url = WikiModel.generate_url_request(notification.target.detail.page.slug, notification.target.detail.page.commit)
		console.log(url)
		$("<a href='"+url+"'><span>Aquí</span></a>" ).appendTo(li);
	}
	
	//$("<p id='id_die_at'>"+response.die_at+"</p>" ).appendTo( "#activitie" );


	var id_as_readed = "btn-as-readed-"+notification.id;
	//var id_remove = "btn-remove-"+notification.id;

	$("<a id='"+id_as_readed+"' class='noti-action-readed'><span class='glyphicon glyphicon-ok'></span></a>").appendTo(li);
	//$("<a id='"+id_remove+"' class='noti-action-remove'><span class='glyphicon glyphicon-remove'></span></a>").appendTo(li);
		


	$(li).appendTo($("#user-notify"))

}

/*
NotificationView.remove_notification = function(container)
{
	console.log(container)
	var id = $($(container).find(".noti-action-remove").get(0)).attr("id").split("-").pop()

	var url = URL_MARK_AS_READ_NOTIFICATION.replace(/\%id%/g, id);
	var service = new NotificationService();
	service.delete(url,
		function(e){
			$(container).fadeOut()
		})
}
*/
NotificationView.mark_readed_notification = function(container)
{
	console.log(container)
	var id = $($(container).find(".noti-action-readed").get(0)).attr("id").split("-").pop()

	var url = URL_MARK_AS_READ_NOTIFICATION.replace(/\%id%/g, id);
	var service = new NotificationService();
	service.mark(url,
		function(e){
			console.log("echo");
			var counter = $($("#user-bell-notify").find("span")[0]);

			$(counter).val($(counter).val()-1)
			
			$(container).fadeOut();
		})
}