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
	/*iterate over notifications list and render it each one.
	*/

	/*First must remove previous notifications
	*/

	NotificationView.remove_all_rendered(notifications.count)

	var s = StorageClass.getInstance();
	s.storage.set("notifications", JSON.stringify(notifications));
	

	if(notifications.count>0)
	{
		$("#btn-mark-all").fadeIn()
	}


	for (var i=0, len=notifications.results.length; i<len;i++) {
		NotificationView.render(notifications.results[i]);
	}

	$(".noti-action-readed").on("click", function(e){NotificationView.mark_readed_notification($(e.target).closest("li"))})
	$(".noti-action-remove").on("click", function(e){NotificationView.remove_notification($(e.target).closest("li"))})

	/*when a notification es clicked this must be marked as readed*/
	$(".a-noti").on("click",
		function(e){
			console.log($(e.currentTarget).closest("li"))
			NotificationView.mark_readed_notification( $(e.currentTarget).closest("li") )

			}
		)


}

NotificationView.render = function(notification)
{
	/*render a notification*/
	//console.info("notification")
	//console.info(notification)

	var url;
	var name;
	var	verb;
	var detail;
	

	var li = $("<li class='a-noti'></li>");
	var container = $("<div id='noti_container'></div>");

	var id_as_readed = "btn-as-readed-"+notification.id;

	$("<a id='"+id_as_readed+"' class='noti-action-readed pull-right'><span class='glyphicon glyphicon-ok'></span></a>").appendTo(container);


	if("Request" == notification.target.type)
	{
		url = Module.getURL_section_from_slug(notification.target.module.slug)+WikiModel.generate_url_request(notification.target.detail.page.slug, notification.target.detail.page.commit)
		name = notification.actor.name;
		verb = notification.verb;
		detail = notification.target.detail.page.title;
	}

	else if("Ask" == notification.target.type)
	{
		url = AskModel.generate_url(notification.target.id)
		name = notification.actor.name;
		verb = notification.verb;
		detail = notification.target.detail;
	}

	else if ('Badge' == notification.target.type) {
		url = '';
		name = notification.actor.name;
		verb = notification.verb;
		detail = notification.target.detail;
	}
	
	else if ('Quiz' == notification.target.type) {
		url = Module.getURL_section_from_slug(notification.target.module.slug)+Quiz.get_url(notification.target.id);
		name = notification.actor.name;
		verb = notification.verb;
		detail = notification.target.detail;

		// se acomoda el progreso al crease o eliminarse un quiz
		user = JSON.parse(localStorage.getItem('user'))
		var gamificationView = new GamificationView();
		gamificationView.get_progress_user(user.id)
	}

	else if ('Activitie' == notification.target.type) {
		url = Module.getURL_section_from_slug(notification.target.module.slug) + ActivitieParentModel.get_detail_url(notification.target.id);
		name = notification.actor.name;
		verb = notification.verb;
		detail = notification.target.detail;

		// se acomoda el progreso al crease o eliminarse una actividad
		user = JSON.parse(localStorage.getItem('user'))
		var gamificationView = new GamificationView();
		gamificationView.get_progress_user(user.id)
	}

	else if ('Module' == notification.target.type) {
		var url = Module.getURL_from_slug(notification.target.slug);
		name = notification.actor.name;
		verb = notification.verb;
		detail = notification.target.detail;
	};

	
	$("<a href='"+url+"'><span><strong>"+name+"</strong></span><span>"+", "+verb+": <strong>"+detail+"</strong></span></a>" ).appendTo(container);
	
	$(container).appendTo(li)
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

NotificationView.remove_all_rendered = function(count)
{
	/*remove all nootifications rendered (but no at service)*/
	var current = $("#user-bell-notify")[0].innerHTML;
	
	if("" == current)
	{
		$("#user-bell-notify").append(count)
	}
	else if(count != current)
	{
		$("#user-bell-notify")[0].innerHTML = "";
		$("#user-bell-notify").append(count);
	}
	
	//$("#a-noti").empty()
	$("#user-notify").empty()
}